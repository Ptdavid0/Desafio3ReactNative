import { VStack, Image, Text, Heading, HStack } from "native-base";
import React from "react";

const ProductCard: React.FC = () => {
  return (
    <VStack mt={10} borderRadius={6} w={"47%"}>
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
