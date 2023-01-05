import { Center, Text } from "native-base";
import React from "react";
import { View } from "react-native";

// import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Center flex={1} bg="gray.200" pt={16}>
      <Text>Home</Text>
    </Center>
  );
};

export default Home;
