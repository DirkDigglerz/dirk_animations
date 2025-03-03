constants = {}
constants.PED_COMPONENTS_IDS = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}
constants.PED_PROPS_IDS = {0, 1, 2, 6, 7}

constants.FACE_FEATURES = {
  "noseWidth",
  "nosePeak",
  "noseLength",
  "noseBoneCurveness",
  "noseTip",
  "noseTwist",
  "eyebrowHeight",
  "eyebrowDepth",
  "cheeksBoneHeight",
  "cheeksSidewaysBoneSize",
  "cheeksBoneWidth",
  "eyesOpening",
  "lipsThickness",
  "jawBoneWidth",
  "jawBoneShape",
  "chinBoneHeight",
  "chinBoneLength",
  "chinBoneShape",
  "chinHole",
  "neckThickness",
}

constants.HEAD_OVERLAYS = {
  "blemishes",
  "beard",
  "eyebrows",
  "ageing",
  "makeUp",
  "blush",
  "complexion",
  "sunDamage",
  "lipstick",
  "moleAndFreckles",
  "chestHair",
  "bodyBlemishes",
}

-- Thanks to rootcause for the eye colors names and hair decorations hashes.
constants.EYE_COLORS = {
    "Green",
    "Emerald",
    "Light Blue",
    "Ocean Blue",
    "Light Brown",
    "Dark Brown",
    "Hazel",
    "Dark Gray",
    "Light Gray",
    "Pink",
    "Yellow",
    "Purple",
    "Blackout",
    "Shades of Gray",
    "Tequila Sunrise",
    "Atomic",
    "Warp",
    "ECola",
    "Space Ranger",
    "Ying Yang",
    "Bullseye",
    "Lizard",
    "Dragon",
    "Extra Terrestrial",
    "Goat",
    "Smiley",
    "Possessed",
    "Demon",
    "Infected",
    "Alien",
    "Undead",
    "Zombie",
}

