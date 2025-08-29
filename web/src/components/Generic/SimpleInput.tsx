import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Flex, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import colorWithAlpha from "../../utils/colorWithAlpha";

export type SimpleInputProps = {
  bg?: string;
  p?: string | number;
  w?: string | number;
  size?: string | number;
  disabled?: boolean;
  type?: 'text' | 'number' | 'email';
  value?: string | number;
  placeholder?: string;
  icon?: IconProp;
  onEnter?: (value: string | number) => void;
  onChange: (value: string | number) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  rightSection?: React.ReactNode;
  spellCheck?: boolean;
  style?: React.CSSProperties;
  autofocus?: boolean;
}

export function SimpleInput(props: SimpleInputProps) {
  const theme = useMantineTheme();
  const [focused, setFocused] = useState(false);

  return (
      <Flex
        bg={props.bg || 'transparent'}
        p={props.p}
        w={props.w || '100%'}
        style={{
          opacity: focused ? 1 : 0.8,
          borderBottom: `1px solid ${focused ? colorWithAlpha(theme.colors[theme.primaryColor][7], 0.8) : colorWithAlpha(theme.colors.dark[4], 0.5)}`,  
          transition: 'opacity 0.2s',
        }}
        align='center'
      >
        <input
          autoFocus={props.autofocus}
          type={props.type}
          value={props.value}
          onChange={(e) => props.onChange(e.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              props.onEnter?.(event.currentTarget.value);
            }
            props.onKeyDown?.(event);
          }}
          spellCheck={props.spellCheck || false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          
          placeholder={props.placeholder}
          style={{
            
            width: '100%',
            background:'transparent',
            outline: 'none',
            border: 'none',
            color:`rgba(255, 255, 255, ${focused ? 0.7 : 0.5})`,
            fontSize: props.size || theme.fontSizes.sm,
            ...props.style
          }}
        />
        {props.rightSection}
      </Flex>
  );
}