import React from "react";
import { Box, Pressable, useTheme, Text } from "native-base";
import { Platform } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  resetForm: () => void;
  isCreating: boolean;
};

const FormHeader: React.FC<Props> = ({ resetForm, isCreating }) => {
  const { colors, sizes, fonts } = useTheme();
  const { goBack } = useNavigation();

  const handleGoBack = () => {
    resetForm();
    goBack();
  };
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      height={Platform.OS === "android" ? 60 : 85}
      bg={colors.gray[200]}
      pt={Platform.OS === "android" ? 0 : 15}
      px={sizes[2]}
    >
      <Pressable onPress={handleGoBack}>
        <ArrowLeft size={24} weight="bold" />
      </Pressable>

      <Text fontSize={sizes[5]} fontFamily={fonts.heading}>
        {isCreating ? "Criar anúncio" : "Editar anúncio"}
      </Text>

      <Box></Box>
    </Box>
  );
};

export default FormHeader;
