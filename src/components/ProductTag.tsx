import { Box, Text } from "native-base";
import React from "react";

type ProductTagProps = {
  condition: boolean;
};

const ProductTag: React.FC<ProductTagProps> = ({ condition }) => {
  const conditionText = condition ? "NOVO" : "USADO";
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
        {conditionText}
      </Text>
    </Box>
  );
};

export default ProductTag;
