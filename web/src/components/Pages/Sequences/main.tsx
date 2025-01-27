import { Flex, Input, Text, Transition, useMantineTheme } from "@mantine/core";
import { Title } from "../../Generic/Title";
import { useState } from "react";
import { AnimationProps, useAnimations } from "../../../stores/animations";

type SequenceProps = {
  command: string;
  _type: string;
  option: number;
  postWait: number;
}

export default function Sequences() {
  const theme = useMantineTheme()
  const sequenceBox = useAnimations(state => state.sequenceBox)
  const [currentSequence, setCurrentSequence] = useState<SequenceProps[]>([
    {
      command: 'dance',
      _type: 'animations',
      option: 1,
      postWait: 0,
    },
    {
      command: 'dance',
      _type: 'animations',
      option: 1,
      postWait: 0,
    },
    {
      command: 'dance',
      _type: 'animations',
      option: 1,
      postWait: 0,
    },
    {
      command: 'dance',
      _type: 'animations',
      option: 1,
      postWait: 0,
    },

  ])
  return (
    <Transition 
      duration={300}
      timingFunction='ease'
      transition='fade'
      mounted={sequenceBox as boolean}
    >
      {(inTransition) => (
        
        <Flex
          pos='absolute'
          left='36%'
          top='50%'
          w='104.5vh'
          // h='30vh'
          bg='rgba(0,0,0,0.8)'
          direction='column'
          align={'center'}
          p='sm'
          gap='xs'
          style={{
            ...inTransition,
            transform: 'translate(-50%, -50%)',
            borderRadius: theme.radius.xxs,

          }}
        >
          <Title
            mt='sm'
            title="Sequences"
            description="Create and manage sequences of animations"
            icon='fa fa-list'
            closeButton
            onClose={() => {
              useAnimations.setState({sequenceBox: false})
            }}

            extraButtons={[
              {icon: 'fa fa-plus', onClick: () => {}},
              {icon: 'fa fa-trash', onClick: () => {}},
              {icon: 'fa fa-save', onClick: () => {}},
            ]}
          />
          <Flex
            flex={1}
            w='100%'
            // bg='rgba(77, 77, 77, 0.6)'
            gap='xs'
            p='xs'
            align={'center'}
          > 
            <SequenceAnimBox 
              command={currentSequence[0].command}
              _type={currentSequence[0]._type}
              option={currentSequence[0].option}
              onDrop={(anim:AnimationProps) => {
                
              }}    
            />
            <WaitTimeInput time={
              currentSequence[0].postWait
            } onChange={(time) => {
              const newSequence = [...currentSequence]
              newSequence[0].postWait = time
              setCurrentSequence(newSequence)
            }}/>
            <SequenceAnimBox 
              command={currentSequence[1].command}
              _type={currentSequence[1]._type}
              option={currentSequence[1].option}
              onDrop={(anim:AnimationProps) => {
                
              }}  
            />
            <WaitTimeInput time={currentSequence[1].postWait} onChange={(time) => {
              const newSequence = [...currentSequence]
              newSequence[1].postWait = time
              setCurrentSequence(newSequence)
            }}/>
            <SequenceAnimBox 
              command={currentSequence[2].command}
              _type={currentSequence[2]._type}
              option={currentSequence[2].option}
              onDrop={(anim:AnimationProps) => {
                
              }}  
            />
            <WaitTimeInput time={currentSequence[2].postWait} onChange={(time) => {
              const newSequence = [...currentSequence]
              newSequence[2].postWait = time
              setCurrentSequence(newSequence)
            }}/>
            <SequenceAnimBox 
              command={currentSequence[3].command}
              _type={currentSequence[3]._type}
              option={currentSequence[3].option}
              onDrop={(anim:AnimationProps) => {
                
              }}  
            />


          </Flex>
        </Flex>
      )}
    </Transition>

    
  
  ) 

}

type SequenceAnimBoxProps = {
  command: string;
  _type: string;
  option: number;
  onDrop: (anim:AnimationProps) => void;
}


function SequenceAnimBox(props:SequenceAnimBoxProps){
  const theme = useMantineTheme()
  return (
    <Flex
      h='14vh'
      m='xs'
      bg='rgba(77, 77, 77, 0.6)'
      style={{
        borderRadius: theme.radius.xxs,
        outline: `0.2vh solid rgba(77, 77, 77, 0.8)`,
        boxShadow: `inset 0 0 2vh rgba(122, 122, 122, 0.8)`,
        aspectRatio: '1/1',
      }}
    />
  )
}



type WaitTimeInputProps = {
  time: number;
  onChange: (time: number) => void;
}

function WaitTimeInput(props:WaitTimeInputProps){
  const theme = useMantineTheme()
  return (
    <Flex
      // h='8vh'
      m='xs'
      bg='rgba(77, 77, 77, 0.6)'
      style={{
        borderRadius: theme.radius.xxs,
        outline: `0.2vh solid rgba(77, 77, 77, 0.8)`,
        // boxShadow: `inset 0 0 2vh rgba(122, 122, 122, 0.8)`,
      }}
      p='xs'
      direction={'column'}
      gap='xs'
    >
      <Text
        size='xs'
        ta='center'
        w='100%'
        c='rgba(255, 255, 255, 0.8)'
      >WAIT</Text>

      <Input 
        w='8vh'
        ta='center' 
        size='xs'
        radius='xxs'
      
        type='number'
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
        value={props.time}
        onChange={(event) => {
          const time = parseInt(event.currentTarget.value)
          if (!isNaN(time)){
            props.onChange(time)
          }
        }}
      />
    </Flex>
  )
}