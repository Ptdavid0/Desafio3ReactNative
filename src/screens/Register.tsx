import { Box, Image, ScrollView, Text, VStack, useToast } from "native-base";
import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";
import AvatarImagePicker from "../components/AvatarImagePicker";
import { PhotoFileDTO } from "../dtos/AvatarFileDTO";
import { addUser } from "../storage/addUser";
import { useAuth } from "../hooks/useAuth";

const Register: React.FC = () => {
  const { signIn } = useAuth();
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const handleGoBack = () => {
    navigate("Login");
  };
  const toast = useToast();
  const [avatar, setAvatar] = React.useState<any>(null);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [tel, setTel] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleRegister = async () => {
    if (!name || !email || !password || !tel || !avatar.uri) {
      toast.show({
        title: "Preencha todos os campos",
        duration: 3000,
        placement: "top",
      });
      return;
    }
    const userCreated = await addUser({
      name,
      email,
      password,
      tel,
      avatar,
    });
    if (userCreated) {
      toast.show({
        title: "Cadastro realizado com sucesso",
        duration: 3000,
        placement: "top",
      });
      await signIn(email, password);
    } else {
      toast.show({
        title: "Erro ao cadastrar",
        duration: 3000,
        placement: "top",
      });
    }
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
          <AvatarImagePicker onImagePicked={setAvatar} />
        </Box>

        <Box
          w="100%"
          justifyContent={"center"}
          alignItems={"center"}
          mt={4}
          px={12}
        >
          <Input placeholder="Nome" mt={2} onChangeText={setName} />
          <Input placeholder="Email" mt={2} onChangeText={setEmail} />
          <Input placeholder="Telefone" mt={2} onChangeText={setTel} />
          <Input
            placeholder="Senha"
            secureTextEntry
            mt={2}
            onChangeText={setPassword}
          />
          <Input placeholder="Confirmar senha" secureTextEntry mt={2} />
          <Button
            title="Criar"
            type="Tertiary"
            mt={2}
            onPress={handleRegister}
          />
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