constants.HAIR_DECORATIONS = {
    male = {
        [0] = { `mpbeach_overlays`, `FM_Hair_Fuzz` },
        [1] = { `multiplayer_overlays`, `NG_M_Hair_001` },
        [2] = { `multiplayer_overlays`, `NG_M_Hair_002` },
        [3] = { `multiplayer_overlays`, `NG_M_Hair_003` },
        [4] = { `multiplayer_overlays`, `NG_M_Hair_004` },
        [5] = { `multiplayer_overlays`, `NG_M_Hair_005` },
        [6] = { `multiplayer_overlays`, `NG_M_Hair_006` },
        [7] = { `multiplayer_overlays`, `NG_M_Hair_007` },
        [8] = { `multiplayer_overlays`, `NG_M_Hair_008` },
        [9] = { `multiplayer_overlays`, `NG_M_Hair_009` },
        [10] = { `multiplayer_overlays`, `NG_M_Hair_013` },
        [11] = { `multiplayer_overlays`, `NG_M_Hair_002` },
        [12] = { `multiplayer_overlays`, `NG_M_Hair_011` },
        [13] = { `multiplayer_overlays`, `NG_M_Hair_012` },
        [14] = { `multiplayer_overlays`, `NG_M_Hair_014` },
        [15] = { `multiplayer_overlays`, `NG_M_Hair_015` },
        [16] = { `multiplayer_overlays`, `NGBea_M_Hair_000` },
        [17] = { `multiplayer_overlays`, `NGBea_M_Hair_001` },
        [18] = { `multiplayer_overlays`, `NGBus_M_Hair_000` },
        [19] = { `multiplayer_overlays`, `NGBus_M_Hair_001` },
        [20] = { `multiplayer_overlays`, `NGHip_M_Hair_000` },
        [21] = { `multiplayer_overlays`, `NGHip_M_Hair_001` },
        [22] = { `multiplayer_overlays`, `NGInd_M_Hair_000` },
        [24] = { `mplowrider_overlays`, `LR_M_Hair_000` },
        [25] = { `mplowrider_overlays`, `LR_M_Hair_001` },
        [26] = { `mplowrider_overlays`, `LR_M_Hair_002` },
        [27] = { `mplowrider_overlays`, `LR_M_Hair_003` },
        [28] = { `mplowrider2_overlays`, `LR_M_Hair_004` },
        [29] = { `mplowrider2_overlays`, `LR_M_Hair_005` },
        [30] = { `mplowrider2_overlays`, `LR_M_Hair_006` },
        [31] = { `mpbiker_overlays`, `MP_Biker_Hair_000_M` },
        [32] = { `mpbiker_overlays`, `MP_Biker_Hair_001_M` },
        [33] = { `mpbiker_overlays`, `MP_Biker_Hair_002_M` },
        [34] = { `mpbiker_overlays`, `MP_Biker_Hair_003_M` },
        [35] = { `mpbiker_overlays`, `MP_Biker_Hair_004_M` },
        [36] = { `mpbiker_overlays`, `MP_Biker_Hair_005_M` },
        [37] = { `multiplayer_overlays`, `NG_M_Hair_001` },
        [38] = { `multiplayer_overlays`, `NG_M_Hair_002` },
        [39] = { `multiplayer_overlays`, `NG_M_Hair_003` },
        [40] = { `multiplayer_overlays`, `NG_M_Hair_004` },
        [41] = { `multiplayer_overlays`, `NG_M_Hair_005` },
        [42] = { `multiplayer_overlays`, `NG_M_Hair_006` },
        [43] = { `multiplayer_overlays`, `NG_M_Hair_007` },
        [44] = { `multiplayer_overlays`, `NG_M_Hair_008` },
        [45] = { `multiplayer_overlays`, `NG_M_Hair_009` },
        [46] = { `multiplayer_overlays`, `NG_M_Hair_013` },
        [47] = { `multiplayer_overlays`, `NG_M_Hair_002` },
        [48] = { `multiplayer_overlays`, `NG_M_Hair_011` },
        [49] = { `multiplayer_overlays`, `NG_M_Hair_012` },
        [50] = { `multiplayer_overlays`, `NG_M_Hair_014` },
        [51] = { `multiplayer_overlays`, `NG_M_Hair_015` },
        [52] = { `multiplayer_overlays`, `NGBea_M_Hair_000` },
        [53] = { `multiplayer_overlays`, `NGBea_M_Hair_001` },
        [54] = { `multiplayer_overlays`, `NGBus_M_Hair_000` },
        [55] = { `multiplayer_overlays`, `NGBus_M_Hair_001` },
        [56] = { `multiplayer_overlays`, `NGHip_M_Hair_000` },
        [57] = { `multiplayer_overlays`, `NGHip_M_Hair_001` },
        [58] = { `multiplayer_overlays`, `NGInd_M_Hair_000` },
        [59] = { `mplowrider_overlays`, `LR_M_Hair_000` },
        [60] = { `mplowrider_overlays`, `LR_M_Hair_001` },
        [61] = { `mplowrider_overlays`, `LR_M_Hair_002` },
        [62] = { `mplowrider_overlays`, `LR_M_Hair_003` },
        [63] = { `mplowrider2_overlays`, `LR_M_Hair_004` },
        [64] = { `mplowrider2_overlays`, `LR_M_Hair_005` },
        [65] = { `mplowrider2_overlays`, `LR_M_Hair_006` },
        [66] = { `mpbiker_overlays`, `MP_Biker_Hair_000_M` },
        [67] = { `mpbiker_overlays`, `MP_Biker_Hair_001_M` },
        [68] = { `mpbiker_overlays`, `MP_Biker_Hair_002_M` },
        [69] = { `mpbiker_overlays`, `MP_Biker_Hair_003_M` },
        [70] = { `mpbiker_overlays`, `MP_Biker_Hair_004_M` },
        [71] = { `mpbiker_overlays`, `MP_Biker_Hair_005_M` },
        [72] = { `mpgunrunning_overlays`, `MP_Gunrunning_Hair_M_000_M` },
        [73] = { `mpgunrunning_overlays`, `MP_Gunrunning_Hair_M_001_M` },
        [74] = { `mpVinewood_overlays`, `MP_Vinewood_Hair_M_000_M` },
        [75] = { `mptuner_overlays`, `MP_Tuner_Hair_001_M` },
        [76] = { `mpsecurity_overlays`, `MP_Security_Hair_001_M` },
    },

    female = {
        [0] = { `mpbeach_overlays`, `FM_Hair_Fuzz` },
        [1] = { `multiplayer_overlays`, `NG_F_Hair_001` },
        [2] = { `multiplayer_overlays`, `NG_F_Hair_002` },
        [3] = { `multiplayer_overlays`, `NG_F_Hair_003` },
        [4] = { `multiplayer_overlays`, `NG_F_Hair_004` },
        [5] = { `multiplayer_overlays`, `NG_F_Hair_005` },
        [6] = { `multiplayer_overlays`, `NG_F_Hair_006` },
        [7] = { `multiplayer_overlays`, `NG_F_Hair_007` },
        [8] = { `multiplayer_overlays`, `NG_F_Hair_008` },
        [9] = { `multiplayer_overlays`, `NG_F_Hair_009` },
        [10] = { `multiplayer_overlays`, `NG_F_Hair_010` },
        [11] = { `multiplayer_overlays`, `NG_F_Hair_011` },
        [12] = { `multiplayer_overlays`, `NG_F_Hair_012` },
        [13] = { `multiplayer_overlays`, `NG_F_Hair_013` },
        [14] = { `multiplayer_overlays`, `NG_M_Hair_014` },
        [15] = { `multiplayer_overlays`, `NG_M_Hair_015` },
        [16] = { `multiplayer_overlays`, `NGBea_F_Hair_000` },
        [17] = { `multiplayer_overlays`, `NGBea_F_Hair_001` },
        [18] = { `multiplayer_overlays`, `NG_F_Hair_007` },
        [19] = { `multiplayer_overlays`, `NGBus_F_Hair_000` },
        [20] = { `multiplayer_overlays`, `NGBus_F_Hair_001` },
        [21] = { `multiplayer_overlays`, `NGBea_F_Hair_001` },
        [22] = { `multiplayer_overlays`, `NGHip_F_Hair_000` },
        [23] = { `multiplayer_overlays`, `NGInd_F_Hair_000` },
        [25] = { `mplowrider_overlays`, `LR_F_Hair_000` },
        [26] = { `mplowrider_overlays`, `LR_F_Hair_001` },
        [27] = { `mplowrider_overlays`, `LR_F_Hair_002` },
        [28] = { `mplowrider2_overlays`, `LR_F_Hair_003` },
        [29] = { `mplowrider2_overlays`, `LR_F_Hair_003` },
        [30] = { `mplowrider2_overlays`, `LR_F_Hair_004` },
        [31] = { `mplowrider2_overlays`, `LR_F_Hair_006` },
        [32] = { `mpbiker_overlays`, `MP_Biker_Hair_000_F` },
        [33] = { `mpbiker_overlays`, `MP_Biker_Hair_001_F` },
        [34] = { `mpbiker_overlays`, `MP_Biker_Hair_002_F` },
        [35] = { `mpbiker_overlays`, `MP_Biker_Hair_003_F` },
        [36] = { `multiplayer_overlays`, `NG_F_Hair_003` },
        [37] = { `mpbiker_overlays`, `MP_Biker_Hair_006_F` },
        [38] = { `mpbiker_overlays`, `MP_Biker_Hair_004_F` },
        [39] = { `multiplayer_overlays`, `NG_F_Hair_001` },
        [40] = { `multiplayer_overlays`, `NG_F_Hair_002` },
        [41] = { `multiplayer_overlays`, `NG_F_Hair_003` },
        [42] = { `multiplayer_overlays`, `NG_F_Hair_004` },
        [43] = { `multiplayer_overlays`, `NG_F_Hair_005` },
        [44] = { `multiplayer_overlays`, `NG_F_Hair_006` },
        [45] = { `multiplayer_overlays`, `NG_F_Hair_007` },
        [46] = { `multiplayer_overlays`, `NG_F_Hair_008` },
        [47] = { `multiplayer_overlays`, `NG_F_Hair_009` },
        [48] = { `multiplayer_overlays`, `NG_F_Hair_010` },
        [49] = { `multiplayer_overlays`, `NG_F_Hair_011` },
        [50] = { `multiplayer_overlays`, `NG_F_Hair_012` },
        [51] = { `multiplayer_overlays`, `NG_F_Hair_013` },
        [52] = { `multiplayer_overlays`, `NG_M_Hair_014` },
        [53] = { `multiplayer_overlays`, `NG_M_Hair_015` },
        [54] = { `multiplayer_overlays`, `NGBea_F_Hair_000` },
        [55] = { `multiplayer_overlays`, `NGBea_F_Hair_001` },
        [56] = { `multiplayer_overlays`, `NG_F_Hair_007` },
        [57] = { `multiplayer_overlays`, `NGBus_F_Hair_000` },
        [58] = { `multiplayer_overlays`, `NGBus_F_Hair_001` },
        [59] = { `multiplayer_overlays`, `NGBea_F_Hair_001` },
        [60] = { `multiplayer_overlays`, `NGHip_F_Hair_000` },
        [61] = { `multiplayer_overlays`, `NGInd_F_Hair_000` },
        [62] = { `mplowrider_overlays`, `LR_F_Hair_000` },
        [63] = { `mplowrider_overlays`, `LR_F_Hair_001` },
        [64] = { `mplowrider_overlays`, `LR_F_Hair_002` },
        [65] = { `mplowrider2_overlays`, `LR_F_Hair_003` },
        [66] = { `mplowrider2_overlays`, `LR_F_Hair_003` },
        [67] = { `mplowrider2_overlays`, `LR_F_Hair_004` },
        [68] = { `mplowrider2_overlays`, `LR_F_Hair_006` },
        [69] = { `mpbiker_overlays`, `MP_Biker_Hair_000_F` },
        [70] = { `mpbiker_overlays`, `MP_Biker_Hair_001_F` },
        [71] = { `mpbiker_overlays`, `MP_Biker_Hair_002_F` },
        [72] = { `mpbiker_overlays`, `MP_Biker_Hair_003_F` },
        [73] = { `multiplayer_overlays`, `NG_F_Hair_003` },
        [74] = { `mpbiker_overlays`, `MP_Biker_Hair_006_F` },
        [75] = { `mpbiker_overlays`, `MP_Biker_Hair_004_F` },
        [76] = { `mpgunrunning_overlays`, `MP_Gunrunning_Hair_F_000_F` },
        [77] = { `mpgunrunning_overlays`, `MP_Gunrunning_Hair_F_001_F` },
        [78] = { `mpVinewood_overlays`, `MP_Vinewood_Hair_F_000_F` },
        [79] = { `mptuner_overlays`, `MP_Tuner_Hair_000_F` },
        [80] = { `mpsecurity_overlays`, `MP_Security_Hair_000_F` },
    },
}

