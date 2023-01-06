import { Box, ScrollView } from "native-base";
import React from "react";
import ProductCard from "./ProductCard";

const ProductsList: React.FC = () => {
  return (
    <ScrollView flex={1} my={4} showsVerticalScrollIndicator={false}>
      <Box flexDirection="row" justifyContent="space-between" flexWrap={"wrap"}>
        <ProductCard />
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
