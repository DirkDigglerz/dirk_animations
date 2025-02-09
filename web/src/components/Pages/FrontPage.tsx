import { Flex, Grid } from "@mantine/core";
import MainButton from "../Generic/MainButton";
import { useAnimations } from "../../stores/animations";
import AnimationPage from "./Animations";
import { locale } from "../../stores/locales";

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
          setPage(<AnimationPage type="animation" />, 'animations')
        }}
      />
      <Grid
        w='100%'
        columns={3}
        gutter='xs'
      >
        <Grid.Col
          span={1}
        >
          <MainButton
            icon={'fa fa-walking'}
            label={locale('Walks').toUpperCase()}
            h='10vh'
            onClick={() => {
              // set page to animations but with params of this category.
              useAnimations.setState((state) => ({...state, page: <AnimationPage type="walk"/>, pageId: 'walks'}))  
            }}
          />
        </Grid.Col>
        <Grid.Col
          span={1}
        >
          <MainButton
            icon={'fa fa-mask'}
            label={locale('Faces').toUpperCase()}
            h='10vh'
            onClick={() => {
              // set page to animations but with params of this category.
              useAnimations.setState((state) => ({...state, page: <AnimationPage type="expression"/>, pageId: 'walks'}))  
            }}
          />
        </Grid.Col>
        <Grid.Col
          span={1}
        >
          <MainButton
            icon={'fa fa-user-friends'}
            label={locale('Shared').toUpperCase()}
            h='10vh'
            onClick={() => {
              // set page to animations but with params of this category.
              useAnimations.setState((state) => ({...state, page: <AnimationPage type="shared"/>, pageId: 'walks'}))  
            }}
          />
        </Grid.Col>
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
          flex={0.33}
          comingSoon
          // flex={2}
          icon='fa fa-clock'
          label='SEQUENCES'
          description='Create sequences of animations'
          h='10vh'
          onClick={() => {
            console.log('clicked')
            useAnimations.setState((state) => ({...state, page: <AnimationPage type="animation"/>, pageId: 'animations', sequenceBox: true})) 
          }}
          
        />
        <MainButton 
          flex={0.33}
          comingSoon
          icon='fa fa-pencil'
          label='ANIM MAKER'
          h='10vh'
          description='Blend animations together'
        />
        <MainButton 
          flex={0.33}
          comingSoon 
          icon='fa fa-camera'
          label='GIF MAKER'
          h='10vh'
          description='Dev tool for creating gifs'
        />
      </Flex>

    </Flex>
  )
}