constants.DATA_CLOTHES = {
    head = {
        animations = {
            on = {
                dict = "mp_masks@standard_car@ds@",
                anim = "put_on_mask",
                move = 51,
                duration = 600
            },
            off = {
                dict = "missheist_agency2ahelmet",
                anim = "take_off_helmet_stand",
                move = 51,
                duration = 1200
            }
        },
        components = {
            male = {
                {1, 0}
            },
            female = {
                {1, 0}
            }
        },
        props = {
            male = {
                {0, -1}
            },
            female = {}
        }
    },
    body = {
        animations = {
            on = {
                dict = "clothingtie",
                anim = "try_tie_negative_a",
                move = 51,
                duration = 1200
            },
            off = {
                dict = "clothingtie",
                anim = "try_tie_negative_a",
                move = 51,
                duration = 1200
            }
        },
        components = {
            male = {
                {11, 252},
                {3, 15},
                {8, 15},
                {10, 0},
                {5, 0}
            },
            female = {
                {11, 15},
                {8, 14},
                {3, 15},
                {10, 0},
                {5, 0}
            }
        },
        props = {
            male = {},
            female = {}
        }
    },
    bottom = {
        animations = {
            on = {
                dict = "re@construction",
                anim = "out_of_breath",
                move = 51,
                duration = 1300
            },
            off = {
                dict = "re@construction",
                anim = "out_of_breath",
                move = 51,
                duration = 1300
            }
        },
        components = {
            male = {
                {4, 61},
                {6, 34}
            },
            female = {
                {4, 15},
                {6, 35}
            }
        },
        props = {
            male = {},
            female = {}
        }
    }
}

