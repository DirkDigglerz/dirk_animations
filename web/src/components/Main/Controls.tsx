import { Flex, Text, useMantineTheme } from "@mantine/core"
import { useAnimations } from "../../stores/animations"
import colorWithAlpha from "../../utils/colorWithAlpha"
import { AnimatePresence, motion } from "framer-motion"
import { MotionFlex } from "../Pages/FrontPage"
import { useMemo } from "react"

export function Controls(){
  const defaultBinds = useAnimations((state) => state.defaultBinds)
  const theme = useMantineTheme()
  const open = useAnimations((state) => state.open)
  const controlsOpen = useAnimations((state) => state.controlsOpen)

  const realOpen = useMemo(() => {
    return controlsOpen && open
  }, [controlsOpen, open])

  return (
    <AnimatePresence>
      {realOpen && (
        <MotionFlex
          direction={'column'}
          align='center'
          // slide from left 
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 0.2 }}
          // justify={'center'}
          // w='29vh'
          gap='xxs'
          bg='rgba(0,0,0,0.5)'
          p='xs'
          pos='absolute'
          top='2vh'
          left='2vh'
          style={{
            borderRadius: theme.radius.xs,
          }}      
        >
          <Text
            w='100%'
            size='xs'
            pl='xxs'
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'Akrobat Bold',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              borderBottom: `0.1vh solid ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.9)}`,
            }}
          
          >
            CONTROLS
          </Text>
          
          {/* // grid of controls */}
          <MotionFlex
            w='100%'
            // wrap={'wrap'}
            gap='xxs'
            justify={'center'}
          
          >
            {Object.keys(defaultBinds).map((key) => (
              <MotionFlex
                key={key}
                direction={'column'}
                align='center'
                gap='xs'
                p='xs'
              >
                <Text 
                  size='xxs'
                  w='3.25vh'
                  bg='rgba(0, 0, 0, 0.5)'
                  c='rgba(255, 255, 255, 0.8)'
                  ta='center'
                  style={{
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: theme.radius.xs,
                    outline: `0.1vh solid rgba(255, 255, 255, 0.2)`,
                    fontFamily: 'Akrobat Bold',
                  }}
                >
                    {defaultBinds[key]}
                </Text>
                <Text 
                  size='xxs'
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'Akrobat Bold',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                    {key}
                </Text>
              </MotionFlex>
            ))}
          </MotionFlex>
        </MotionFlex>
      )}
    </AnimatePresence>
  )
}