local basic = require 'settings.basic'

local function Point(point)
  if point then
    lib.request.animDict("anim@mp_point")
    SetPedCurrentWeaponVisible(cache.ped, 0, true, true, true)
    SetPedConfigFlag(cache.ped, 36, true)
    TaskMoveNetworkByName(cache.ped, 'task_mp_pointing', 0.5, false, 'anim@mp_point', 24)
    CreateThread(function()
      while LocalPlayer.state.point do
        local camPitch, camHeading= GetGameplayCamRelativePitch(), GetGameplayCamRelativeHeading()
        local cosCamHeading, sinCamHeading = Cos(camHeading), Sin(camHeading)
        camPitch = math.max(-70.0, math.min(42.0, camPitch))
        camPitch = (camPitch + 70.0) / 112.0
        camHeading = math.max(-180.0, math.min(180.0, camHeading))
        camHeading = (camHeading + 180.0) / 360.0

        local coords = GetOffsetFromEntityInWorldCoords(cache.ped, (cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6)
        local ray = StartShapeTestCapsule(coords.x, coords.y, coords.z - 0.2, coords.x, coords.y, coords.z + 0.2, 0.4, 95, Ped, 7)
        local _, blocked = GetRaycastResult(ray)
        SetTaskMoveNetworkSignalFloat(cache.ped, "Pitch", camPitch)
        SetTaskMoveNetworkSignalFloat(cache.ped, "Heading", camHeading * -1.0 + 1.0)
        SetTaskMoveNetworkSignalBool(cache.ped, "isBlocked", blocked)
        SetTaskMoveNetworkSignalBool(cache.ped, "isFirstPerson", GetCamViewModeForContext(GetCamActiveViewModeContext()) == 4)
        Wait(0)
      end
    end)
  else
    RemoveAnimDict("anim@mp_point")
    RequestTaskMoveNetworkStateTransition(cache.ped, 'Stop')
    ClearPedSecondaryTask(cache.ped)
    if not cache.vehicle then
      SetPedCurrentWeaponVisible(cache.ped, 1, true, true, true)
    end
    SetPedConfigFlag(cache.ped, 36, false)
  end
end

lib.addKeybind({
  name = "point",
  description = locale('Point'),
  defaultKey = basic.defaultBinds.point,
  onPressed = function()
    if cache.vehicle then return end
    if LocalPlayer.state.isDead or LocalPlayer.state.lastStand then 
      LocalPlayer.state:set("point", false)  
      return 
    end
    LocalPlayer.state:set("point",  not LocalPlayer.state.point)
  end
})

AddStateBagChangeHandler('point', ('player:%s'):format(cache.serverId), function(_, _, value)
  Point(value)
end)