constants.CAMERAS = {
    default = {
      vec3(0, 2.2, 0.2),
      vec3(0, 0, -0.05),
    },
    head = {
      vec3(0, 0.9, 0.65),
      vec3(0, 0, 0.6),
    },
    body = {
      vec3(0, 1.2, 0.2),
      vec3(0, 0, 0.2),
    },
    bottom = {
      vec3(0, 0.98, -0.7),
      vec3(0, 0, -0.9),
    },
}

constants.OFFSETS = {
  default = vec2(1.5, -1),
  head = vec2(0.7, -0.45),
  body = vec2(1.2, -0.45),
  bottom = vec2(0.7, -0.45),
}

local humanModels, animalModels = require 'settings.pedModels.humans', require 'settings.pedModels.animals'

local hashesComputed = false
local PED_TATTOOS = {}
local pedModelsByHash = false

local tofloat = function(num)
  return num + 0.0
end

local round = function(number, decimalPlaces)
  return tonumber(string.format("%." .. (decimalPlaces or 0) .. "f", number))
end

local getPedModel = function(ped)
  if not pedModelsByHash then 
    pedModelsByHash = {}

    for _, model in ipairs(humanModels) do 
      pedModelsByHash[GetHashKey(model)] = {
        model = model,
        type = 'humans', 
      }
    end

    for _type,model in pairs(animalModels) do 
      for _,model in ipairs(model) do 
        pedModelsByHash[GetHashKey(model)] = {
          model = model,
          type = _type,
        }
      end
    end
  end

  local model = GetEntityModel(ped)
  return pedModelsByHash[model]?.model, pedModelsByHash[model]?.type
