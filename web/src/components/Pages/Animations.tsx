import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Flex,
  Pagination,
  SimpleGrid,
  Text,
  TextInput,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { AnimationProps, useAnimations } from "../../stores/animations";
import { locale } from "../../stores/locales";
import Animation from "./Animation";
import { AnimatePresence, motion } from "framer-motion";
import { MotionFlex } from "./FrontPage";
import { SimpleInput } from "../Generic/SimpleInput";

type AnimationPageProps = {
  type: AnimationProps["type"];
  sub?: string;
};

const MotionGrid = motion(SimpleGrid);
const MotionItem = motion.div;

export default function AnimationPage(props: AnimationPageProps) {
  const [search, setSearch] = useState("");
  const theme = useMantineTheme();
  const animPerPage = 15;
  const [page, setPage] = useState(1);

  const animations = useAnimations((state) => state.animations);
  const pedType = useAnimations((state) => state.pedType);

  // filter animations by category and search
  const filteredAnimations = useMemo(() => {
    return animations.filter((animation) => {
      const matchesType = animation.type === props.type;
      const matchesSub =
        !props.sub ||
        animation[props.sub as unknown as keyof AnimationProps];
      const matchesSearch =
        animation.label.toLowerCase().includes(search.toLowerCase()) ||
        animation.command.toLowerCase().includes(search.toLowerCase());
      const matchesPedType =
        (!animation.pedTypes && pedType === "humans") ||
        animation.pedTypes?.includes(pedType);

      return matchesType && matchesSearch && matchesSub && matchesPedType;
    });
  }, [animations, search, props.type, props.sub, pedType]);

  // Chunk animations into pages
  const pages = useMemo(() => {
    const p: AnimationProps[][] = [];
    for (let i = 0; i < filteredAnimations.length; i += animPerPage) {
      p.push(filteredAnimations.slice(i, i + animPerPage));
    }
    return p;
  }, [filteredAnimations]);

  const currentExpression = useAnimations((state) => state.currentExpression);
  const currentWalk = useAnimations((state) => state.currentWalk);

  const isAnimSelected = (animation: AnimationProps) => {
    if (props.type === "walk") {
      return currentWalk.name === animation.command;
    } else if (props.type === "expression") {
      return currentExpression.name === animation.command;
    }
    return false;
  };

  // Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 5, transition: { duration: 0.2 } },
};

  return (
    <Flex 
      flex={1} 
      h="100%" 
      w="100%"
      direction="column" 
      align="center"
      gap='xs'
    >

      <Flex w='80%' p='xs' bg='rgba(48, 48, 48, 0.8)' style={{borderRadius: theme.radius.xxs}}>
        <SimpleInput
            // size='xs'
            onChange={(value) => setSearch(value as string)}
            placeholder='Search'
  
            rightSection={
              <FontAwesomeIcon icon={'fa fa-search' as IconProp}
                style={{
                  fontSize: theme.fontSizes.xs,
                }}
              />
            }
          />
      </Flex>
    
      {filteredAnimations.length == 0 ? (
          <AnimatePresence>
            <MotionFlex
              key="no-animations"
              gap="sm"
              align="center"
              w="100%"
              ml="auto"
              h="100%"
              justify={"center"}
              mr="auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <FontAwesomeIcon
                icon={"fa fa-exclamation-triangle" as IconProp}
                style={{
                  fontSize: theme.fontSizes.xl,
                  color: "rgba(255,255,255,0.8)",
                }}
              />
              <Flex direction={"column"}>
                <Text size="sm">{locale("Warning").toUpperCase()}</Text>
                <Text size="xs" c="rgba(255,255,255,0.8)">
                  {locale("NoAnimationsWarning")}
                </Text>
              </Flex>
            </MotionFlex>
          </AnimatePresence>
      ): (
        <Flex
          flex={1}
          w='100%'
        >
          <MotionGrid
            p="xs"
            w="100%"
            cols={filteredAnimations.length == 0 ? 1 : 3}
            spacing="xs"
            h='fit-content'
            mah="100%"
            verticalSpacing="xs"
            style={{ overflow: "hidden" }}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {pages[page - 1].map((animation) => (
                <MotionItem
                  key={animation.command}
                  variants={itemVariants}
                  exit="exit"
                  layout
                >
                  <Animation
                    {...animation}
                    selected={isAnimSelected(animation)}
                  />
                </MotionItem>
              ))}
            </AnimatePresence>
          </MotionGrid>
        </Flex>

      )}

      <AnimatePresence>
        {pages.length > 1 && (
          <MotionFlex
            key="pagination"
            w="100%"
            justify="center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            <Pagination
              onChange={(selectedPage) => setPage(selectedPage)}
              total={pages.length}
              radius="xxs"
              styles={{
                control: {
                  fontSize: theme.fontSizes.xxs,
                  // backgroundColor: 'rgba(0,0,0,0.5)',
                  outline: "none",
                  border: "none",
                },
              }}
            />
          </MotionFlex>
        )}
      </AnimatePresence>

    </Flex>
  );
}
