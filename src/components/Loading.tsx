import React from "react";
import { Center, Spinner } from "native-base";

const Loading: React.FC = () => {
  return (
    <Center flex={1}>
      <Spinner accessibilityLabel="Loading posts" color="blue.500" />
    </Center>
  );
};

export default Loading;
