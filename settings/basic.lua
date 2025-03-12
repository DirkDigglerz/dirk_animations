return {
  interact               = 'interact', -- How players interact with others (used for selecting shared emote recipient if you wish)
  menuCommand            = 'emotemenu', -- Command to open the menu
  convertScullyEmotes    = true, -- will convert scullyEmotes format to clean_animations from conversions/scullyFormatAnims.lua  
  disableIdleCamDefault  = true, -- will set the idle cam to false as default
  forceSharedNearest     = false,-- Allows players to target/interact with player of their choice upon choosing a shared animation. 
  defaultBinds = {
    toggleFocus = 'LMENU',
    menu    = 'F3',
    cancel  = 'X',
    handsup = 'X',
    point   = 'B',
    crouch  = 'LCONTROL',
  },

  
  useCrouch         = true, -- Enable/disable crouch feature
  useHandsup        = true, -- Enable/disable handsup feature
  placeAnimDist = 5.0,    ---## Distance to place animation
  placeAnimTaskTime = 10, ---## Time to reach destination
}