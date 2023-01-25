import {
  VStack,
  Text,
  HStack,
  Radio,
  ScrollView,
  Switch,
  Checkbox,
  Icon,
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
} from "phosphor-react-native";
import { useTheme } from "native-base";
import Button from "../components/Button";
import ImageFormPicker from "../components/ImageFormPicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { useAuth } from "../hooks/useAuth";
import FormHeader from "../components/FormHeader";

type Params = {
  product?: any;
};

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  price: yup.number().required("Preço é obrigatório"),
});

const CreateSale: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = React.useState<string[]>([]);
  const { colors } = useTheme();
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  const { setCurrentProductImages } = useAuth();
  const route = useRoute();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        const { product } = route.params as Params;
        setValue("name", product.name);
        setValue("description", product.description);
        setPaymentMethods(product.payment_methods);
        setValue("accept_trade", product.accept_trade);
        setValue("is_new", product.is_new);
        setValue("price", (Number(product.price) / 100).toString());
      }
    }, [route.params])
  );

  const handleReset = () => {
    reset();
    setPaymentMethods([]);
    setCurrentProductImages([]);
  };

  const onSubmit = (data: any) => {
    const product = {
      ...data,
      payment_methods: paymentMethods,
    };
    navigate("PreviewSale", { product, handleReset });
  };

  const Title = ({ children }: any) => (
    <Text fontSize="lg" color="gray.600" fontFamily={"heading"}>
      {children}
    </Text>
  );

  const ImageBox = () => {
    return (
      <VStack w="100%" justifyContent={"center"}>
        <Title>Imagens</Title>
        <Text fontSize="md" color="gray.600" fontFamily={"body"}>
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>

        <ImageFormPicker />
      </VStack>
    );
  };

  const AboutBox = () => (
    <VStack w="100%" justifyContent={"center"} mt={8}>
      <Title>Sobre o produto</Title>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Título do anúncio"
            mt={2}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            errorMessages={errors.name?.message}
          />
        )}
        name="name"
        rules={{ required: true }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextAreaInput
            placeholder="Descrição do produto"
            mt={2}
            onChangeText={(value) => onChange(value)}
            value={value}
            errorMessages={errors.name?.message}
          />
        )}
        name="description"
        rules={{ required: true }}
        defaultValue=""
      />

      <HStack justifyContent="space-between" alignItems="center" mt={2}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Radio.Group
              name="is_new"
              accessibilityLabel="favorite number"
              onChange={(value) => onChange(value === "new" ? true : false)}
              value={value === true ? "new" : "used"}
              defaultValue="one"
              direction={"row"}
              w={"100%"}
            >
              <Radio
                value="new"
                backgroundColor={"gray.200"}
                colorScheme={"blue"}
              >
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
          )}
          name="is_new"
          rules={{ required: true }}
          defaultValue=""
        />
      </HStack>
    </VStack>
  );

  const SellInfoBox = () => (
    <VStack w="100%" justifyContent={"center"} mt={8}>
      <Title>Venda</Title>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Valor do produto"
            mt={2}
            keyboardType="numeric"
            onChangeText={(value) => onChange(value)}
            value={value}
            errorMessages={errors.name?.message}
            InputLeftElement={
              <Text
                fontSize="md"
                color="gray.600"
                fontFamily={"heading"}
                ml={4}
              >
                R$
              </Text>
            }
          />
        )}
        name="price"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text fontSize="md" fontFamily="heading" color="gray.600" mt={2}>
        Aceita troca ?
      </Text>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Switch
            size="md"
            mt={2}
            offTrackColor="gray.200"
            onTrackColor="blue.500"
            onThumbColor="white"
            isChecked={value}
            onToggle={(value: boolean) => onChange(value)}
          />
        )}
        name="accept_trade"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text fontSize="md" fontFamily="heading" color="gray.600" mt={4}>
        Meios de pagamento aceitos
      </Text>
      <VStack w="100%" justifyContent={"center"} mt={2}>
        <Checkbox.Group
          onChange={setPaymentMethods}
          value={paymentMethods}
          accessibilityLabel="choose payment methods"
        >
          <Checkbox
            value="boleto"
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
            value="pix"
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
            value="cash"
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
            value="card"
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
            value="deposit"
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
        </Checkbox.Group>
      </VStack>
    </VStack>
  );

  return (
    <VStack flex={1} bg="gray.200" pt={10}>
      <FormHeader isCreating={!!route.params} resetForm={handleReset} />
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

        <Button
          title="Avançar"
          type="Tertiary"
          size={"mid"}
          onPress={handleSubmit(onSubmit)}
        />
      </HStack>
    </VStack>
  );
};

export default CreateSale;
