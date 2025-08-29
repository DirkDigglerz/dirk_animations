import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../utils/colorWithAlpha";
import BorderedIcon from "./BorderedIcon";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { MotionFlex } from "../Pages/FrontPage";

type TitleProps = {
  title: string;
  color?: string;
  description: string;
  icon: string;
  mt?: string;
  w?: string;
  iconSize?: string;
  removeBorder?: boolean;
  rightSection?: React.ReactNode;
  backButton?: boolean;
  onBack?: () => void;
  closeButton?: boolean;
  onClose?: () => void;
};


export function Title(props: TitleProps) {
  const theme = useMantineTheme();

  return (
    <MotionFlex
      mt={props.mt}
      direction="column"
      gap="xs"
      w={props.w || "100%"}
      pb={props.removeBorder ? "0" : "xs"}
      pl={!props.removeBorder ? "xs" : "0"}
      style={{
        userSelect: "none",
        borderBottom: props.removeBorder
          ? "none"
          : `0.2vh solid ${colorWithAlpha(
              props.color
                ? props.color
                : theme.colors[theme.primaryColor][9],
              0.5
            )}`,
      }}
      layout
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <MotionFlex align="center" justify={"center"} layout>
        <MotionFlex align="center" gap="sm" layout>
          <AnimatePresence initial={false}>
            {props.backButton && (
              <motion.div
                key="back-button"
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  iconSize="1.75vh"
                  icon="arrow-left"
                  color="blue"
                  onClick={props.onBack}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <BorderedIcon
            color={props.color}
            icon={props.icon as IconName}
            fontSize={props.iconSize || theme.fontSizes.md}
          />

          <Flex direction="column">
            <Text
              p="0"
              size="xs"
              style={{
                fontFamily: "Akrobat Bold",
              }}
            >
              {props.title}
            </Text>
            <Text size="xxs" c="grey">
              {props.description}
            </Text>
          </Flex>
        </MotionFlex>

        <MotionFlex ml="auto" align="center" gap="xs" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {props.rightSection && (
              <motion.div
                key="right-section"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {props.rightSection}
              </motion.div>
            )}

            {props.closeButton && (
              <motion.div
                key="close-button"
                layout
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  iconSize="1.75vh"
                  icon="times"
                  color="red"
                  onClick={props.onClose}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </MotionFlex>
      </MotionFlex>
    </MotionFlex>
  );
}
