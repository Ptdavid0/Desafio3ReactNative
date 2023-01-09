import { Center, HStack, Select, Text, VStack } from "native-base";
import { CaretDown } from "phosphor-react-native";
import React from "react";
import { useTheme } from "native-base";
import ProductsList from "../components/ProductList";

const MySales: React.FC = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [seletedFilter, setSelectedFilter] = React.useState("all");
  const { colors } = useTheme();
  const NoProducts = () => (
    <Center flex={1}>
      <Text fontSize="lg" color="gray.600" fontFamily="body">
        Você ainda não vendeu nada
      </Text>
    </Center>
  );

  return (
    <VStack flex={1} bg="gray.200" pt={16} px={6}>
      {products.length !== 0 ? (
        <NoProducts />
      ) : (
        <VStack flex={1} bg="gray.200">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="md" color="gray.600" fontFamily="body">
              9 anúncios
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
              selectedValue={seletedFilter}
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
          <ProductsList showAvatar={false} isMyProduct />
        </VStack>
      )}
    </VStack>
  );
};

export default MySales;
