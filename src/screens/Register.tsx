import { Box, Image, ScrollView, Text, VStack } from "native-base";
import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";
import AvatarImagePicker from "../components/AvatarImagePicker";

const Register: React.FC = () => {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const handleGoBack = () => {
    navigate("Login");
  };
  return (
    <VStack flex={1} bg="gray.200" pt={16}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        mb={16}
      >
        <Image
          alt="Logo"
          source={require("../assets/logo.png")}
          resizeMode="contain"
          size={20}
        />
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="gray.700"
          fontFamily={"heading"}
          mt={2}
        >
          Boas vindas!
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="gray.600"
          fontFamily={"body"}
          mx={12}
          mt={2}
          textAlign={"center"}
        >
          Crie sua conta e use o espaço para comprar itens variados e vender
          seus produtos{" "}
        </Text>

        <Box w="100%" justifyContent={"center"} alignItems={"center"} mt={8}>
          <AvatarImagePicker />
        </Box>

        <Box
          w="100%"
          justifyContent={"center"}
          alignItems={"center"}
          mt={4}
          px={12}
        >
          <Input placeholder="Nome" mt={2} />
          <Input placeholder="Email" mt={2} />
          <Input placeholder="Telefone" mt={2} />
          <Input placeholder="Senha" secureTextEntry mt={2} />
          <Input placeholder="Confirmar senha" secureTextEntry mt={2} />
          <Button title="Criar" type="Tertiary" mt={2} />
        </Box>

        <Box
          w="100%"
          justifyContent={"center"}
          alignItems={"center"}
          mt={16}
          px={12}
        >
          <Text fontSize="sm" color="gray.600" fontFamily={"body"}>
            Já tem uma conta?
          </Text>
          <Button
            title="Ir para o login"
            type="Secundary"
            mt={4}
            onPress={handleGoBack}
          />
        </Box>
      </ScrollView>
    </VStack>
  );
};

export default Register;
