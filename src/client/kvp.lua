local typeNative = {
  number = GetResourceKvpInt,
  string = GetResourceKvpString,
}

return {
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
    settings[key] = value
    SetResourceKvp(('animationsSettings:%s'):format(cache.citizenId), json.encode(settings))
  end
}