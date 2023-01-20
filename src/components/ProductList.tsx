import { Box, ScrollView } from "native-base";
import React from "react";
import { ProductDTO } from "../dtos/ProductDTO";
import NoProducts from "./NoProduct";
import ProductCard from "./ProductCard";

type ProductsListProps = {
  products?: ProductDTO[];
  showAvatar?: boolean;
  isMyProduct?: boolean;
};

const ProductsList: React.FC<ProductsListProps> = ({
  showAvatar = false,
  isMyProduct = false,
  products,
}) => {
  if (!products || products.length === 0) {
    return <NoProducts message="Nenhum produto encontrado" />;
  }

  return (
    <ScrollView flex={1} my={4} showsVerticalScrollIndicator={false}>
      <Box flexDirection="row" justifyContent="space-between" flexWrap={"wrap"}>
        {products?.map((product, index) => (
          <ProductCard
            key={index}
            isMyProduct={isMyProduct}
            showAvatar={showAvatar}
            product={product}
          />
        ))}
      </Box>
    </ScrollView>
  );
};

export default ProductsList;
