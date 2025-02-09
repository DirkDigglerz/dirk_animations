local basic = require 'settings.basic'
local kvp = require 'src.client.kvp'

toggleIdleCam = function(bool)
  DisableIdleCamera(bool)
  SetPedCanPlayAmbientAnims(cache.ped, not bool)
end

CreateThread(function()
  toggleIdleCam(kvp.get('idleCam', basic.idleCamDefaultidleCamDefault))
end)