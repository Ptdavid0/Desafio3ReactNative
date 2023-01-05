import { IconProps, SignOut } from "phosphor-react-native";
import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { useTheme } from "native-base";

const SignOutIcon: React.FC<IconProps> = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const handleSignOut = () => {
    navigate("Home");
  };
  return (
    <Pressable onPress={handleSignOut}>
      <SignOut size={24} color={colors.red[500]} />
    </Pressable>
  );
};

export default SignOutIcon;
