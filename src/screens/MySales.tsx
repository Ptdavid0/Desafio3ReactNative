import { Center, HStack, Select, Text, VStack } from "native-base";
import { CaretDown } from "phosphor-react-native";
import React, { useCallback } from "react";
import { useTheme } from "native-base";
import ProductsList from "../components/ProductList";
import { useFocusEffect } from "@react-navigation/native";
import { getAllMyProducts } from "../storage/getAllMyProducts";
import { ProductDTO } from "../dtos/ProductDTO";

const MySales: React.FC = () => {
  const [products, setProducts] = React.useState<ProductDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = React.useState("all");
  const { colors } = useTheme();
  const NoProducts = () => (
    <Center flex={1}>
      <Text fontSize="lg" color="gray.600" fontFamily="body">
        Você ainda não vendeu nada
      </Text>
    </Center>
  );
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

  if (products.length === 0) {
    return <NoProducts />;
  }

  return (
    <VStack flex={1} bg="gray.200" pt={16} px={6}>
      <VStack flex={1} bg="gray.200">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="md" color="gray.600" fontFamily="body">
            {products.length} anúncios
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
        <ProductsList showAvatar={false} isMyProduct products={products} />
      </VStack>
    </VStack>
  );
};

export default MySales;
