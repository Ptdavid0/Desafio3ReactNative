import React from "react";
import { Box, Pressable, useTheme } from "native-base";
import { Platform } from "react-native";
import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import ProductTag from "./ProductTag";
import { ProductDTO } from "../dtos/ProductDTO";

type Props = {
  isNew: boolean;
  isMySale?: boolean;
  product?: ProductDTO;
};

const HeaderDetails: React.FC<Props> = ({
  isNew,
  isMySale = false,
  product,
}) => {
  const { colors, sizes } = useTheme();
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>();

  const handleNavigateToEditSale = () => {
    if (product)
      navigate("FormSale", {
        product,
      });
  };
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      height={Platform.OS === "android" ? 60 : 112}
      bg={colors.gray[200]}
      pt={Platform.OS === "android" ? 0 : 58}
      px={sizes[2]}
    >
      <Pressable onPress={() => goBack()}>
        <ArrowLeft size={24} weight="bold" />
      </Pressable>
      {isMySale ? (
        <Pressable onPress={handleNavigateToEditSale}>
          <PencilSimpleLine size={24} weight="bold" />
        </Pressable>
      ) : (
        <ProductTag isNew={isNew} />
      )}
    </Box>
  );
};

export default HeaderDetails;
