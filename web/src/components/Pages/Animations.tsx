import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Pagination, SimpleGrid, Text, TextInput, Transition, useMantineTheme } from "@mantine/core";
import { useMemo, useState } from "react";
import { AnimationProps, useAnimations } from "../../stores/animations";
import { locale } from "../../stores/locales";
import Animation from "./Animation";

type AnimationPageProps = {
  type: AnimationProps['type'];
  sub?: string;
};

export default function AnimationPage(props: AnimationPageProps) {
  const [search, setSearch] = useState('');
  const theme = useMantineTheme();
  const animPerPage = 15;
  const [page, setPage] = useState(1); // Start at page 1 for user-friendly indexing
  const animations = useAnimations((state) => state.animations); // Don't filter prematurely
  const pedType = useAnimations((state) => state.pedType);
  // filter animations by category and search   
  const filteredAnimations = useMemo(() => {
    const validAnimations = animations.filter((animation) => {
      const matchesType = animation.type === props.type;
      const matchesSub = !props.sub || animation[props.sub as unknown as keyof AnimationProps];
      const matchesSearch =
        animation.label.toLowerCase().includes(search.toLowerCase()) ||
        animation.command.toLowerCase().includes(search.toLowerCase());
  
      const matchesPedType = !animation.pedTypes  && pedType == 'humans' || animation.pedTypes?.includes(pedType);

      return matchesType && matchesSearch && matchesSub && matchesPedType;
    });
    return validAnimations;
  }, [animations, search, props.type, props.sub, pedType]);
  

  // Chunk animations into pages
  const pages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < filteredAnimations.length; i += animPerPage) {
      pages.push(filteredAnimations.slice(i, i + animPerPage));
    }
    return pages;
  }, [filteredAnimations]);
  const currentExpression = useAnimations((state) => state.currentExpression);
  const currentWalk = useAnimations((state) => state.currentWalk);

  const isAnimSelected = (animation: AnimationProps) => {
    // check if this option and animation is selected if the type is walk or expression 
    if (props.type === 'walk') {
      return currentWalk.name === animation.command;
    } else if (props.type === 'expression') {
      return currentExpression.name === animation.command;
    } else {
      return false;
    }
  }

  return (
    <Flex
      flex={1}
      h="100%"
      w="100%"
      // gap="xs"
      direction="column"
      align="center"
    > 

        <TextInput
          // size='xs'
          radius='xxs'
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder='Search'
          w='80%'
          leftSection={
            <FontAwesomeIcon icon={'fa fa-search' as IconProp}
              style={{
                fontSize: theme.fontSizes.xs,
              }}
            />
          }
        />
 
      <SimpleGrid
        mt='xs'
        p="xs"
        w="100%"
        cols={filteredAnimations.length == 0 ? 1 : 3}
        spacing="xs"
        mah="79vh"
        verticalSpacing="xs"
        style={{
          overflow: "hidden",
        }}
      >
        {filteredAnimations.length === 0 ? (
          <Flex 
            gap='sm'
            align='center'
            w='60%'
            ml='auto'
            h='70vh'
            justify={'center'}
            mr='auto'
            
          >
            <FontAwesomeIcon
              icon={'fa fa-exclamation-triangle' as IconProp}
              style={{
                fontSize: theme.fontSizes.xl,
                color: 'rgba(255,255,255,0.8)',
              }}
            />
            <Flex
              direction={'column'}
            >
              <Text size='sm'>{locale('Warning').toUpperCase()}</Text>
              <Text size='xs' c='rgba(255,255,255,0.8)'>{locale('NoAnimationsWarning')}</Text>
            </Flex>
          </Flex>
        ): (
          pages[page - 1].map((animation) => (
            <Animation
              key={animation.command}
               {...animation}
              selected={isAnimSelected(animation)}
            />
          ))
        )}
      </SimpleGrid>
        <Transition
          duration={200}
          timingFunction="ease"
          transition="fade"
          mounted={pages.length > 1}
        >
          {(styles) => (
            <Pagination
            
              style={{
                ...styles,
                userSelect: 'none',

              }}
              onChange={(selectedPage) => setPage(selectedPage)}
              mt="auto"
              total={pages.length}
              // page={page} // Ensure controlled pagination
              radius='xxs'
              pt='xs'
              styles={{
                control: {
                  // backgroundColor: 'rgba(66, 66, 66, 0.5)',
                  outline: 'none', 
                  border: 'none',
        
                }
              }}
            />
          )}
        </Transition>
    </Flex>
  );
}
