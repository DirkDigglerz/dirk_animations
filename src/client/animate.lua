local animations = require 'settings.animations'
local basic = require 'settings.basic'
local getAnimation = function(command, number, _type)
  for _, animation in ipairs(animations) do
    if animation.command == command and animation.type == _type then
      return animation
    end
  end
  return false
end




local parseAnim = function(command, number, _type)
  local animation = getAnimation(command, number, _type)
  if not animation then return lib.print.error(('No actual animation found for %s'):format(command)) end
  local hasType = animation and animation[_type..'s']
  if not hasType then return lib.print.error(('No type %s found for %s %s'):format(_type..'s', command, number)) end
  local hasOption = animation[_type..'s'][number]
  if not hasOption then return lib.print.error(('No option found for %s %s'):format(command, number)) end
  return hasOption
end

-- _type: 'animation' | 'expression' | 'walk
playAnimation = function(_type, id, option, ped, forceLoop, forcePos)
  print('playAnimation', _type, id, option, ped, forceLoop, forcePos)
  local hasOption = parseAnim(id, option, _type)
  if not hasOption then return end

  if _type == 'walk' then 
    lib.request.animSet(hasOption)
    SetPedMovementClipset(cache.ped, hasOption, 0.2)
    RemoveAnimSet(hasOption)

  elseif _type == 'expression' then
    SetFacialIdleAnimOverride(cache.ped, hasOption, 0)
  elseif _type == 'animation' then
    local dict, anim = hasOption.dict, hasOption.anim
    local dictLoaded = lib.request.animDict(dict)
    if not dictLoaded then return false, lib.print.error(('Failed to load dictionary %s'):format(dict)) end
    local flags = hasOption.flags
    local props = hasOption.props

    local myPos = GetEntityCoords(ped or cache.ped)

    if forcePos then 
      SetEntityCoords(ped or cache.ped, forcePos.x, forcePos.y, forcePos.z)
      FreezeEntityPosition(ped or cache.ped, true)
      SetEntityCollision(ped or cache.ped, false, false)
    end

    TaskPlayAnimAdvanced(ped or cache.ped, dict, anim, forcePos and forcePos.x or myPos.x, forcePos and forcePos.y or myPos.y, forcePos and forcePos.z or myPos.z, 0.0, 0.0, forcePos and forcePos.w or GetEntityHeading(ped or cache.ped), 8.0, 1.0, -1, flags, 0.0, 0, 0, 0, 0)
    
    FreezeEntityPosition(ped or cache.ped, false)
    if forcePos then 
      SetEntityCollision(ped or cache.ped, true, true)
    end

    RemoveAnimDict(dict)
  end
end



local clonePed = function()
  local clonePed = ClonePed(cache.ped, false, true, true)
  print('clonePed', clonePed)
  local myAppearance = utils.getPedAppearance(cache.ped)
  utils.setPedAppearance(clonePed, myAppearance)
  SetEntityAlpha(clonePed, 122, true)
  SetBlockingOfNonTemporaryEvents(clonePed, true)
  SetEntityInvincible(clonePed, true)  
  
  local forwardVector = GetEntityForwardVector(cache.ped)
  local position = GetEntityCoords(cache.ped) + forwardVector * 2.0
  SetEntityCoords(clonePed, position.x, position.y, position.z)
  local myHeading = GetEntityHeading(cache.ped)
  SetEntityHeading(clonePed, myHeading + 180.0 )
  FreezeEntityPosition(clonePed, true)  
  SetEntityCollision(clonePed, false, false)
  return clonePed
end


local cancelAll = function()
  SetPlayerControl(PlayerId(), true)
  if LocalPlayer.state.placingAnimation then 
    lib.hideKeys()
    LocalPlayer.state.placingAnimation = false
  end

  if LocalPlayer.state.movingToAnim then 
    LocalPlayer.state.movingToAnim = false
    
    ClearPedTasks(cache.ped)
    ClearPedSecondaryTask(cache.ped)
  end 
end

AddStateBagChangeHandler('handsUp', ('player:%s'):format(cache.serverId), function(_, _, value)
  cancelAll()
end)

AddEventHandler('onResourceStop', function(resource)
  if resource == GetCurrentResourceName() then 
    cancelAll()
  end
end)


