import { Flex, SimpleGrid, Pagination, TextInput, useMantineTheme, Transition } from "@mantine/core";
import { useAnimations } from "../../stores/animations";
import Animation from "./Animation";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type AnimationPageProps = {
  filterCategory?: string;
};

export default function AnimationPage(props: AnimationPageProps) {
  const [search, setSearch] = useState('');
  const theme = useMantineTheme();
  const animPerPage = 15;
  const [page, setPage] = useState(1); // Start at page 1 for user-friendly indexing
  const animations = useAnimations((state) => state.animations).filter((animation) =>{
    return (animation.animations && !animation.walks && !animation.expressions)
  })


  // filter animations by search 
  const filteredAnimations = useMemo(() => {
    return animations.filter((animation) => {
      return (animation.animations && !animation.walks && !animation.expressions) && animation.label.toLowerCase().includes(search.toLowerCase()) || animation.command.toLowerCase().includes(search.toLowerCase());    
    });
  }, [animations, search]);

  // Chunk animations into pages
  const pages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < filteredAnimations.length; i += animPerPage) {
      pages.push(filteredAnimations.slice(i, i + animPerPage));
    }
    return pages;
  }, [filteredAnimations]);

  return (
    <Flex
      flex={1}
      h="100%"
      w="100%"
      gap="xs"
      direction="column"
      align="center"
    > 
      <TextInput
        size='xs'
        radius='xxs'
        onChange={(event) => setSearch(event.currentTarget.value)}
        placeholder='Search'
        w='60%'
        leftSection={
          <FontAwesomeIcon icon={'fa fa-search' as IconProp}
            style={{
              fontSize: theme.fontSizes.xs,
            }}
          />
        }
      />
      <SimpleGrid
        p="xs"
        w="100%"
        cols={3}
        spacing="xs"
        mah="79vh"
        verticalSpacing="xs"
        style={{
          overflow: "hidden",
        }}
      >
        {pages[page - 1]?.map((animation, index) => (
          <Animation key={index} {...animation} />
        ))}
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
              
            /> 
          )}
        </Transition>
    </Flex>
  );
}
