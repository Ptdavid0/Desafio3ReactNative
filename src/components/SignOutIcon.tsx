import { IconProps, SignOut } from "phosphor-react-native";
import React from "react";
import { Pressable } from "react-native";
import { useTheme } from "native-base";
import { useAuth } from "../hooks/useAuth";

const SignOutIcon: React.FC<IconProps> = () => {
  const { colors } = useTheme();
  const { signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
  };
  return (
    <Pressable onPress={handleSignOut}>
      <SignOut size={24} color={colors.red[500]} />
    </Pressable>
  );
};

export default SignOutIcon;
