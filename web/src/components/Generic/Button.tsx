const iconVariants = {
  idle: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: [0, -10, 10, 0],
    scale: 1.1,
    transition: {
      rotate: {
        duration: 0.6,
        ease: "easeInOut",
      },
      scale: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  },
  tap: {
    scale: 0.9,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 30,
    }
  }
};

import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { AnimatePresence, motion, Variants } from "framer-motion";
import colorWithAlpha from "../../utils/colorWithAlpha";

type ButtonProps = {
  disabled?: boolean;
  text?: string;
  icon?: string;
  h?: string;
  w?: string;
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mr?: string;
  mb?: string;
  mt?: string;
  ml?: string;
  bg?: string;
  radius?: string;
  rect?: boolean;
  onClick?: () => void;
  color?: string;
  hoverColor?: string;
  fontSize?: string;
  iconSize?: string;
  selected?: boolean;
  align?: string;
  
  // style css properties 
  style?: React.CSSProperties;
}

// Motion variants for different animation states
const buttonVariants = {
  idle: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    }
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 30,
    }
  },
  disabled: {
    scale: 1,
    y: 0,
    opacity: 0.6,
  }
};



const outlineVariants = {
  idle: {
    opacity: 0,
    scale: 1,
  },
  hover: {
    opacity: 1,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    }
  },
  selected: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    }
  }
};

export default function Button(props: ButtonProps) {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  
  const colors = {
    iconColor: {
      hovered: 'rgba(255,255,255,0.9)',
      normal: 'rgba(255,255,255,0.6)',
    },
    textColor: {
      hovered: 'rgba(255,255,255,0.9)',
      normal: 'rgba(255,255,255,0.6)',
    },
    borderColor: {
      hovered: colorWithAlpha(theme.primaryColor, 0.3),
      normal: theme.primaryColor,
    },
  };

  const getAnimationState = () => {
    if (props.disabled) return "disabled";
    if (hovered || props.selected) return "hover";
    return "idle";
  };

  // Calculate padding based on button type
  const getPadding = () => {
    if (props.p) return props.p; // Use explicit padding if provided
    return props.rect ? `0vh 1vh` : theme.spacing.xs; // Reduced padding for rect buttons
  };

  return (
    <motion.div
      ref={ref}
      variants={buttonVariants as Variants}
      initial="idle"
      animate={getAnimationState()}
      whileTap={!props.disabled ? "tap" : undefined}
      style={{
        position: 'relative',
        display: 'flex',
        width: props.w || 'fit-content',
        height: props.h || 'fit-content',
        marginRight: props.mr || '0',
        marginBottom: props.mb || '0',
        marginTop: props.mt || '0',
        marginLeft: props.ml || '0',
      }}
      onClick={() => {
        if (!props.disabled && props.onClick) {
          props.onClick();
        }
      }}
    >
      {/* Background with smooth color transitions */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: props.radius || theme.radius.xxs,
          zIndex: 1,
        }}
        animate={{
          backgroundColor: !props.disabled && (hovered || props.selected) 
            ? colorWithAlpha(props.hoverColor || theme.colors[theme.primaryColor][9], 0.4) 
            : !props.disabled 
            ? 'rgba(66, 66, 66, 0.5)' 
            : 'rgba(48,48,48,0.3)'
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut"
        }}
      />

      {/* Animated outline */}
      <motion.div
        variants={outlineVariants as Variants}
        initial="idle"
        animate={props.selected ? "selected" : hovered && !props.disabled ? "hover" : "idle"}
        style={{
          position: 'absolute',
          inset: 0,
          border: `0.2vh solid ${colorWithAlpha(props.hoverColor || theme.colors[theme.primaryColor][9], 0.8)}`,
          borderRadius: props.radius || theme.radius.xxs,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Main content container */}
      <Flex
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          height: '100%',
          userSelect: 'none',
          aspectRatio: !props.rect ? '1/1' : 'unset',
          borderRadius: props.radius || theme.radius.xxs,
          cursor: !props.disabled ? 'pointer' : 'not-allowed',
          padding: getPadding(),
          ...props.style,
        }}
        align='center'
        justify='center'
      >
        {/* Content wrapper to keep icon and text aligned */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: props.icon && props.text ? theme.spacing.xs : '0',
          }}
        >
          {props.icon && (
            <motion.div
              variants={iconVariants as Variants}
              initial="idle"
              animate={getAnimationState()}
              whileTap={!props.disabled ? "tap" : undefined}
            >
              <FontAwesomeIcon 
                icon={props.icon as IconName || 'fa-play'} 
                style={{ 
                  color: (hovered || props.selected) && !props.disabled 
                    ? colors.iconColor.hovered 
                    : colors.iconColor.normal,
                  fontSize: props.iconSize || theme.fontSizes.sm,
                  aspectRatio: '1/1',
                  marginBottom: props.text ? '0.2vh' : '0',
                }} 
              />
            </motion.div>
          )}

          {props.text && (
            <Text
              style={{
                fontFamily: 'Akrobat Bold',
                color: !props.disabled && (hovered || props.selected) 
                  ? colors.textColor.hovered 
                  : colors.textColor.normal,
                fontSize: props.fontSize || theme.fontSizes.sm,
              }}
            >
              {props.text}
            </Text>
          )}
        </div>

        {/* Ripple effect on click */}
        <AnimatePresence>
          {hovered && !props.disabled && (
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: colorWithAlpha(props.hoverColor || theme.colors[theme.primaryColor][9], 0.3),
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
          )}
        </AnimatePresence>
      </Flex>
    </motion.div>
  );
}