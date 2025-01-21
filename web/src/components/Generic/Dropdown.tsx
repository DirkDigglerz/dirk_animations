import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Flex, SegmentedControl, Slider, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import colorWithAlpha from "../../utils/colorWithAlpha";

type SettingsMenuProps = {
  target?: React.ReactNode;
  open: boolean;
  title: string;
  options: DropdownItemProps[];
}

export default function DropDown(props:SettingsMenuProps){
  const theme = useMantineTheme()
  return (
    <Flex
      pos='absolute'
      right='-0.5vh'
      bottom={'3.45vh'}
      p='xxs'
      bg='rgba(0,0,0,0.5)'
      // h='3.5vh'
      w='20vh'
      gap='xs'
      opacity={props.open ? 1 : 0}
      style={{
        transform: 'translate(100%, 100%)',
        borderRadius: theme.radius.xxs,
        transition: 'all 0.3s ease-in-out',
        userSelect: 'none', 
      }}
      direction={'column'}
      align='center'
      // p='xxs'
    >
      <Text
        ta='center'
        size='xs'
        w='90%'
        p='xxs'
        style={{
          fontFamily: 'Akrobat Bold',
          borderBottom: `0.1vh solid ${theme.colors[theme.primaryColor][9]}`
        }}
      >
        {props.title.toUpperCase()}
      </Text>

    </Flex>
  )
}

type DropdownItemProps = {
  label   : string;
  icon    : string;
  value   : unknown;
  type    : 'checkbox' | 'slider' | 'segments';
  segments?: string[];
  min?    : number;
  max?    : number;
  onChange? : (value: unknown) => void;
}

export function DropdownItem(props:DropdownItemProps){ 
  const {hovered, ref} = useHover()
  const theme = useMantineTheme()
  return (
    <Flex
      direction={props.type === 'segments' ? 'column' : 'row'}
      w='100%'
      ref={ref}
      onClick={() => {
        // if it sa checkbox manualy change the value
        if(props.type === 'checkbox'){
          if (props.onChange){
            props.onChange(!props.value)
          }
        } 
      }
    }
      gap='xs'
      align='center'
      p='xs'
      bg={hovered && (props.type != 'segments' && props.type != 'slider') ? 'rgba(44,44,44,0.7)': 'rgba(44,44,44,0.5)'}
      style={{
        cursor: 'pointer',
        transition: 'all 0.1s ease-in-out',
        borderRadius: theme.radius.xxs,
      }}
    >
      <Flex
        align='center'
        gap='xs'
      >
        <FontAwesomeIcon icon={props.icon as IconProp} 
          color='rgba(255,255,255,0.8)'
          style={{
            fontSize: theme.fontSizes.xxs,
          }}
        />
        <Text
          size='xxs'
        >
          {props.label}
        </Text>
      </Flex>


      {props.type === 'checkbox' && (
        <Checkbox 
          size='sm'
          ml='auto'
          radius='xxs'
          checked={props.value as boolean}
      
          onChange={(e) => {
            if (props.onChange){
              props.onChange(e.target.checked)
            }
          }}
        />
      )}

      {props.type === 'segments' && (
        <SegmentedControl
        bg='rgba(0,0,0,0.5)'
        radius='xxs'
        size='xs'
        color={colorWithAlpha(theme.colors[theme.primaryColor][9], 0.7)}
        withItemsBorders={false}
        data={props.segments as string[]}
        value={props.value as string} 
        onChange={(value) => {
          if (props.onChange){
            props.onChange(value)
          }
        }}
      />
      )}


      {props.type === 'slider' && (
        <Slider
          label = {(value: number) => (
            <Text
              size='xxs'
            >
              {value}
            </Text>
          )}
          radius='xxs'
          styles={{
            thumb: {
              aspectRatio: 1,
            },
            label: {
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: theme.radius.xxs,
              backgroundColor: 'rgba(0,0,0,0.5)',
              bottom: 'calc(100% + 0.5vh)',
              aspectRatio: '1/1',
              fontSize: '1vh',
          
            }
          }}
          flex={1}
          value={props.value as number}
          min={props.min || 0}
          max={props.max || 100}
          onChange={(value) => {
            if (props.onChange){
              props.onChange(value)
            }
          }}
          
        />
      )}
    </Flex>
  )
}