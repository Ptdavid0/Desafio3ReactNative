import React from "react";
import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  type: "Primary" | "Secundary" | "Tertiary";
  icon?: any;
  size?: "mid" | "full";
};

const Button: React.FC<Props> = ({
  title,
  type = "Primary",
  icon,
  size = "full",
  ...rest
}) => {
  const bgColor = {
    Primary: "blue.500",
    Secundary: "gray.300",
    Tertiary: "gray.700",
  };

  const _pressed = {
    Primary: "blue.700",
    Secundary: "gray.200",
    Tertiary: "gray.500",
  };

  // icon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}

  return (
    <NativeBaseButton
      w={size === "full" ? "100%" : "48%"}
      bgColor={bgColor[type]}
      borderWidth={0}
      borderRadius={6}
      h={14}
      _pressed={{
        bg: _pressed[type],
      }}
      _focus={{ borderWidth: 1, borderColor: "green.500", bg: "gray.700" }}
      leftIcon={icon}
      {...rest}
    >
      <Text
        color={type === "Secundary" ? "gray.700" : "white"}
        fontSize="md"
        fontFamily={"heading"}
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
};

export default Button;
