local kvp = require 'src.client.kvp'
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
  SetNuiFocus(true, true)
  local currentWalk, currentExpression = kvp.get('currentWalk', {
    name = 'default',
    option = 1,
  }), kvp.get('currentExpression', {
    name = 'default',
    option = 1,
  })

  local model, _type = utils.getPedModel(cache.ped)
  SendNuiMessage(json.encode({
    action = 'OPEN_ANIMATIONS',
    data   = {
      animations = animations,
      categories = categories,
      currentWalk = currentWalk,
      currentExpression = currentExpression,
      pedType = _type,
    }
  }))
end

RegisterNuiCallback('CLOSE_ANIMATIONS', function(data, cb)
  SetNuiFocus(false, false)
  cb('ok')
end)


lib.addKeybind({
  name = 'animMenu',
  description = 'Open Animations',
  defaultKey = basic.defaultBinds.menu,
  onPressed = function()
    openAnimationMenu()
  end
})


if not basic.menuCommand then return end
RegisterCommand(basic.menuCommand, function()
  openAnimationMenu()
end, false)
