local scullyFormatAnims = require 'settings.scullyFormatAnims'

-- Function to convert a Lua table to a string representation with 2-space indentation
-- Function to convert a Lua table to a string representation with 2-space indentation
function table_to_string(tbl, indent_level)
  indent_level = indent_level or 0
  local result = "{\n"
  local indent = string.rep("  ", indent_level)
  
  -- Explicitly collect keys in the order they are encountered
  local keys = {}
  for key, _ in pairs(tbl) do
      table.insert(keys, key)
  end

  -- Iterate over the collected keys to maintain the order they were added
  for _, key in ipairs(keys) do
      local value = tbl[key]
      local key_str = type(key) == "string" and string.format('%s', key) or false
      
      if type(value) == "table" then
          -- Recursively convert nested tables
          result = result .. indent .. "  " .. (key_str and key_str .. " = " or "") .. table_to_string(value, indent_level + 1) .. ",\n"
      else
          -- Handle non-table values (strings, numbers, booleans)
          local value_str
          if type(value) == "string" then
              value_str = string.format('"%s"', value)
          else
              value_str = tostring(value)
          end
          result = result .. indent .. "  " .. (key_str and key_str .. " = " or "") .. value_str .. ",\n"
      end
  end
  
  result = result .. string.rep("  ", indent_level) .. "}"
  return result
end


local ret = {}


local getByCommand = function(command)
  for k,v in ipairs(ret) do 
    if v.command == command then 
      return v 
    end 
  end 
  return false
end

for k,v in ipairs(scullyFormatAnims) do 



  if v.Command then 
    local commandNumber = v.Command:match('%d+')
    local commandNoNumbers = v.Command:match('%a+')
    local existing = getByCommand(commandNoNumbers)
    if existing then 
      if (v.Animation or v.Dictionary) then 
        existing.animations = existing.animations or {}
        table.insert(existing.animations, {
          dict = v.Dictionary, 
          anim = v.Animation,
          props = v.Options?.Props and {},
          flags = v.Options?.Flags and #v.Options?.Flags > 0 and {} or nil,
        })
        local newIndex = #existing.animations
        if v.Options?.Flags then 
          for k,v in ipairs(v.Options.Flags) do 
            existing.animations[newIndex].flags = existing.animations[newIndex].flags or {}
            table.insert(existing.animations[newIndex].flags, {
              loop     = v.Loop,
              duration = v.Duration,
              move     = v.Move,
            })
          end
        end

        if v.Options?.Props then 
          for k,v in ipairs(v.Options.Props) do 
            existing.animations[newIndex].props = existing.animations[newIndex].props or {}
            table.insert(existing.animations[newIndex].props, {
              bone  = v.Bone,  
              model = v.Name,
              pos   = v.Placement and v.Placement[1],
              rot   = v.Placement and v.Placement[2],
            })
          end
        end

      elseif v.Expression then
        table.insert(existing.expressions, v.Expression)
      elseif v.Walk then 
        existing.walks = existing.walks or {}
        table.insert(existing.walks, v.Walk)
      end 
      goto continue
    end 
  end 

  local newAnimation = {
    command = v.Command,
    label   = v.Label,
    pedTypes = v.PedTypes, 
  }

  if v.Expression then 
    newAnimation.expressions = {}
    table.insert(newAnimation.expressions, v.Expression)
  end

  if v.Dictionary and v.Animation then 
    local baseAnim = {
      dict = v.Dictionary, 
      anim = v.Animation,
      props = v.Options?.Props and {},
      flags = v.Options?.Flags and #v.Options?.Flags > 0 and {},
    }

    if v.Options?.Flags then 
      for k,v in ipairs(v.Options.Flags) do 
        table.insert(baseAnim.flags, {
          loop     = v.Loop,
          duration = v.Duration,
          move     = v.Move,
        })
      end
    end

    if v.Options?.Props then 
      for k,v in ipairs(v.Options.Props) do 
        table.insert(baseAnim.props, {
          bone  = v.Bone,  
          model = v.Name,
          pos   = v.Placement and v.Placement[1],
          rot   = v.Placement and v.Placement[2],
        })
      end
    end
    newAnimation.animations = {}
    table.insert(newAnimation.animations, baseAnim)
  end

  if v.Walk then 
    newAnimation.walks = {}
    table.insert(newAnimation.walks, v.Walk)
  end

  table.insert(ret, newAnimation)

  ::continue::
end

local to_text = table_to_string(ret)

SaveResourceFile(GetCurrentResourceName(), 'settings/exportedEmotes.lua', 'return '..to_text)  