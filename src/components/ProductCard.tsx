import { VStack, Image, Text, Heading, HStack, Box } from "native-base";
import React from "react";
import ProductTag from "./ProductTag";

const ProductCard: React.FC = () => {
  return (
    <VStack mt={10} borderRadius={6} w={"47%"}>
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
        <Image
          alt="imageProduct"
          source={require("../assets/avatar.png")}
          mr={2}
          w={28}
          h={28}
          rounded={50}
        />
        <ProductTag />
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
        Nome do produto
      </Text>
      <HStack alignItems="baseline" mt={1}>
        <Heading mr={1} fontSize={"sm"} fontFamily={"heading"}>
          R$
        </Heading>
        <Heading fontFamily={"heading"} fontSize={"lg"}>
          59,90
        </Heading>
      </HStack>
    </VStack>
  );
};

export default ProductCard;
