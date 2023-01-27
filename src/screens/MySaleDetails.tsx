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
  Power,
  QrCode,
  TrashSimple,
} from "phosphor-react-native";
import ProductTag from "../components/ProductTag";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { ProductDTO } from "../dtos/ProductDTO";
import api from "../service/api";
import { fetchProductDetails } from "../storage/fetchProductDetails";
import Loading from "../components/Loading";
import { getProductImages } from "../utils/productsUtils";
import HeaderDetails from "../components/SaleDetailHeader";
import { setProductVisibility } from "../storage/setProductVisibility";
import { deleteProduct } from "../storage/deleteProduct";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

type Params = {
  productId: string;
};

const MySaleDetails: React.FC = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const toast = useToast();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<ProductDTO>({} as ProductDTO);

  const { productId } = route.params as Params;

  const width = Dimensions.get("window").width / 3.3;

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
    }, [productId])
  );

  const handleChangeProductVisibility = async (visibility: boolean) => {
    const hasChanged = await setProductVisibility(productId, !visibility);
    if (hasChanged) {
      toast.show({
        title: "Anúncio alterado com sucesso!",
        duration: 3000,
        placement: "top",
      });
      setProduct({
        ...product,
        is_active: !visibility,
      });
    } else {
      toast.show({
        title: "Erro ao alterar anúncio!",
        duration: 3000,
        placement: "top",
      });
    }
  };

  const handleDeleteProduct = async () => {
    const hasBeenDeleted = await deleteProduct(productId);
    if (hasBeenDeleted) {
      navigate("MySales");
      toast.show({
        title: "Anúncio deletado com sucesso!",
        duration: 3000,
        placement: "top",
      });
    } else {
      toast.show({
        title: "Erro ao deletar anúncio!",
        duration: 3000,
        placement: "top",
      });
    }
  };

  console.log(product);

  if (loading || !product) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.200">
      <HeaderDetails isMySale product={product} isNew={false} />
      <SliderBox
        images={
          product.product_images.length > 0
            ? getProductImages(product)
            : [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?tree",
              ]
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
          source={{
            uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
          }}
          alt="image base"
          size={25}
          rounded="full"
          mr={2}
        />
        <Text fontSize="md" fontFamily="body" color="gray.500">
          {product.user.name}
        </Text>
      </Box>

      <VStack px={6} mt={2} flex={1}>
        <ScrollView showsVerticalScrollIndicator={false} flex={1}>
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
                {product.price / 100}
              </Heading>
            </HStack>
          </HStack>
          {/* Description */}
          <Box mt={2}>
            <Text fontSize="md" fontFamily="body" color="gray.500">
              {product.description}
            </Text>
          </Box>
          {/* Exchange */}
          <Box mt={4} flexDirection="row" alignItems="center">
            <Text fontSize="md" fontFamily="heading" color="gray.600">
              Aceita troca ?{" "}
            </Text>
            <Text fontSize="md" fontFamily="body" color="gray.500">
              {product.accept_trade ? "Sim" : "Não"}
            </Text>
          </Box>

          <Box mt={4} flexDirection="row" alignItems="center">
            <Text fontSize="md" fontFamily="heading" color="gray.600">
              Condição do produto:{"   "}
            </Text>
            <ProductTag isNew={product.is_new} />
          </Box>

          {/* Payment Methods */}
          <Box mt={4} mb={12}>
            <Text fontSize="md" fontFamily="heading" color="gray.600">
              Meios de pagamento:
            </Text>
            {product.payment_methods.includes("pix") && (
              <Box mt={2} flexDirection="row" alignItems="center">
                <QrCode size={20} color={colors.gray[700]} />
                <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                  Pix
                </Text>
              </Box>
            )}
            {product.payment_methods.includes("boleto") && (
              <Box mt={2} flexDirection="row" alignItems="center">
                <Barcode size={20} color={colors.gray[700]} />
                <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                  Boleto
                </Text>
              </Box>
            )}
            {product.payment_methods.includes("cash") && (
              <Box mt={2} flexDirection="row" alignItems="center">
                <Money size={20} color={colors.gray[700]} />
                <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                  Dinheiro
                </Text>
              </Box>
            )}
            {product.payment_methods.includes("card") && (
              <Box mt={2} flexDirection="row" alignItems="center">
                <CreditCard size={20} color={colors.gray[700]} />
                <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                  Cartão de Crédito
                </Text>
              </Box>
            )}
            {product.payment_methods.includes("deposit") && (
              <Box mt={2} flexDirection="row" alignItems="center">
                <Bank size={20} color={colors.gray[700]} />
                <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                  Depósito Bancário
                </Text>
              </Box>
            )}
          </Box>
          <Button
            title={product.is_active ? "Desativar anúncio" : "Ativar anúncio"}
            type={product.is_active ? "Tertiary" : "Primary"}
            size={"full"}
            icon={<Power size={20} color="white" />}
            onPress={() => handleChangeProductVisibility(product.is_active)}
          />
          <Button
            title="Excluir anúncio"
            type="Secundary"
            mt={2}
            mb={12}
            size={"full"}
            icon={<TrashSimple size={20} color="black" />}
            onPress={() => handleDeleteProduct()}
          />
        </ScrollView>
      </VStack>
    </VStack>
  );
};

export default MySaleDetails;
