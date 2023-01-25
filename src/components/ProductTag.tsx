import { Box, Text } from "native-base";
import React from "react";

type ProductTagProps = {
  isNew: boolean;
};

const ProductTag: React.FC<ProductTagProps> = ({ isNew }) => {
  const conditionText = isNew ? "NOVO" : "USADO";
  return (
    <Box
      bg={isNew ? "blue.500" : "gray.600"}
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
