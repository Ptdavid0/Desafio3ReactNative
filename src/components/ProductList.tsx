import { Box, ScrollView } from "native-base";
import React from "react";
import ProductCard from "./ProductCard";

type ProductsListProps = {
  products?: any[];
  showAvatar?: boolean;
};

const ProductsList: React.FC<ProductsListProps> = ({ showAvatar = false }) => {
  return (
    <ScrollView flex={1} my={4} showsVerticalScrollIndicator={false}>
      <Box flexDirection="row" justifyContent="space-between" flexWrap={"wrap"}>
        <ProductCard showAvatar />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Box>
    </ScrollView>
  );
};

export default ProductsList;
