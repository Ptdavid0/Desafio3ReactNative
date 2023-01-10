import {
  VStack,
  Text,
  HStack,
  Radio,
  ScrollView,
  Switch,
  Checkbox,
  Icon,
  Image as NativeImage,
  Box,
  Pressable,
} from "native-base";
import React from "react";
import Input from "../components/Input";
import TextAreaInput from "../components/TextAreaInput";
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Plus,
  X,
} from "phosphor-react-native";
import { useTheme } from "native-base";
import Button from "../components/Button";
import { TouchableOpacity } from "react-native";
import ImageFormPicker from "../components/ImageFormPicker";

const CreateSale: React.FC = () => {
  const { colors } = useTheme();
  const Title = ({ children }: any) => (
    <Text fontSize="lg" color="gray.600" fontFamily={"heading"}>
      {children}
    </Text>
  );

  const ImageBox = () => (
    <VStack w="100%" justifyContent={"center"}>
      <Title>Imagens</Title>
      <Text fontSize="md" color="gray.600" fontFamily={"body"}>
        Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
      </Text>

      <ImageFormPicker />
    </VStack>
  );

  const AboutBox = () => (
    <VStack w="100%" justifyContent={"center"} mt={8}>
      <Title>Sobre o produto</Title>
      <Input placeholder="Título do anúncio" mt={2} />
      <TextAreaInput placeholder="Descrição do produto" mt={2} />
      <HStack justifyContent="space-between" alignItems="center" mt={2}>
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          onChange={(nextValue) => {}}
          defaultValue="one"
          direction={"row"}
          w={"100%"}
        >
          <Radio value="new" backgroundColor={"gray.200"} colorScheme={"blue"}>
            Produto novo
          </Radio>
          <Radio
            value="used"
            ml={10}
            backgroundColor={"gray.200"}
            colorScheme={"blue"}
          >
            Produto usado
          </Radio>
        </Radio.Group>
      </HStack>
    </VStack>
  );

  const SellInfoBox = () => (
    <VStack w="100%" justifyContent={"center"} mt={8}>
      <Title>Venda</Title>
      <Input
        placeholder="Valor do produto"
        mt={2}
        keyboardType="numeric"
        InputLeftElement={
          <Text fontSize="md" color="gray.600" fontFamily={"heading"} ml={4}>
            R$
          </Text>
        }
      />
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
          bgColor={"gray.200"}
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
          bgColor={"gray.200"}
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
          bgColor={"gray.200"}
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
          bgColor={"gray.200"}
          icon={<Icon as={<CreditCard size={16} color={colors.white} />} />}
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
          bgColor={"gray.200"}
          icon={<Icon as={<Bank size={16} color={colors.white} />} />}
          mb={20}
          my={1}
          _checked={{
            bg: "blue.500",
          }}
        >
          Depósito bancário
        </Checkbox>
      </VStack>
    </VStack>
  );

  return (
    <VStack flex={1} bg="gray.200" pt={10}>
      <ScrollView showsVerticalScrollIndicator={false} px={6} mb={100}>
        <ImageBox />
        <AboutBox />
        <SellInfoBox />
      </ScrollView>
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
        <Button title="Cancelar" type="Secundary" size={"mid"} />

        <Button title="Avançar" type="Tertiary" size={"mid"} />
      </HStack>
    </VStack>
  );
};

export default CreateSale;
