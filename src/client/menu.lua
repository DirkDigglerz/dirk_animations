local animations = require 'settings.animations'
local categories = require 'settings.categories'
local basic = require 'settings.basic'

RegisterNuiCallback('GET_SETTINGS', function(data, cb)
  cb({
    primaryColor = lib.settings.primaryColor, 
    primaryShade = lib.settings.primaryShade,
    customTheme  = lib.settings.customTheme,
  })
end)

RegisterNuiCallback('GET_LOCALES', function(data, cb)
  cb(lib.getLocales())
end)

openAnimationMenu = function()
  print('OPENING ANIMATION')
  SetNuiFocus(true, true)
  SendNuiMessage(json.encode({
    action = 'OPEN_ANIMATIONS',
    data   = {
      animations = animations,
      categories = categories,
    }
  }))
end

RegisterNuiCallback('CLOSE_ANIMATIONS', function(data, cb)
  SetNuiFocus(false, false)
  cb('ok')
end)

print('aDD KEYBIND')
lib.addKeybind({
  name = 'animMenu',
  description = 'Open Animations',
  defaultKey = basic.defaultBinds.menu,
  onPressed = function()
    openAnimationMenu()
  end
})



RegisterCommand('e', function(src, args)
  local anim = args[1]
  --- check if anim has a number at the end like sit1 or sit11 etc 
  local command = anim:match('(%a+)')
  local number = tonumber(anim:match('%d+')) or false 
  print('Command', command, 'Number', number)
  local animation = getAnimation(command, number, 'animation')
  if not animation then return end
  print('Playing animation', animation)
end)

TriggerEvent('chat:addSuggestion', '/e', 'Play an animation', {
  { name="animation", help="The animation name" }
})  

RegisterCommand('walk', function(src, args)
  local anim = args[1]
  --- check if anim has a number at the end like sit1 or sit11 etc 
  local command = anim:match('(%a+)')
  local number = tonumber(anim:match('%d+')) or false 
  print('Command', command, 'Number', number)
  local animation = getAnimation(command, number, 'walk') 
  if not animation then return end
  print('Playing animation', animation)
end)

TriggerEvent('chat:addSuggestion', '/walk', 'Play a walking animation', {
  { name="animation", help="The animation name" }
})

RegisterCommand('face', function(src, args)
  local anim = args[1]
  --- check if anim has a number at the end like sit1 or sit11 etc 
  local command = anim:match('(%a+)')
  local number = tonumber(anim:match('%d+')) or false 
  print('Command', command, 'Number', number)
  local animation = getAnimation(command, number, 'expressions')
  if not animation then return end
  print('Playing animation', animation)
end)

TriggerEvent('chat:addSuggestion', '/face', 'Play a face animation', {
  { name="animation", help="The animation name" }
})