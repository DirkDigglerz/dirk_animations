import { Flex, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { useHover, useLocalStorage } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { AnimationProps, useAnimations } from "../../stores/animations";
import { useAudio } from "../../stores/audio/store";
import colorWithAlpha from "../../utils/colorWithAlpha";
import { fetchNui } from "../../utils/fetchNui";
import { locale } from "../../stores/locales";

export default function Animation(props: AnimationProps & {selected?: boolean} ) {  
  const [flipped, setFlipped] = useState(false);
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  const sequenceBox = useAnimations((state) => state.sequenceBox);
  const pedType = useAnimations((state) => state.pedType);

  

  const play = useAudio((state) => state.play);
  const options = useMemo(() => {
    switch(props.type) {
      case 'walk':
        return props.walks;
      case 'expression':
        return props.expressions;
      default:
        return props.animations;
    }
  }, [props])


  const [positionPref, setPosition] = useLocalStorage<
    'ON SPOT' | 'POSITION'
  >({
    key: 'animationPlacementPref',
    defaultValue: 'POSITION',
  });

  const canPosition = useMemo(() => {
    return (props.type != 'expression' && props.type != 'walk' && props.type != 'shared' && pedType == 'humans')
  }, [props, pedType])

  // if canPosition is false then return set our position to on spot 
  useEffect(() => {
    if (!canPosition) {
      setPosition('ON SPOT')
    }
  }, [canPosition])

  return (
    <Flex
      ref={ref}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e: React.MouseEvent) => {
        if (sequenceBox) {
          return 
        }
        e.preventDefault();
        if (e.button === 2) {
          play("click");
          if (flipped) {
            return 
          }
          setFlipped(true);
        } else {
          if (!flipped) {
            if (props.type == 'shared') {
              // temp close 
              useAnimations.setState({ open: false })
            }
            fetchNui('EXECUTE_ANIMATION', {
              command: props.command,
              type: props.type,
              option: 1,
              position: false,
            }).then((data) => {
              if (data == 'ok') {
                useAnimations.setState({ open: true })
              }
            })
          }
        }



      }}

      onMouseLeave={() => setFlipped(false)}
      style={{
        perspective: "100vh",
        width: "100%",
        height: "100%",
      }}
    >
      <Flex
        style={{
          width: "100%",
          height: "14vh",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
        }}
      >
        {/* Front Side */}
        <Flex
          bg={(props.selected || hovered) ? "rgba(45, 45, 45, 0.6)" : "rgba(28, 28, 28, 0.7)"}
          style={{
            position: "absolute",
            backfaceVisibility: "hidden",
            width: "100%",
            height: "100%",
            // pointerEvents: flipped ? "auto" : "none",
            borderRadius: theme.radius.xxs,
            boxShadow: (props.selected || hovered)
              ? `inset 0 0 8vh ${colorWithAlpha(
                  theme.colors[theme.primaryColor][theme.primaryShade as number],
                  0.8
                )}`
              : "inset 0 0 0.2vh rgba(0,0,0,0.6)",
            outline: (props.selected || hovered)
              ? `0.2vh solid ${colorWithAlpha(
                  theme.colors[theme.primaryColor][9],
                  0.8
                )}`
              : "0.1vh solid transparent",
            cursor: "pointer",
          }}
        >
          <CommandDisplay {...props} />
          <AnimationOptions {...props} />
        </Flex>

        {/* Back Side */}
        <Flex
          bg="rgba(28, 28, 28, 0.7)"
          p='xs'
          style={{
            position: "absolute",
            // pointerEvents: flipped ? "auto" : "none",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            width: "100%",
            height: "100%",
            borderRadius: theme.radius.xxs,
            display: "flex",
          }}
          direction={'column'}
          align={'center'}
          gap='xs'
        >
        
          {canPosition && <PositionToggle  />}
          <SimpleGrid
            cols={3}
            spacing='xs'
            // w='100%'
            flex={1}
            // bg='red'
            h='fit-content'
            w='90%'
            p='xs'
            style={{
              overflowY: 'auto',
            }}
          >
            {options?.map((animation, index) => (
              <AnimOption key={index} {...props} 
                optionNumber={index + 1}

                onClick={() => {
                
                  setFlipped(false);
                }}
              />
            ))}
          </SimpleGrid>
          {/* <CommandDisplay {...props} /> */}

        </Flex>
      </Flex>
    </Flex>
  );
}

