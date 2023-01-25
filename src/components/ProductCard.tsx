import {
  VStack,
  Image,
  Text,
  Heading,
  HStack,
  Box,
  useToast,
} from "native-base";
import React from "react";
import ProductTag from "./ProductTag";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Pressable } from "react-native";
import { ProductDTO, ProductImages, ProductOwner } from "../dtos/ProductDTO";
import api from "../service/api";
import { useAuth } from "../hooks/useAuth";
import { fetchProductDetails } from "../storage/fetchProductDetails";

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
  const toast = useToast();
  const [loading, setLoading] = React.useState(true);
  const [productOwner, setProductOwner] = React.useState<ProductOwner>();

  const handleNavigateToSaleDetails = () => {
    if (isMyProduct)
      return navigate("MySaleDetails", {
        productId: product.id,
      });
    navigate("SaleDetails", {
      productId: product.id,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchProduct() {
        const productFetched: ProductDTO = await fetchProductDetails(
          product.id
        );
        if (productFetched) {
          const { user } = productFetched;
          setProductOwner(user);
        } else {
          toast.show({
            title: "Erro ao carregar anúncio!",
            duration: 3000,
            placement: "top",
          });
        }
        setLoading(false);
      }
      fetchProduct();
    }, [product])
  );

  const getProductOpacity = () => {
    if (!isMyProduct) return 1;
    if (isMyProduct && product.is_active) return 1;
    return 0.7;
  };

  const getColorOftext = () => {
    if (!isMyProduct) return "gray.600";
    if (isMyProduct && product.is_active) return "gray.600";
    return "gray.400";
  };

  const getDisplay = () => {
    if (!isMyProduct) return "none";
    if (isMyProduct && product.is_active) return "none";
    return "flex";
  };

  const { name, price } = product;
  return (
    <VStack mt={6} borderRadius={6} w={"47%"}>
      <Pressable onPress={handleNavigateToSaleDetails}>
        <Box position={"relative"} opacity={getProductOpacity()}>
          <Box
            display={getDisplay()}
            position={"absolute"}
            bottom={0}
            left={0}
            pl={1}
            pb={1}
            zIndex={1}
            w={"100%"}
            bg={"white"}
          >
            <Text fontFamily="heading" color={"gray.700"} mr={2}>
              ANÚNCIO DESATIVADO
            </Text>
          </Box>

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
            {showAvatar && productOwner?.avatar ? (
              <Image
                alt="imageProduct"
                source={{
                  uri: `${api.defaults.baseURL}/images/${productOwner?.avatar}`,
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

            <ProductTag isNew={product.is_new} />
          </Box>
          <Image
            alt="imageProduct"
            source={
              product.product_images && product.product_images.length > 0
                ? {
                    uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
                  }
                : require("../assets/tenis.jpg")
            }
            mr={2}
            w={"100%"}
            h={110}
            rounded={6}
          />
        </Box>
        <Text mt={2} fontSize="md" fontFamily="body" color={getColorOftext()}>
          {name}
        </Text>
        <HStack alignItems="baseline" mt={1}>
          <Heading
            mr={1}
            fontSize={"sm"}
            fontFamily={"heading"}
            color={getColorOftext()}
          >
            R$
          </Heading>
          <Heading
            fontFamily={"heading"}
            fontSize={"lg"}
            color={getColorOftext()}
          >
            {price / 100}
          </Heading>
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default ProductCard;
