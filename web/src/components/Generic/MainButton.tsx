import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { motion } from "framer-motion";
import colorWithAlpha from "../../utils/colorWithAlpha";

import { useEffect, useMemo } from "react";
import { useAudio } from "../../stores/audio/store";

type MainButtonProps = {
  icon: string;
  label: string;
  w?: string;
  h?: string;
  bgImg?: string;
  disabled?: boolean;
  description?: string;
  flex?: number;
  onClick?: () => void;
};

function MainButton(props: MainButtonProps) {
  const theme = useMantineTheme();
  const { ref, hovered } = useHover();
  const playSound = useAudio(state => state.play);

  useEffect(() => {
    if (props.disabled) return 
    if (!hovered) return 
    playSound('hover');

  }, [hovered, playSound, props.disabled]);

  const realHovered = useMemo(() => {
    return hovered && !props.disabled;
  }, [hovered, props.disabled]);

  return (
    <motion.div
      ref={ref}
      style={{
        height: props.h,
        flex: props.flex,
        width: props.w,
        padding: theme.spacing.sm,
        borderRadius: theme.radius.xxs,
        backgroundImage: props.bgImg ? `url('./${props.bgImg}.png')` : 'none',
        backgroundBlendMode: 'multiply',
        backgroundSize: 'cover',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animate={{
        boxShadow: realHovered 
          ? `inset 0 0 8vh ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` 
          : 'inset 0 0 0.0vh rgba(0,0,0,0.6)',
        filter: realHovered ? 'brightness(1.1)' : 'brightness(1)',
        outline: realHovered
          ? `0.2vh solid ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8)}`
          : '0.2vh solid transparent',
        backgroundColor: realHovered ? 'rgba(45, 45, 45, 0.6)' : !props.disabled ? 'rgba(28, 28, 28, 0.7)' : 'rgba(22, 22, 22, 0.3)',
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.2
      }}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
          playSound('click');
        }
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 'auto',
          marginRight: 'auto',
          gap: theme.spacing.xxs,
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.2
        }}
      >
        <Flex
          align='center'
          gap='xxs'
          style={{
            filter: realHovered ? 'brightness(1.1)' : 'brightness(1)',
          }}
        >
          <FontAwesomeIcon
            icon={props.icon as IconProp}
            color='rgba(255,255,255,0.8)'
            style={{
              fontSize: theme.fontSizes.xxs,
              aspectRatio: '1 / 1'
            }}
            />
            <Text
              size='xs'
              c='rgba(255,255,255,0.8)'
              style={{
                fontFamily: 'Akrobat Bold', 
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}

            >{props.label}</Text>
        </Flex>
        {props.description && (
          <motion.div
            animate={{
              color: realHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)',
            }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.2
            }}
          >
            <Text
              style={{
                color: 'inherit',
                minHeight: theme.spacing.md,
              }}
              size={theme.fontSizes.xxs}
            >
              {props.description}
            </Text>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default MainButton;