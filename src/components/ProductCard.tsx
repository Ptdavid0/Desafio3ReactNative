import { VStack, Image, Text, Heading, HStack, Box } from "native-base";
import React from "react";
import ProductTag from "./ProductTag";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Pressable } from "react-native";
import { ProductDTO } from "../dtos/ProductDTO";
import api from "../service/api";
import { useAuth } from "../hooks/useAuth";

type ProductCardProps = {
  showAvatar?: boolean;
  product: ProductDTO;
  isMyProduct?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  showAvatar = false,
  isMyProduct,
  product,
}) => {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useAuth();
  const handleNavigateToSaleDetails = () => {
    if (isMyProduct) return navigate("MySaleDetails");
    navigate("SaleDetails");
  };
  const { name, price, description } = product;
  return (
    <VStack mt={6} borderRadius={6} w={"47%"}>
      <Pressable onPress={handleNavigateToSaleDetails}>
        <Box
          px={1}
          justifyContent={"space-between"}
          alignItems={"top-line"}
          mb={2}
          flexDirection={"row"}
          position={"absolute"}
          top={0}
          right={0}
          zIndex={1}
          w={"100%"}
          mt={1}
        >
          {showAvatar ? (
            <Image
              alt="imageProduct"
              source={{
                uri: `${api.defaults.baseURL}/images/${user.avatar}`,
              }}
              mr={2}
              w={28}
              h={28}
              rounded={50}
              borderColor="white"
              borderWidth={1.5}
            />
          ) : (
            <Box />
          )}

          <ProductTag condition={product.is_new ? "Novo" : "Usado"} />
        </Box>
        <Image
          alt="imageProduct"
          source={require("../assets/tenis.jpg")}
          mr={2}
          w={"100%"}
          h={110}
          rounded={6}
        />
        <Text mt={2} color="gray.600" fontSize="md" fontFamily="body">
          {name}
        </Text>
        <HStack alignItems="baseline" mt={1}>
          <Heading mr={1} fontSize={"sm"} fontFamily={"heading"}>
            R$
          </Heading>
          <Heading fontFamily={"heading"} fontSize={"lg"}>
            {price / 100}
          </Heading>
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default ProductCard;
