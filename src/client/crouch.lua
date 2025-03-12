local basic = require 'settings.basic'
if not basic.useCrouch then return end

AddStateBagChangeHandler('crouch', ('player:%s'):format(cache.serverId), function(_, _, value)
  lib.request.animSet('move_Ped_crouched')
  if not value then
    ResetPedMovementClipset(cache.ped, 1.0)
    ResetPedWeaponMovementClipset(cache.ped)
    ResetPedStrafeClipset(cache.ped)
    SetPedStealthMovement(cache.ped, false, 'DEFAULT_ACTION')
  else
    SetPedMovementClipset(cache.ped, 'move_Ped_crouched', 1.0)
    SetPedStrafeClipset(cache.ped, 'move_Ped_crouched_strafing')
  end
  RemoveAnimSet('move_Ped_crouched')
end)

lib.addKeybind({
  name = 'crouch',
  description = locale('Crouch'),
  defaultKey = basic.defaultBinds.crouch,
  onPressed = function()
    if LocalPlayer.state.animating then 
      stopAnimation(ped or cache.ped)
      return false
    end 
    if LocalPlayer.state.isDead or LocalPlayer.state.lastStand then return end
    if LocalPlayer.state.blockCrouch then return end
    LocalPlayer.state:set("crouch",  not LocalPlayer.state.crouch)
  end
})


AddStateBagChangeHandler('blockCrouch', ('player:%s'):format(cache.serverId), function(_, _, value)
  if value then 
    LocalPlayer.state:set("crouch", false)
  end
end)

AddStateBagChangeHandler('isDead', ('player:%s'):format(cache.serverId), function(_, _, value)
  if value then 
    LocalPlayer.state:set("crouch", false)
  end 
end)

AddStateBagChangeHandler('lastStand', ('player:%s'):format(cache.serverId), function(_, _, value)
  if value then 
    LocalPlayer.state:set("crouch", false)
  end 
end)


