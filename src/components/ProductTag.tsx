import { Box, Text } from "native-base";
import React from "react";

type ProductTagProps = {
  condition: string;
};

const ProductTag: React.FC<ProductTagProps> = ({ condition }) => {
  return (
    <Box
      bg="blue.500"
      px={3}
      py={0.3}
      borderRadius={101}
      top={0}
      right={0}
      shadow={2}
    >
      <Text color="white" fontSize="xs" fontFamily="heading">
        {condition.toUpperCase()}
      </Text>
    </Box>
  );
};

export default ProductTag;
