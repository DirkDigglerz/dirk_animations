import { Flex, Grid } from "@mantine/core";
import MainButton from "../Generic/MainButton";
import { useAnimations } from "../../stores/animations";
import AnimationPage from "./Animations";
import { locale } from "../../stores/locales";
import { motion, Variants } from "framer-motion";

const MotionGrid = motion(Grid);
const MotionCol = motion(Grid.Col);
// @ts-expect-error Mantine/Motion no likey
export const MotionFlex = motion(Flex);

export default function FrontPage() {
  const categories = useAnimations((state) => state.categories);
  const setPage = useAnimations((state) => state.setPage);

  // Container & item animation settings
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // controls spacing between items
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <MotionFlex
      flex={1}
      direction={"column"}
      align="center"
      w="100%"
      gap="xs"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} style={{ width: "100%" }}>
        <MainButton
          icon="fa fa-magic"
          label={locale("Animations").toUpperCase()}
          description={locale("ViewAllAnimations")}
          h="20vh"
          w="100%"
          onClick={() => {
            setPage(<AnimationPage type="animation" />, "animations");
          }}
        />
      </motion.div>

      <MotionGrid
        w="100%"
        columns={3}
        gutter="xs"
        variants={containerVariants}
      >
        <MotionCol span={1} variants={itemVariants}>
          <MainButton
            icon={"fa fa-walking"}
            label={locale("Walks").toUpperCase()}
            h="10vh"
            onClick={() => {
              useAnimations.setState((state) => ({
                ...state,
                page: <AnimationPage type="walk" />,
                pageId: "walks",
              }));
            }}
          />
        </MotionCol>

        <MotionCol span={1} variants={itemVariants}>
          <MainButton
            icon={"fa fa-mask"}
            label={locale("Faces").toUpperCase()}
            h="10vh"
            onClick={() => {
              useAnimations.setState((state) => ({
                ...state,
                page: <AnimationPage type="expression" />,
                pageId: "walks",
              }));
            }}
          />
        </MotionCol>

        <MotionCol span={1} variants={itemVariants}>
          <MainButton
            icon={"fa fa-user-friends"}
            label={locale("Shared").toUpperCase()}
            h="10vh"
            onClick={() => {
              useAnimations.setState((state) => ({
                ...state,
                page: <AnimationPage type="shared" />,
                pageId: "walks",
              }));
            }}
          />
        </MotionCol>

        <MotionCol span={1} variants={itemVariants}>
          <MainButton
            icon={"fa fa-box"}
            label={locale("Props").toUpperCase()}
            h="10vh"
            onClick={() => {
              useAnimations.setState((state) => ({
                ...state,
                page: <AnimationPage type="prop" />,
                pageId: "walks",
              }));
            }}
          />
        </MotionCol>

        {categories.map((category, index) => (
          <MotionCol span={1} key={index} variants={itemVariants}>
            <MainButton
              icon={category.icon}
              label={category.label.toUpperCase()}
              h="10vh"
              onClick={() => {
                // handle click for dynamic categories
              }}
            />
          </MotionCol>
        ))}
      </MotionGrid>

      <MotionFlex mt="auto" gap="xs" w="100%" variants={containerVariants}>
        <motion.div style={{ flex: 0.33 }} variants={itemVariants}>
          <MainButton
            flex={0.33}
            disabled
            icon="fa fa-clock"
            label={locale("Sequences").toUpperCase()}
            description="Create sequences of animations"
            h="10vh"
            onClick={() => {
              useAnimations.setState((state) => ({
                ...state,
                page: <AnimationPage type="animation" />,
                pageId: "animations",
                sequenceBox: true,
              }));
            }}
          />
        </motion.div>

        <motion.div style={{ flex: 0.33 }} variants={itemVariants}>
          <MainButton
            flex={0.33}
            disabled
            icon="fa fa-pencil"
            label={locale("Blend").toUpperCase()}
            h="10vh"
            description="Blend animations together"
          />
        </motion.div>
      </MotionFlex>
    </MotionFlex>
  );
}
