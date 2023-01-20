import {
  Box,
  Image,
  VStack,
  Text,
  HStack,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { useTheme } from "native-base";
import { Dimensions } from "react-native";
import Button from "../components/Button";
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  WhatsappLogo,
} from "phosphor-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { ProductDTO } from "../dtos/ProductDTO";
import { fetchProductDetails } from "../storage/fetchProductDetails";

type Params = {
  productId: string;
};

const SaleDetails: React.FC = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const route = useRoute();
  const { productId } = route.params as Params;
  const toast = useToast();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<ProductDTO>({} as ProductDTO);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchProduct() {
        const productFetched = await fetchProductDetails(productId);
        if (productFetched) {
          setProduct(productFetched);
        } else {
          toast.show({
            title: "Erro ao carregar anúncio!",
            duration: 3000,
            placement: "top",
          });
        }
        setLoading(false);
      }
      fetchProduct();
    }, [])
  );

  const width = Dimensions.get("window").width / 3.3;
  return (
    <VStack flex={1} bg="gray.200" pt={6}>
      <SliderBox
        images={
          product.product_images.length > 0
            ? product.product_images
            : ["https://www.ikea.com/PIAimages/0452012_PE694365_S5.JPG?f=xxs"]
        }
        sliderBoxHeight={280}
        dotStyle={{
          width: width,
          height: 5,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: colors.gray[200],
        }}
        dotColor={colors.gray[600]}
        inactiveDotColor={colors.gray[200]}
        paginationBoxVerticalPadding={3}
        circleLoop
      />
      <Box p={6} flexDirection="row" alignItems="center">
        <Image
          source={require("../assets/avatar.png")}
          alt="image base"
          size={25}
          borderRadius={8}
          mr={2}
        />
        <Text fontSize="md" fontFamily="body" color="gray.500">
          Pedro Antônio David
        </Text>
      </Box>

      <VStack px={6} mt={2} flex={1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          mb={134}
          pb={12}
          flex={1}
        >
          {/* Title */}
          <HStack justifyContent="space-between" alignItems="center">
            <Heading fontSize="xl" fontFamily="heading">
              Descrição
            </Heading>
            <HStack alignItems="baseline">
              <Heading
                mr={1}
                fontSize={"md"}
                fontFamily={"heading"}
                color={"blue.500"}
              >
                R$
              </Heading>
              <Heading
                fontFamily={"heading"}
                fontSize={"xl"}
                color={"blue.500"}
              >
                59,90
              </Heading>
            </HStack>
          </HStack>
          {/* Description */}
          <Box mt={2}>
            <Text fontSize="md" fontFamily="body" color="gray.500">
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
              facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
              facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            </Text>
          </Box>
          {/* Exchange */}
          <Box mt={4} flexDirection="row" alignItems="center">
            <Text fontSize="md" fontFamily="heading" color="gray.600">
              Aceita troca ?{" "}
            </Text>
            <Text fontSize="md" fontFamily="body" color="gray.500">
              Sim
            </Text>
          </Box>
          {/* Payment Methods */}
          <Box mt={4}>
            <Text fontSize="md" fontFamily="heading" color="gray.600">
              Meios de pagamento:
            </Text>
            <Box mt={2} flexDirection="row" alignItems="center">
              <QrCode size={20} color={colors.gray[700]} />
              <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                Pix
              </Text>
            </Box>
            <Box mt={2} flexDirection="row" alignItems="center">
              <Barcode size={20} color={colors.gray[700]} />
              <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                Boleto
              </Text>
            </Box>

            <Box mt={2} flexDirection="row" alignItems="center">
              <Money size={20} color={colors.gray[700]} />
              <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                Dinheiro
              </Text>
            </Box>

            <Box mt={2} flexDirection="row" alignItems="center">
              <CreditCard size={20} color={colors.gray[700]} />
              <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                Cartão de Crédito
              </Text>
            </Box>
            <Box mt={2} flexDirection="row" alignItems="center" mb={10}>
              <Bank size={20} color={colors.gray[700]} />
              <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                Depósito Bancário
              </Text>
            </Box>
          </Box>
        </ScrollView>
      </VStack>
      {/* Footer */}
      <HStack
        px={6}
        mt={4}
        justifyContent="space-between"
        alignItems={"center"}
        position="absolute"
        bgColor={"white"}
        width="100%"
        pb={12}
        pt={6}
        bottom={0}
      >
        <HStack alignItems="baseline">
          <Heading
            mr={1}
            fontSize={"md"}
            fontFamily={"heading"}
            color={"blue.700"}
          >
            R$
          </Heading>
          <Heading fontFamily={"heading"} fontSize={"xl"} color={"blue.700"}>
            59,90
          </Heading>
        </HStack>
        <Button
          title="Entrar em contato"
          type="Primary"
          size={"mid"}
          icon={<WhatsappLogo size={20} color="white" weight="fill" />}
        />
      </HStack>
    </VStack>
  );
};

export default SaleDetails;
