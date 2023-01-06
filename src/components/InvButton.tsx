import React from "react";
import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";
import { useTheme } from "native-base";

import { ArrowRight } from "phosphor-react-native";

type Props = IButtonProps & {
  title: string;
};

const InvButton: React.FC<Props> = ({ title, ...rest }) => {
  const { colors } = useTheme();
  return (
    <NativeBaseButton
      bgColor={"transparent"}
      borderWidth={0}
      borderRadius={6}
      _pressed={{
        bg: "transparent",
      }}
      _focus={{ borderWidth: 1, borderColor: "green.500", bg: "gray.700" }}
      rightIcon={<ArrowRight size={16} color={colors.blue[700]} />}
      {...rest}
    >
      <Text color={"blue.700"} fontSize="sm" fontFamily={"heading"}>
        {title}
      </Text>
    </NativeBaseButton>
  );
};

export default InvButton;
