import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Divider,
  Pressable,
} from "native-base";
import React, { useCallback } from "react";
import Button from "../components/Button";
import { Plus, Tag, MagnifyingGlass, Sliders } from "phosphor-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "native-base";
import InvButton from "../components/InvButton";
import FilterInput from "../components/FilterInput";
import ProductsList from "../components/ProductList";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAuth } from "../hooks/useAuth";
import api from "../service/api";
import { getAllProducts } from "../storage/getAllProducts";
import { getAllMyProducts } from "../storage/getAllMyProducts";
import { getActiveProducts } from "../utils/productsUtils";
import BottomSheetFilters from "../components/BottomSheet";

const Home: React.FC = () => {
  const { colors } = useTheme();
  const { user, setAllProducts, setAllMyProducts, allMyProducts, allProducts } =
    useAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const getProducts = async () => {
        const products = await getAllProducts();
        const myProducts = await getAllMyProducts();
        setAllProducts(products);
        setAllMyProducts(myProducts);
      };
      getProducts();
      setIsLoading(false);
    }, [])
  );

  const Header = () => (
    <HStack justifyContent="space-between" alignItems="center" mt={16}>
      <HStack bg="gray.200" w="55%" borderRadius={10}>
        <Image
          alt="Logo"
          w={12}
          h={12}
          rounded="full"
          source={{
            uri: `${api.defaults.baseURL}/images/${user.avatar}`,
          }}
          resizeMode="contain"
          mr={2}
        />
        <VStack>
          <Text color="gray.500" fontSize="md">
            Boas Vindas,
          </Text>
          <Heading fontSize="md" fontFamily="heading">
            {user?.name} !
          </Heading>
        </VStack>
      </HStack>
      <Button
        w={"45%"}
        title="Criar anúncio"
        type="Tertiary"
        onPress={() => navigate("FormSale")}
        icon={<Plus size={16} color={colors.white} weight="bold" />}
        h={11}
      />
    </HStack>
  );

  const MyProducts = () => (
    <VStack mt={10}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="md" fontFamily="body">
          Seus produtos anunciados para venda
        </Text>
      </HStack>
      <HStack
        mt={2}
        h={66}
        bgColor={colors.blue[300]}
        borderRadius={6}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack borderRadius={10} alignItems="center">
          <Box mx={4}>
            <Tag color={colors.blue[700]} weight="bold" />
          </Box>
          <VStack>
            <Heading fontSize="lg" fontFamily="heading">
              {getActiveProducts(allMyProducts).length}
            </Heading>
            <Text color="gray.500" fontSize="sm">
              anúncios ativos
            </Text>
          </VStack>
        </HStack>
        <InvButton title="Meus anúncios" mr={2} />
      </HStack>
    </VStack>
  );

  const FilterProducts = () => (
    <VStack mt={8}>
      <Text fontSize="md" fontFamily="body">
        Compre produtos variados
      </Text>
      <HStack
        mt={2}
        alignItems="center"
        justifyContent="space-between"
        pr={4}
        bg={colors.white}
        borderRadius={6}
        w={"100%"}
        h={14}
      >
        <FilterInput placeholder="Buscar anúncios" />
        <Pressable onPress={() => {}}>
          <MagnifyingGlass size={20} color={colors.gray[700]} weight="bold" />
        </Pressable>
        <Divider orientation="vertical" h={"40%"} mx={2} />
        <Pressable onPress={() => handleSnapPress(0)}>
          <Sliders size={20} color={colors.gray[700]} weight="bold" />
        </Pressable>
      </HStack>
    </VStack>
  );

  return (
    <VStack flex={1} bg="gray.200" w={"100%"} px={6}>
      <Header />
      <MyProducts />
      <FilterProducts />
      <ProductsList
        products={allProducts}
        showAvatar
        isMyProduct={false}
        isLoading={isLoading}
      />
      <BottomSheetFilters sheetRef={bottomSheetRef} />
    </VStack>
  );
};

export default Home;
