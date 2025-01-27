local basic = require 'settings.basic'

lib.addKeybind({
  name = "handsup",
  description = locale('HandsUp'),
  defaultKey = basic.defaultBinds.handsup,
  onPressed = function()  
    if LocalPlayer.state.isDead or LocalPlayer.state.lastStand then return end
    if LocalPlayer.state.blockHandsUp then return end
    LocalPlayer.state:set("handsUp",  not LocalPlayer.state.handsUp)
  end
})

AddStateBagChangeHandler('blockHandsUp', ('player:%s'):format(cache.serverId), function(_, _, value)
  if value then 
    LocalPlayer.state:set("handsUp", false)
  end
end)

AddStateBagChangeHandler('isDead', ('player:%s'):format(cache.serverId), function(_, _, value)
  if value then 
    LocalPlayer.state:set("handsUp", false)
  end 
end)

AddStateBagChangeHandler('lastStand', ('player:%s'):format(cache.serverId), function(_, _, value)
  if value then 
    LocalPlayer.state:set("handsUp", false)
  end 
end)

AddStateBagChangeHandler('handsUp', ('player:%s'):format(cache.serverId), function(_, _, value)
  lib.request.animDict('missminuteman_1ig_2')
  if value then
      TaskPlayAnim(cache.ped, 'missminuteman_1ig_2', 'handsup_base', 8.0, 8.0, -1, 50, 0, false, false, false)
      -- lib.disableControls:Add({24, 25, 47, 58, 59, 63, 64, 71, 72, 75, 140, 141, 142, 143, 257, 263, 264})
  else
      ClearPedTasks(cache.ped)
      -- lib.disableControls:Remove({24, 25, 47, 58, 59, 63, 64, 71, 72, 75, 140, 141, 142, 143, 257, 263, 264})
  end
  RemoveAnimDict('missminuteman_1ig_2')
end)