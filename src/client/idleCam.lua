local basic = require 'settings.basic'
local kvp = require 'src.client.kvp'

toggleIdleCam = function(bool)
  DisableIdleCamera(bool)
  SetPedCanPlayAmbientAnims(cache.ped, not bool)
end

CreateThread(function()
  local idleCam = kvp.get('idleCam', basic.disableIdleCamDefault)
  toggleIdleCam(idleCam)
end)