function AnimOption(props: AnimationProps & {optionNumber: number, onClick: () => void}) {
  const currentExpression = useAnimations((state) => state.currentExpression);
  const currentWalk = useAnimations((state) => state.currentWalk);
  const isAnimSelected = useMemo(() => {
    // check if this option and animation is selected if the type is walk or expression 
    if (props.type === 'walk') {
      return currentWalk.name === props.command && currentWalk.option === props.optionNumber;
    } else if (props.type === 'expression') {
      return currentExpression.name === props.command && currentExpression.option === props.optionNumber;
    } else {
      return false;
    }
  }, [props, currentExpression, currentWalk])

  const [positionPref] = useLocalStorage<
    'ON SPOT' | 'POSITION'
  >({
    key: 'animationPlacementPref',
    defaultValue: 'POSITION',
  });
  const {ref, hovered} = useHover();
  const theme = useMantineTheme();

  const realHover = useMemo(() => {
    return hovered || isAnimSelected
  }, [hovered, isAnimSelected])

  return (
    <Text
      ref={ref}
      size='xs'
      bg='rgba(0,0,0,0.5)'

      style={{
        borderRadius: theme.radius.xxs,
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: realHover ? `inset 0 0 8vh ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : 'inset 0 0 0.2vh rgba(0,0,0,0.6)',  
        outline: realHover ? `0.1vh solid ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : '0.1vh solid transparent', 
        transition: 'all 0.2s ease-in-out',
      }}
      ta='center'
      onClick={() => {
        if (positionPref == 'POSITION') {
          useAnimations.setState({ open: false })
        }
        props.onClick();
        fetchNui<string>('EXECUTE_ANIMATION', {
          command: props.command,
          type: props.type,
          option: props.optionNumber,
        
          position: positionPref == 'POSITION',
        }).then((data:string) => {
          if (data == 'ok') {
            useAnimations.setState({ open: true })
          }
        })
      }}
    >
      {props.optionNumber}
    </Text>
  )
}


function PositionToggle() {
  const theme = useMantineTheme();
  const [positionPref, setPosition] = useLocalStorage<
    'ON SPOT' | 'POSITION'
  >({
    key: 'animationPlacementPref',
    defaultValue: 'POSITION',
  });





  const play = useAudio((state) => state.play);

  return (
    <Flex 
      bg='rgba(0,0,0,0.5)'
      w='100%'
      style={{
        cursor: 'pointer',
        borderRadius: theme.radius.xxs,
      }}
      onClick={() => {
        play("click");
        setPosition(positionPref == 'POSITION' ? 'ON SPOT' : 'POSITION');
      }}
      align='center'
      p='xxs'
    >
      <Text
        ta='center'
        size='xs'
        flex={0.5}
        p='xxs'
        c={positionPref == 'POSITION' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)'}
        bg={positionPref == 'POSITION' ? colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.4) :'rgba(77, 77, 77, 0.6)'}
        style={{
          borderTopLeftRadius: theme.radius.xxs,
          borderBottomLeftRadius: theme.radius.xxs,
          cursor: 'pointer',
        }}
        onClick={() => {
          play("click");
          setPosition('POSITION')
        }}
      >
        {locale('Position')}
      </Text>
      <Text
        ta='center'
        size='xs'
        flex={0.5}
        p='xxs'
        c={positionPref == 'ON SPOT' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)'}
        bg={positionPref == 'ON SPOT' ? colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.4) :'rgba(77, 77, 77, 0.6)'}
        style={{
          cursor: 'pointer',
          borderTopRightRadius: theme.radius.xxs,
          borderBottomRightRadius: theme.radius.xxs,
        }}
        onClick={() => {
          play("click");
          setPosition('ON SPOT')
        }}
      >
        {locale('OnSpot')}
      </Text>
    </Flex>
      
  )
}

function AnimationOptions(props: AnimationProps) {
  const theme = useMantineTheme();
  const optionAmount = useMemo(() => {
    return props.type == 'shared' ? props.animations?.length
    : props.type == 'walk' ? props.walks?.length
    : props.type == 'expression' ? props.expressions?.length
    : props.animations?.length
  }, [props])

  return (optionAmount && optionAmount > 1) && (
    <Text
      bg={colorWithAlpha(
        theme.colors[theme.primaryColor][theme.primaryShade as number],
        0.3
      )}
      p="0.3vh"
      style={{
        borderRadius: theme.radius.xxs,
        outline: `0.1vh solid ${colorWithAlpha(
          theme.colors[theme.primaryColor][theme.primaryShade as number],
          0.8
        )}`,
        position: "absolute",
        top: theme.spacing.xxs,
        right: theme.spacing.xs,
        transition: "all 0.2s ease-in-out",
      }}
      size="xs"
    >
      {optionAmount} OPTIONS
    </Text>
  )
}

function CommandDisplay(props: AnimationProps) {
  const theme = useMantineTheme();

  const commandStart = useMemo(() => {
    return props.type == 'shared' ? 'shared' 
    : props.type == 'walk' ? 'walk'
    : props.type == 'expression' ? 'face'
    : 'e'
  }, [props])

  return (
    <Flex 
      direction="column"
      gap={'xs'}
      style={{
        position: "absolute",
        bottom: theme.spacing.xs,
        left: theme.spacing.xs,
      }}
    >
      <Text
        size="sm"
        p="0"
        style={{
          lineHeight: "1.5vh",
        }}
      >
        {props.label}
      </Text>
      <Text
        size="xs"
        c="rgba(255,255,255,0.5)"
        style={{
          lineHeight: "1.2vh",
        }}
      >
        /{commandStart} {props.command}
      </Text>
    </Flex>
  );
}