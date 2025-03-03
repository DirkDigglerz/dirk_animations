local typeNative = {
  number = GetResourceKvpInt,
  string = GetResourceKvpString,
}

return {

  onChange = function(key, func)
    AddEventHandler('clean_hud:kvpChange', function(k, v, ov)
      if k == key then
        func(v, ov)
      end
    end)
  end, 

  get = function(key, default)
    local table = GetResourceKvpString(('animationsSettings:%s'):format(cache.citizenId))
    if table then
      local settings = json.decode(table)
      if settings[key] then
        return settings[key]
      end
    end
    return default
  end,

  set = function(key, value)
    local table = GetResourceKvpString(('animationsSettings:%s'):format(cache.citizenId))
    local settings = table and json.decode(table) or {}
    local oldValue = settings[key]
    settings[key] = value
    SetResourceKvp(('animationsSettings:%s'):format(cache.citizenId), json.encode(settings))
    TriggerEvent('clean_hud:kvpChange', key, value, oldValue)
  end
}



