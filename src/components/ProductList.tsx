import { Box, ScrollView } from "native-base";
import React from "react";
import ProductCard from "./ProductCard";

type ProductsListProps = {
  products?: any[];
  showAvatar?: boolean;
  isMyProduct?: boolean;
};

const ProductsList: React.FC<ProductsListProps> = ({
  showAvatar = false,
  isMyProduct = false,
}) => {
  return (
    <ScrollView flex={1} my={4} showsVerticalScrollIndicator={false}>
      <Box flexDirection="row" justifyContent="space-between" flexWrap={"wrap"}>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            isMyProduct={isMyProduct}
            showAvatar={showAvatar}
          />
        ))}
      </Box>
    </ScrollView>
  );
};

export default ProductsList;
