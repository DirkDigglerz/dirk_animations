import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import colorWithAlpha from "../../utils/colorWithAlpha";

import { useEffect } from "react";
import { useAudio } from "../../stores/audio/store";
import { locale } from "../../stores/locales";

type MainButtonProps = {
  icon: string;
  label: string;
  w?: string;
  h?: string
  bgImg?: string;
  description?: string;
  flex?: number
  onClick?: () => void;
  comingSoon?: boolean;
}



function MainButton(props:MainButtonProps) {
  const theme = useMantineTheme()
  const {ref, hovered} = useHover()
  const playSound = useAudio(state => state.play)

  useEffect(() => {
    if (props.comingSoon) {
      return
    }
    if(hovered){
    playSound('hover')
    }
  }, [hovered, props.comingSoon])
  
  return (

      <Flex
    
        ref={ref}
        h={props.h}
        flex={props.flex}
        align='center'
        w={props.w}
        justify='center'  
        onClick={() => {
          if (props.comingSoon) {
            return
          }
          if (props.onClick) {
            props.onClick()
            playSound('click')
          }

        }}
        p='sm'
        style={{
          transition: 'all ease-in-out 0.2s',
          boxShadow: (!props.comingSoon && hovered) ? `inset 0 0 8vh ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : 'inset 0 0 0.2vh rgba(0,0,0,0.6)', 
          outline: (!props.comingSoon && hovered) ?  `0.2vh solid ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8)}` : '0.2rem solid transparent',
          backgroundColor: (!props.comingSoon && hovered) ? 'rgba(77,77,77,0.6)' : !props.comingSoon? 'rgba(77,77,77,0.5)' : 'rgba(77,77,77,0.3)',
          userSelect: 'none', 
          borderRadius: theme.radius.xxs,
          backgroundImage: props.bgImg ? `url('./${props.bgImg}.png')` : 'none',
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          cursor: !props.comingSoon ? 'pointer' : 'default',
        }}
      >
        <Flex
          direction='column'
          mt='auto'
          mr='auto'
          gap='xxs'
          style={{
            transform: (!props.comingSoon && hovered) ? 'scale(1.02)' : 'scale(1)',
            transition: 'all ease-in-out 0.2s',
          }}
        >
          <Flex
            align='center'
            gap='xxs'

          >
            <FontAwesomeIcon icon={props.icon as IconProp} 
              style={{
                transition: 'all ease-in-out 0.2s',
                color: !(!props.comingSoon && hovered) ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,1)',
                fontSize: theme.fontSizes.xs,
              }}
            />
            <Text
              c={!(!props.comingSoon && hovered) ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,1)'}
              size={theme.fontSizes.xs}
              style={{
                fontFamily: 'Akrobat Bold',
                transition: 'all ease-in-out 0.2s',
              }}
            >{props.label}</Text>
          </Flex>
          {(props.description || props.comingSoon) && <Text
            c={!(!props.comingSoon && hovered) ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.8)'}
            style={{
              transition: 'all ease-in-out 0.2s',
            }}
            size = {theme.fontSizes.xs}
            mih={theme.spacing.md}
          >{props.comingSoon ? locale('ComingSoon') : props.description}</Text>}
        </Flex>
      </Flex>

  )
}

export default MainButton