import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Divider,
  Pressable,
  Checkbox,
  Icon,
  Switch,
} from "native-base";
import React, { useCallback, useEffect } from "react";
import Button from "../components/Button";
import {
  Plus,
  Tag,
  MagnifyingGlass,
  Sliders,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  X,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "native-base";
import InvButton from "../components/InvButton";
import FilterInput from "../components/FilterInput";
import ProductsList from "../components/ProductList";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAuth } from "../hooks/useAuth";
import api from "../service/api";

const Home: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  console.log(user);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const snapPoints = React.useMemo(() => ["75%"], []);

  const handleSheetChanges = React.useCallback((index: number) => {}, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

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
              4
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

  const Title = ({ children }: any) => (
    <Text fontSize="xl" color="gray.600" fontFamily={"heading"}>
      {children}
    </Text>
  );

  return (
    <VStack flex={1} bg="gray.200" w={"100%"} px={6}>
      <Header />
      <MyProducts />
      <FilterProducts />
      <ProductsList />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <Box flex={1} bg="white" px={6}>
          <VStack w="100%" mt={8}>
            <HStack justifyContent="space-between" alignItems="center">
              <Title>Filtrar anúncios</Title>
              <Pressable onPress={handleClosePress} mr={2}>
                <X size={24} color={colors.gray[400]} weight="bold" />
              </Pressable>
            </HStack>
            <Text fontSize="md" fontFamily="heading" color="gray.600" mt={8}>
              Condição
            </Text>

            <HStack w="100%" mt={2}>
              <Checkbox
                value="orange"
                size="md"
                bgColor={"gray.100"}
                my={2}
                mr={4}
                _checked={{
                  bg: "blue.500",
                  color: "white",
                }}
              >
                Novo
              </Checkbox>
              <Checkbox
                value="orange"
                size="md"
                bgColor={"gray.100"}
                my={2}
                _checked={{
                  bg: "blue.500",
                  color: "white",
                }}
              >
                Usado
              </Checkbox>
            </HStack>

            <Text fontSize="md" fontFamily="heading" color="gray.600" mt={2}>
              Aceita troca ?
            </Text>
            <Switch
              size="md"
              mt={2}
              offTrackColor="gray.200"
              onTrackColor="blue.500"
              onThumbColor="white"
              // onToggle={() => {}}
            />
            <Text fontSize="md" fontFamily="heading" color="gray.600" mt={4}>
              Meios de pagamento aceitos
            </Text>
            <VStack w="100%" justifyContent={"center"} mt={2}>
              <Checkbox
                value="orange"
                size="md"
                bgColor={"gray.100"}
                icon={<Icon as={<Barcode size={16} color={colors.white} />} />}
                my={2}
                _checked={{
                  bg: "blue.500",
                }}
              >
                Boleto
              </Checkbox>
              <Checkbox
                value="dark"
                size="md"
                bgColor={"gray.100"}
                icon={<Icon as={<QrCode size={16} color={colors.white} />} />}
                my={1}
                _checked={{
                  bg: "blue.500",
                }}
              >
                Pix
              </Checkbox>
              <Checkbox
                value="red"
                size="md"
                bgColor={"gray.100"}
                icon={<Icon as={<Money size={16} color={colors.white} />} />}
                my={1}
                _checked={{
                  bg: "blue.500",
                }}
              >
                Dinheiro
              </Checkbox>
              <Checkbox
                value="blue"
                size="md"
                bgColor={"gray.100"}
                icon={
                  <Icon as={<CreditCard size={16} color={colors.white} />} />
                }
                my={1}
                _checked={{
                  bg: "blue.500",
                }}
              >
                Cartão de crédito
              </Checkbox>
              <Checkbox
                value="blue"
                size="md"
                bgColor={"gray.100"}
                icon={<Icon as={<Bank size={16} color={colors.white} />} />}
                mb={4}
                my={1}
                _checked={{
                  bg: "blue.500",
                }}
              >
                Depósito bancário
              </Checkbox>
            </VStack>
            <HStack w="100%" justifyContent="space-between" mt={4}>
              <Button title="Resetar filtros" type="Tertiary" size={"mid"} />
              <Button title="Aplicar filtros" type="Secundary" size={"mid"} />
            </HStack>
          </VStack>
        </Box>
      </BottomSheet>
    </VStack>
  );
};

export default Home;
