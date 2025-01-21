import { Flex, Grid } from "@mantine/core";
import MainButton from "../Generic/MainButton";
import { useAnimations } from "../../stores/animations";
import AnimationPage from "./Animations";

export default function FrontPage(){
  const categories = useAnimations(state => state.categories)
  const setPage = useAnimations(state => state.setPage)
  return (
    <Flex
      flex={1}
      direction={'column'}
      align='center'
      w='100%'
      gap='xs'
      p='sm'
    >
      <MainButton
        icon='fa fa-magic'
        label='ANIMATIONS'
        description='View all animations available'
        h='20vh'
        w='100%'
        onClick={() => {
          setPage(<AnimationPage />, 'animations')
        }}
      />
      <Grid
        w='100%'
        columns={3}
        gutter='xs'
      >
        {categories.map((category, index) => (
          <Grid.Col
            span={1}
            key={index}
          >
            <MainButton
              icon={category.icon}
              label={category.label.toUpperCase()}
              // description='View all animations available'
              h='10vh'
              onClick={() => {
                // set page to animations but with params of this category. 
              }}
            />
          </Grid.Col> 
        ))}  
      </Grid>
      <Flex
        mt='auto'
        gap='xs'
        w='100%'
      >
        <MainButton 
          // flex={2}
          icon='fa fa-clock'
          label='SEQUENCES'
          description='Create sequences of animations'
          h='10vh'
        />
        <MainButton 
          icon='fa fa-pencil'
          label='ANIM MAKER'
          h='10vh'
          description='Blend animations together'
        />
        <MainButton 
          icon='fa fa-camera'
          label='GIF MAKER'
          h='10vh'
          description='Dev tool for creating gifs'
        />
      </Flex>

    </Flex>
  )
}