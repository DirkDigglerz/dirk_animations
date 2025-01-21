local animations = require 'settings.animations'

local getAnimation = function(command, number) 
  for _, animation in ipairs(animations) do
    if animation.command == command then
      return animation
    end
  end
  return false
end

-- _type: 'animations' | 'expressions' | 'walks
playAnimation = function(_type, id, option)
  local animation = getAnimation(id, option)
  if not animation then return lib.print.error(('No actual animation found for %s'):format(id)) end
  local hasType = animation and animation[_type] 
  if not hasType then return lib.print.error(('No type %s found for %s %s'):format(_type, id, option)) end
  local hasOption = animation[_type][option]
  if not hasOption then return lib.print.error(('No option found for %s %s'):format(id, option)) end

  if _type == 'walks' then 

  elseif _type == 'expressions' then

  elseif _type == 'animations' then
    local dict, anim = hasOption.dict, hasOption.anim
    local dictLoaded = lib.request.animDict(dict)
    if not dictLoaded then return false, lib.print.error(('Failed to load dictionary %s'):format(dict)) end
    local flags = hasOption.flags
    local props = hasOption.props
    
    TaskPlayAnim(cache.ped, dict, anim, 8.0, 8.0, -1, flags, 0, 0, 0, 0)
  end

end

RegisterNuiCallback('EXECUTE_ANIMATION', function(data, cb)
  -- _type: 'animations' | 'faces' | 'walks'
  playAnimation(data.type, data.command, data.option)
end)