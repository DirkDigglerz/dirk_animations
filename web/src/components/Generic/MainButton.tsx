import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import colorWithAlpha from "../../utils/colorWithAlpha";

import { useEffect } from "react";
import { useAudio } from "../../stores/audio/store";

type MainButtonProps = {
  icon: string;
  label: string;
  w?: string;
  h?: string
  bgImg?: string;
  description?: string;
  flex?: number
  onClick?: () => void;
}



function MainButton(props:MainButtonProps) {
  const theme = useMantineTheme()
  const {ref, hovered} = useHover()
  const playSound = useAudio(state => state.play)

  useEffect(() => {
    if(hovered){
    playSound('hover')
    }
  }, [hovered])
  
  return (

      <Flex
        ref={ref}
        h={props.h}
        flex={props.flex}
        align='center'
        w={props.w}
        justify='center'  
        onClick={() => {
          if (props.onClick) {
            props.onClick()
            playSound('click')
          }

        }}
        p='sm'
        style={{
          transition: 'all ease-in-out 0.2s',
          boxShadow: hovered ? `inset 0 0 8vh ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : 'inset 0 0 0.2vh rgba(0,0,0,0.6)', 
          outline: hovered ?  `0.2vh solid ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8)}` : '0.2rem solid transparent',
          backgroundColor: hovered ? 'rgba(77,77,77,0.6)' : 'rgba(77,77,77,0.5)',
          userSelect: 'none', 
          borderRadius: theme.radius.xxs,
          backgroundImage: props.bgImg ? `url('./${props.bgImg}.png')` : 'none',
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          cursor: 'pointer',
        }}
      >
        <Flex
          direction='column'
          mt='auto'
          mr='auto'
          gap='xxs'
          style={{
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
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
                color: !hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,1)',
                fontSize: theme.fontSizes.xs,
              }}
            />
            <Text
              c={!hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,1)'}
              size={theme.fontSizes.xs}
              style={{
                fontFamily: 'Akrobat Bold',
                transition: 'all ease-in-out 0.2s',
              }}
            >{props.label}</Text>
          </Flex>
          {props.description && <Text
            c={!hovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.8)'}
            style={{
              transition: 'all ease-in-out 0.2s',
            }}
            size = {theme.fontSizes.xs}
            mih={theme.spacing.md}
          >{props.description}</Text>}
        </Flex>
      </Flex>

  )
}

export default MainButton