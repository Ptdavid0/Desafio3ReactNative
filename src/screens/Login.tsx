import { Box, Icon, Image, Text, VStack } from "native-base";
import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";

const Login: React.FC = () => {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const handleGoRegister = () => {
    navigate("Register");
  };

  return (
    <VStack flex={1} bgColor="white">
      <VStack
        bg="gray.200"
        borderBottomLeftRadius={24}
        borderBottomRightRadius={24}
        w="100%"
        h="70%"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          alt="Logo"
          source={require("../assets/logo.png")}
          resizeMode="contain"
        />
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="gray.700"
          fontFamily={"heading"}
          mt={5}
        >
          marketspace
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="gray.400"
          fontFamily={"body"}
        >
          Seu espaço de compra e venda
        </Text>
        <Box
          w="100%"
          justifyContent={"center"}
          alignItems={"center"}
          mt={20}
          px={12}
        >
          <Text fontSize="sm" color="gray.600" fontFamily={"body"}>
            Acesse sua conta
          </Text>
          <Input placeholder="Email" mt={4} />
          <Input placeholder="Senha" secureTextEntry />
          <Button title="Entrar" type="Primary" mt={4} />
        </Box>
      </VStack>
      <VStack
        w="100%"
        h="30%"
        justifyContent={"center"}
        alignItems={"center"}
        mt={-8}
        px={12}
      >
        <Text fontSize="sm" color="gray.600" fontFamily={"body"}>
          Ainda não tem acesso ?
        </Text>
        <Button
          title="Criar uma conta"
          type="Secundary"
          mt={4}
          onPress={handleGoRegister}
        />
      </VStack>
    </VStack>
  );
};

export default Login;
