import { useMantineTheme } from "@mantine/core"
import { useEffect } from "react"
import { AnimationProps, AnimCategoryProps, useAnimations } from "../../stores/animations"
import SideBar from "../Generic/SideBar"
import { Title } from "../Generic/Title"
import FrontPage from "../Pages/FrontPage"
import { useNuiEvent } from "../../hooks/useNuiEvent"
import { fetchNui } from "../../utils/fetchNui"

export default function Main() {
  const open = useAnimations(state => state.open)  
  const page = useAnimations(state => state.page)
  const pageId = useAnimations(state => state.pageId)
  const setPage = useAnimations(state => state.setPage)
  const theme = useMantineTheme()


  useNuiEvent('OPEN_ANIMATIONS', (data:{
    animations: AnimationProps[],
    categories: AnimCategoryProps[]
  }) => {

    console.log('OPEN_ANIMATIONS', JSON.stringify(data, null, 2))

    useAnimations.setState({ animations: data.animations })
    useAnimations.setState({ categories: data.categories })
    useAnimations.setState({ open: true })
    useAnimations.setState({ page: <FrontPage />, pageId: 'front' })
  })

  // listen for excape key 
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        useAnimations.setState({ open: false })
        fetchNui('CLOSE_ANIMATIONS')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown  ) 
  }, [])
  
  return (

    <SideBar
      menuOpen={open}
      h='100vh'
      w='30vw'
      p='md'
      style={{
        gap: theme.spacing.md,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
      }}

    
      
      onClose={() => {
        useAnimations.setState({ open: false })
        fetchNui('CLOSE_ANIMATIONS')  
      }}
    >
      <Title
        mt='lg'
        title={'Animations'}
        description="This is a description for the animations page"
        icon={'fa fa-magic'}
        onClose={() => {
          useAnimations.setState({ open: false })
          fetchNui('CLOSE_ANIMATIONS')  
        }}
        backButton={pageId != 'front'}
        onBack={()=>{
          if (pageId == 'animations'){
            setPage(<FrontPage />, 'front')
          }
        }}
        closeButton
        
      />
      {page}
    </SideBar>
  )
}


