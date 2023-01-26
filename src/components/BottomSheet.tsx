import BottomSheet from "@gorhom/bottom-sheet";
import {
  Box,
  VStack,
  HStack,
  Checkbox,
  Icon,
  Text,
  Pressable,
  Switch,
  useTheme,
  Radio,
} from "native-base";
import Button from "./Button";
import {
  X,
  Barcode,
  QrCode,
  Money,
  CreditCard,
  Bank,
} from "phosphor-react-native";
import React, { useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { getAllProducts } from "../storage/getAllProducts";

type Props = {
  sheetRef: React.RefObject<BottomSheet>;
};

const schema = yup.object().shape({
  is_new: yup.boolean(),
  accept_trade: yup.boolean(),
  payment_methods: yup.array().of(yup.string()),
});

const BottomSheetFilters: React.FC<Props> = ({ sheetRef }) => {
  const { colors } = useTheme();
  const { filterProducts } = useAuth();

  const snapPoints = React.useMemo(() => ["75%"], []);

  const handleSheetChanges = React.useCallback((index: number) => {}, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleReset = async () => {
    reset();
    await getAllProducts();
  };

  const onSubmit = async (data: any) => {
    const filters = {
      ...data,
    };
    await filterProducts(filters);
    handleClosePress();
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const Title = ({ children }: any) => (
    <Text fontSize="xl" color="gray.600" fontFamily={"heading"}>
      {children}
    </Text>
  );
  return (
    <BottomSheet
      ref={sheetRef}
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
          <Text
            fontSize="md"
            fontFamily="heading"
            color="gray.600"
            mt={8}
            mb={2}
          >
            Condição
          </Text>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Radio.Group
                name="is_new"
                accessibilityLabel="favorite number"
                onChange={(value) => onChange(value === "new" ? true : false)}
                value={undefined}
                direction={"row"}
                w={"100%"}
              >
                <Radio
                  value="new"
                  backgroundColor={"gray.200"}
                  colorScheme={"blue"}
                >
                  Novo
                </Radio>
                <Radio
                  value="used"
                  ml={10}
                  backgroundColor={"gray.200"}
                  colorScheme={"blue"}
                >
                  Usado
                </Radio>
              </Radio.Group>
            )}
            name="is_new"
          />

          <Text fontSize="md" fontFamily="heading" color="gray.600" mt={6}>
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
          />

          <Text fontSize="md" fontFamily="heading" color="gray.600" mt={6}>
            Meios de pagamento aceitos
          </Text>
          <VStack w="100%" justifyContent={"center"} mt={2}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox.Group
                  onChange={(value) => {
                    onChange(value);
                  }}
                  value={value}
                  accessibilityLabel="choose payment methods"
                >
                  <Checkbox
                    value="boleto"
                    size="md"
                    bgColor={"gray.200"}
                    icon={
                      <Icon as={<Barcode size={16} color={colors.white} />} />
                    }
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
                    icon={
                      <Icon as={<QrCode size={16} color={colors.white} />} />
                    }
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
                    icon={
                      <Icon as={<Money size={16} color={colors.white} />} />
                    }
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
                    icon={
                      <Icon
                        as={<CreditCard size={16} color={colors.white} />}
                      />
                    }
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
                    my={1}
                    mb={8}
                    _checked={{
                      bg: "blue.500",
                    }}
                  >
                    Depósito bancário
                  </Checkbox>
                </Checkbox.Group>
              )}
              name="payment_methods"
              defaultValue={[]}
            />
          </VStack>
          <HStack w="100%" justifyContent="space-between" mt={4}>
            <Button
              title="Resetar filtros"
              type="Tertiary"
              size={"mid"}
              onPress={handleReset}
            />
            <Button
              title="Aplicar filtros"
              type="Secundary"
              size={"mid"}
              onPress={handleSubmit(onSubmit)}
            />
          </HStack>
        </VStack>
      </Box>
    </BottomSheet>
  );
};

export default BottomSheetFilters;