local placeAnimation = function(id, option, _type)
  local hasOption = parseAnim(id, option, _type)
  if not hasOption then return end
  LocalPlayer.state.placingAnimation = true

  local entity = clonePed()

  playAnimation('animation', id, option, entity)
  

  local isValidPos = function(coords)
    local myPos = GetEntityCoords(cache.ped)
    local dist = #(vector3(myPos.x, myPos.y, myPos.z) - vector3(coords.x, coords.y, coords.z))
    return dist <= basic.placeAnimDist
  end


  local removeEntity = function()
    DeleteEntity(entity)
  end

  
  local cancelProcess = function()
    removeEntity()
    cancelAll()
  end

  local retpromise = promise.new()
  local rotation = GetEntityRotation(entity)
  local min, max = GetModelDimensions(loaded_model)
  lib.showKeys({
    position = 'bottom-center',
    inputs = {
      {
        label = 'Confirm',
        icon = 'fas fa-check',
        key = 'E',
        action = function()
          local finalCoords = GetEntityCoords(entity)
          local ret_data = {
            rot = GetEntityRotation(entity),
            pos   = vector4(finalCoords.x, finalCoords.y, finalCoords.z, GetEntityHeading(entity)),
          }
          cancelProcess()
          retpromise:resolve(ret_data)
        end
      
      },
      {
        label = locale('Rotate Left'),
        icon = 'fas fa-undo',
        key = 'Arrow Left',
        action = function()
          rotation = vector3(rotation.x, rotation.y, rotation.z + 1)
          SetEntityRotation(entity, rotation.x, rotation.y, rotation.z)
        end
      },
      {
        label = locale('Rotate Right'),
        icon = 'fas fa-redo',
        key = 'Arrow Right',
        action = function()
          rotation = vector3(rotation.x, rotation.y, rotation.z - 1)
          SetEntityRotation(entity, rotation.x, rotation.y, rotation.z)
        end
      
      },
      {
        label = locale('Cancel'),
        icon = 'fas fa-hand-paper',
        key = 'G',
        action = function()
          cancelProcess()
        end
      }
    }
  })

  SetFollowPedCamViewMode(0)
  CreateThread(function()
    while LocalPlayer.state.placingAnimation do 
      -- Ray Cast and draw move ped doing aim to there 
      local hit, endCoords, entityHit, surfaceNormal, materialHash = lib.raycast.fromCamera(nil, entity, type(bounds) == 'number' and bounds)
      SetEntityAlpha(entity, 100, false)
      if endCoords and entityHit ~= entity and isValidPos(endCoords) then 
        SetEntityCoords(entity, endCoords.x, endCoords.y, endCoords.z)
        SetEntityRotation(entity, rotation.x, rotation.y, rotation.z)
        DrawSphere(endCoords.x, endCoords.y, endCoords.z, 0.1, 255, 0, 0, 100)
      else 
        SetEntityAlpha(entity, 0, false)
      end 
      Wait(0)
    end 
  end)
  return Citizen.Await(retpromise)
end



RegisterNuiCallback('EXECUTE_ANIMATION', function(data, cb)
  -- _type: 'animation' | 'expression' | 'walk'
  print('EXECUTE_ANIMATION', data.type, data.command, data.option, data.position)
  
  if data.type == 'animation' and data.position then 
    print('Placing animation')
    SetNuiFocus(false, false)
    local position = placeAnimation(data.command, data.option, data.type)
    -- Make ped walk to this spot 
    local ped = cache.ped
    TaskGoStraightToCoord(ped, position.pos.x, position.pos.y, position.pos.z, 1.0, -1, position.pos.w, 0.0)
    SetPlayerControl(PlayerId(), false)
    local start_time = GetGameTimer()
    LocalPlayer.state.movingToAnim = true
    CreateThread(function()
      while LocalPlayer.state.movingToAnim do
        local time_now = GetGameTimer()
        local time_since = time_now - start_time
        if time_since >= (basic.placeAnimTaskTime * 1000) then 
          lib.notify({
            title = locale('Animations'),
            description = locale('FailedToReach'),
            type = 'error'
          })
          cancelAll()
          SetNuiFocus(true, true)
          cb('ok')
          LocalPlayer.state.movingToAnim = false
          break
        end
        local pedCoords = GetEntityCoords(ped)
        local distance = #(vector3(pedCoords.x, pedCoords.y, pedCoords.z) - vector3(position.pos.x, position.pos.y, position.pos.z))
        lib.print.info(('Distance to destination %s'):format(distance))
        if distance < 0.5 then 
          lib.print.info(('Ped reached destination %s'):format(distance))
          SetPlayerControl(PlayerId(), true)
          ClearPedTasks(ped)
          ClearPedSecondaryTask(ped)
          playAnimation('animation', data.command, data.option, nil, nil, position.pos)
          SetNuiFocus(true, true)
          cb('ok')
          LocalPlayer.state.movingToAnim = false
          break
        end
         
        Wait(0)
      end 
    end)
  else 
    playAnimation(data.type, data.command, data.option)
  end 
  cb('ok')
end)