end

rawHash, pedModel, pedType = false, false, false 
lib.onCache('playerLoaded', function(data)
  if not data then return end
  CreateThread(function()
    while true do
      local model = GetEntityModel(cache.ped)
      if model ~= rawHash then 
        rawHash = model
        pedModel, pedType = getPedModel(cache.ped)
        SendNuiMessage(json.encode({
          action = 'UPDATE_PED_TYPE',
          data = pedType,
        }))
        
      end 
      Wait(10000)
    end
  end)
end)


local isPedFreemodeModel = function(ped)
  local model = GetEntityModel(ped)
  return model == `mp_m_freemode_01` or model == `mp_f_freemode_01`
end

local getPedHeadBlend = function(ped)
  -- GET_PED_HEAD_BLEND_DATA
  local shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix = Citizen.InvokeNative(0x2746BD9D88C5C5D0, ped, Citizen.PointerValueIntInitialized(0), Citizen.PointerValueIntInitialized(0), Citizen.PointerValueIntInitialized(0), Citizen.PointerValueIntInitialized(0), Citizen.PointerValueIntInitialized(0), Citizen.PointerValueIntInitialized(0), Citizen.PointerValueFloatInitialized(0), Citizen.PointerValueFloatInitialized(0), Citizen.PointerValueFloatInitialized(0))

  shapeMix = tonumber(string.sub(shapeMix, 0, 4))
  if shapeMix > 1 then shapeMix = 1 end

  skinMix = tonumber(string.sub(skinMix, 0, 4))
  if skinMix > 1 then skinMix = 1 end

  if not thirdMix then
    thirdMix = 0
  end
  thirdMix = tonumber(string.sub(thirdMix, 0, 4))
  if thirdMix > 1 then thirdMix = 1 end


  return {
    shapeFirst = shapeFirst,
    shapeSecond = shapeSecond,
    shapeThird = shapeThird,
    skinFirst = skinFirst,
    skinSecond = skinSecond,
    skinThird = skinThird,
    shapeMix = shapeMix,
    skinMix = skinMix,
    thirdMix = thirdMix
  }
end


local getMaxTexture = function(ped, componentId, drawableId)
  return GetNumberOfPedTextureVariations(ped, componentId, drawableId) - 1
end

local getMaxDrawable = function(ped, componentId)
  return GetNumberOfPedDrawableVariations(ped, componentId) - 1
end

