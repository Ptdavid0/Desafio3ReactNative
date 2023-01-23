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
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Tag,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { ProductDTO } from "../dtos/ProductDTO";
import { useAuth } from "../hooks/useAuth";
import api from "../service/api";
import { addProduct } from "../storage/addProduct";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

interface Params {
  product: ProductDTO;
  reset: () => void;
}

const PreviewSale: React.FC = () => {
  const { colors, sizes, fonts } = useTheme();
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const route = useRoute();
  const { currentProductImages, user, cleanCurrentProductImages } = useAuth();
  const { product, reset } = route.params as Params;
  const width = Dimensions.get("window").width / 3.3;

  const handlePublish = async () => {
    const productAdded = await addProduct(product, currentProductImages);
    if (productAdded) {
      toast.show({
        title: "Anúncio publicado com sucesso!",
        duration: 3000,
        placement: "top",
      });
      reset();
      navigate("MySales");
      cleanCurrentProductImages();
    } else {
      toast.show({
        title: "Erro ao publicar anúncio",
        duration: 3000,
        placement: "top",
      });
    }
  };

  return (
    <VStack flex={1} bg="gray.200">
      <VStack alignItems="center" pt={20} bg="blue.500" pb={6}>
        <Text
          fontSize={sizes[5]}
          fontFamily={fonts.heading}
          color={colors.white}
        >
          Pré visualização do anúncio
        </Text>
        <Text fontSize={sizes[4]} fontFamily={fonts.body} color={colors.white}>
          É assim que seu produto vai aparecer!
        </Text>
      </VStack>
      <SliderBox
        images={currentProductImages}
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
          source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
          alt="image base"
          size={25}
          rounded="full"
          mr={2}
        />
        <Text fontSize="md" fontFamily="body" color="gray.500">
          {user?.name}
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
                {product.price}
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
          {/* Payment Methods */}
          <Box mt={4}>
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
              <Box mt={2} flexDirection="row" alignItems="center" mb={10}>
                <Bank size={20} color={colors.gray[700]} />
                <Text fontSize="md" fontFamily="body" color="gray.500" ml={2}>
                  Depósito Bancário
                </Text>
              </Box>
            )}
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
        <Button
          title="Voltar e editar"
          type="Secundary"
          size={"mid"}
          onPress={() => navigate("FormSale")}
          icon={<ArrowLeft size={20} color={colors.gray[700]} />}
        />

        <Button
          title="Publicar"
          type="Primary"
          size={"mid"}
          onPress={handlePublish}
          icon={
            <Tag
              size={20}
              color="white"
              style={{
                marginRight: 8,
              }}
            />
          }
        />
      </HStack>
    </VStack>
  );
};

export default PreviewSale;
