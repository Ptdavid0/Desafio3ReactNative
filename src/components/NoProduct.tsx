import { Center, Text } from "native-base";
import React from "react";

type NoProductsProps = {
  message?: string;
};

const NoProducts: React.FC<NoProductsProps> = ({
  message = "Nenhum produto encontrado",
}) => {
  return (
    <Center flex={1}>
      <Text fontSize="lg" color="gray.600" fontFamily="body">
        {message}
      </Text>
    </Center>
  );
};

export default NoProducts;