local componentsByIndex = {
  ['0'] = 'face',
  ['1'] = 'mask',
  ['2'] = 'hair',
  ['3'] = 'arms',
  ['4'] = 'pants',
  ['5'] = 'bag',
  ['6'] = 'shoes',
  ['7'] = 'accessories',
  ['8'] = 'torso',
  ['9'] = 'armor',
  ['10'] = 'decals',
  ['11'] = 'jacket',
}
local getComponentIndexByString = function(componentString)
  for i, component in pairs(componentsByIndex) do
    if component == componentString then
      return i
    end
  end
  return nil
end

local getPedComponents = function(ped)
  local size = #constants.PED_COMPONENTS_IDS
  local components = table.create(size, 0)

  for i = 1, size do
    local componentId = constants.PED_COMPONENTS_IDS[i]
    local componentString = componentsByIndex[tostring(i-1)]
    components[componentString] = {
      componentId = componentId,
      drawableId = GetPedDrawableVariation(ped, componentId),
      textureId = GetPedTextureVariation(ped, componentId),
      maxDrawable = getMaxDrawable(ped, componentId),
      maxTexture = GetNumberOfPedTextureVariations(ped, componentId, GetPedDrawableVariation(ped, componentId)) - 1
    }
  end

  return components
end

local pedPropsByIndex = {
  ['0'] = 'hat',
  ['1'] = 'glasses',
  ['2'] = 'ear',
  ['6'] = 'watch',
  ['7'] = 'bracelet',
}

local getPedProps = function(ped)
  local size = #constants.PED_PROPS_IDS
  local props = table.create(size, 0)

  for i = 1, size do
    local propId = constants.PED_PROPS_IDS[i]
    local propString = pedPropsByIndex[tostring(i-1)]
    if propString then
      props[propString] = {
        componentId = propId,
        drawableId = GetPedPropIndex(ped, propId),
        textureId = GetPedPropTextureIndex(ped, propId),
        maxDrawable = GetNumberOfPedPropDrawableVariations(ped, propId) - 1,
        maxTexture = GetNumberOfPedTextureVariations(ped, propId, GetPedPropIndex(ped, propId)) - 1
      }
    end

  end
  return props 
end 

local getPedFaceFeatures = function(ped)
  local size = #constants.FACE_FEATURES
  local faceFeatures = table.create(0, size)

  for i = 1, size do
    local feature = constants.FACE_FEATURES[i]
    faceFeatures[feature] = round(GetPedFaceFeature(ped, i-1), 1)
  end

  return faceFeatures
end

local getPedHeadOverlays = function(ped)
  local size = #constants.HEAD_OVERLAYS
  local headOverlays = table.create(0, size)

  for i = 1, size do
    local overlay = constants.HEAD_OVERLAYS[i]
    local _, value, _, primaryColor, secondaryColor, opacity = GetPedHeadOverlayData(ped, i-1)

    if value ~= 255 then
      opacity = round(opacity, 1)
    else
      value = 0
      opacity = 0
    end

    headOverlays[overlay] = {
      value = value, 
      opacity = opacity, 
      primaryColor = primaryColor, 
      secondaryColor = secondaryColor
    }
  end

  return headOverlays
end

local getPedHair = function(ped)
  return {
    drawableId     = GetPedDrawableVariation(ped, 2),
    primaryColor   = GetPedHairColor(ped),
    secondaryColor = GetPedHairHighlightColor(ped),
    textureId      = GetPedTextureVariation(ped, 2),
    maxDrawable    = getMaxDrawable(ped, 2),
    maxTexture     = GetNumberOfPedTextureVariations(ped, 2, GetPedDrawableVariation(ped, 2)) - 1
  }
end

local getPedDecorationType = function()
  local pedModel = GetEntityModel(cache.ped)
  local decorationType

  if pedModel == `mp_m_freemode_01` then
    decorationType = "male"
  elseif pedModel == `mp_f_freemode_01` then
    decorationType = "female"
  else
    decorationType = IsPedMale(cache.ped) and "male" or "female"
  end

  return decorationType
end

