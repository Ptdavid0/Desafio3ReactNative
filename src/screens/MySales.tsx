import { Center, HStack, Select, Text, VStack } from "native-base";
import { CaretDown } from "phosphor-react-native";
import React, { useCallback } from "react";
import { useTheme } from "native-base";
import ProductsList from "../components/ProductList";
import { useFocusEffect } from "@react-navigation/native";
import { getAllMyProducts } from "../storage/getAllMyProducts";
import { ProductDTO } from "../dtos/ProductDTO";
import NoProducts from "../components/NoProduct";

const MySales: React.FC = () => {
  const [products, setProducts] = React.useState<ProductDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = React.useState("all");
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const getProducts = async () => {
        const products = await getAllMyProducts();
        setProducts(products);
        setLoading(false);
      };
      getProducts();
    }, [])
  );

  const displayProducts = React.useMemo(() => {
    if (selectedFilter === "active") {
      return products.filter((product) => product.is_active);
    } else if (selectedFilter === "inactive") {
      return products.filter((product) => !product.is_active);
    } else if (selectedFilter === "new") {
      return products.filter((product) => product.is_new);
    } else if (selectedFilter === "used") {
      return products.filter((product) => !product.is_new);
    }
    return products;
  }, [products, selectedFilter]);

  if (products.length === 0) {
    return <NoProducts message="Você ainda não vendeu nada" />;
  }

  return (
    <VStack flex={1} bg="gray.200" pt={16} px={6}>
      <VStack flex={1} bg="gray.200">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="md" color="gray.600" fontFamily="body">
            {displayProducts.length} anúncios
          </Text>
          <Select
            w={32}
            dropdownIcon={
              <CaretDown
                size={20}
                weight="bold"
                color={colors.gray[600]}
                style={{
                  marginRight: 12,
                }}
              />
            }
            selectedValue={selectedFilter}
            style={{ height: 40, width: 111 }}
            minWidth={32}
            onValueChange={(itemValue) => setSelectedFilter(itemValue)}
          >
            <Select.Item label="Todos" value="all" />
            <Select.Item label="Ativos" value="active" />
            <Select.Item label="Inativos" value="inactive" />
            <Select.Item label="Novo" value="new" />
            <Select.Item label="Usado" value="used" />
          </Select>
        </HStack>
        <ProductsList
          showAvatar={false}
          isMyProduct
          products={displayProducts}
        />
      </VStack>
    </VStack>
  );
};

export default MySales;
