local basic = require 'settings.basic'
if not basic.convertScullyEmotes then return end
local scullyFormatAnims = require 'settings.conversions.scullyFormatAnims'

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

local getByCommand = function(command, _type)
  for k,v in ipairs(ret) do 
    if v.command == command and (not _type or v.type == _type) then
      return v 
    end 
  end 
  return false
end

for k, v in ipairs(scullyFormatAnims) do 
  if v.Command then 
    local commandNumber = v.Command:match('%d+')
    local commandNoNumbers = v.Command:match('%a+')
    local _type = v.Dictionary and (v.Options and v.Options.Shared and 'shared' or 'animation')
      or v.Expression and 'expression' 
      or v.Walk and 'walk' 
    
    local existing = getByCommand(commandNoNumbers, _type)
    
    local function addFlags(target, options)
      if not options.Flags then return end
      target.flags = {
        loop     = options.Flags.Loop,
        duration = options.Flags.Duration,
        move     = options.Flags.Move,
        
      }
    end
    
    local function addProps(target, options)
      target.props = target.props or {}
      for _, prop in ipairs(options.Props) do 
        table.insert(target.props, {
          bone  = prop.Bone,  
          model = prop.Name,
          pos   = prop.Placement and prop.Placement[1],
          rot   = prop.Placement and prop.Placement[2],
        })
      end
    end
    
    local target = existing or {
      type    = _type,
      command = v.Command,
      label   = v.Label,
      pedTypes = v.PedTypes,
    }
    
    if _type == 'expression' then
      target.expressions = target.expressions or {}
      table.insert(target.expressions, v.Expression)
    elseif _type == 'walk' then
      target.walks = target.walks or {}
      table.insert(target.walks, v.Walk)
    elseif _type == 'animation' or _type == 'shared' then
      target.animations = target.animations or {}
      
      local newAnim = {
        dict = v.Dictionary, 
        anim = v.Animation,
      }
      
      if v.Options and v.Options.Shared then 
        newAnim.shared = {
          otherAnimation = v.Options.Shared.OtherAnimation,
          frontOffset    = v.Options.Shared.FrontOffset,
          attach         = v.Options.Shared.Attach and {
            bone = v.Options.Shared.Bone,
            pos  = v.Options.Shared.Placement[1],
            rot  = v.Options.Shared.Placement[2],
          },
        }
      end 
      
      if v.Options and v.Options.Flags then 
        addFlags(newAnim, v.Options)
      end
      
      if v.Options and v.Options.Props then 
        addProps(newAnim, v.Options)
        target.type = 'prop'
      end
      
      table.insert(target.animations, newAnim)
    end
    
    if not existing then
      table.insert(ret, target)
    end
  end
end

local to_text = table_to_string(ret)

SaveResourceFile(GetCurrentResourceName(), 'settings/conversions/exportedAnims.lua', 'return '..to_text)