local getPedAppearance = function(ped)
  local eyeColor = GetPedEyeColor(ped)

  return {
    model         = getPedModel(ped) or 'mp_freemode_01',
    headBlend     = getPedHeadBlend(ped),
    faceFeatures  = getPedFaceFeatures(ped),
    headOverlays  = getPedHeadOverlays(ped),
    pedComponents = getPedComponents(ped),
    accessories   = getPedProps(ped),
    hair          = getPedHair(ped),
  }
end

-- SETTERS

local setPlayerModel = function(model)
  if type(model) == "string" then model = joaat(model) end

  if IsModelInCdimage(model) then
    lib.request.model(model)

    SetPlayerModel(cache.playerId, model)
    Wait(150)
    SetModelAsNoLongerNeeded(model)

    if isPedFreemodeModel(cache.ped) then
      SetPedDefaultComponentVariation(cache.ped)
      -- Check if the model is male or female, then change the face mix based on this.
      if model == `mp_m_freemode_01` then
        SetPedHeadBlendData(cache.ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false)
      elseif model == `mp_f_freemode_01` then
        SetPedHeadBlendData(cache.ped, 45, 21, 0, 20, 15, 0, 0.3, 0.1, 0, false)
      end
    end
    cache:set('ped', PlayerPedId())
    camera.activePed = cache.ped
    PED_TATTOOS = {}
    return cache.ped
  end

  return cache.playerId
end


local setPedHeadBlend = function(ped, headBlend)
  if headBlend and isPedFreemodeModel(ped) then
    SetPedHeadBlendData(ped, tonumber(headBlend.shapeFirst), tonumber(headBlend.shapeSecond), headBlend.shapeThird, headBlend.skinFirst, headBlend.skinSecond, headBlend.skinThird, tofloat(headBlend.shapeMix or 0), tofloat(headBlend.skinMix or 0), tofloat(headBlend.thirdMix or 0), false)
  end
end

local setPedComponent = function(ped, component)
  component.componentId = type(component.componentId) == 'number' and component.componentId or getComponentIndexByString(component.componentId)
  if component then
    if isPedFreemodeModel(ped) and (component.componentId == 0 or component.componentId == 2) then
      return
    end
    SetPedComponentVariation(ped, component.componentId, component.drawableId, component.textureId, 0)
  end
end

local setPedFaceFeatures = function(ped, faceFeatures)
  if faceFeatures then
    for k, v in pairs(constants.FACE_FEATURES) do
      SetPedFaceFeature(ped, k-1, tofloat(faceFeatures[v]))
    end
  end
end

local setPedAppearance = function(ped, appearance)
  if appearance then
    setPedHeadBlend(ped, appearance.headBlend)
    setPedFaceFeatures(ped, appearance.faceFeatures)
    
    if appearance.pedComponents and type(appearance.pedComponents) == 'table' then
      for component, data in pairs(appearance.pedComponents) do
        setPedComponent(ped, data)
      end
    end

    if appearance.accessories and type(appearance.accessories) == 'table' then
      for prop, data in pairs(appearance.accessories) do
        if data then
          SetPedPropIndex(ped, data.componentId, data.drawableId, data.textureId, true)
        end
      end
    end

    if appearance.hair then
      SetPedComponentVariation(ped, 2, appearance.hair.drawableId, appearance.hair.textureId, 0)
      SetPedHairColor(ped, appearance.hair.primaryColor, appearance.hair.secondaryColor)
    end

    if appearance.headOverlays and type(appearance.headOverlays) == 'table' then
      for overlay, data in pairs(appearance.headOverlays) do
        SetPedHeadOverlay(ped, overlay, data.value, data.opacity, data.primaryColor, data.secondaryColor)
      end
    end
  end
end

utils = {
  setPlayerModel = setPlayerModel,
  setPedHeadBlend = setPedHeadBlend,
  setPedComponent = setPedComponent,
  setPedFaceFeatures = setPedFaceFeatures,
  setPedAppearance = setPedAppearance,
  

  getPedAppearance = getPedAppearance,
  getPedComponents = getPedComponents,
  getPedProps = getPedProps,
  getPedFaceFeatures = getPedFaceFeatures,
  getPedHeadOverlays = getPedHeadOverlays,
  getPedHair = getPedHair,
  getPedModel = getPedModel,
  getPedHeadBlend = getPedHeadBlend,
}
