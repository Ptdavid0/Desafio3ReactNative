import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import React from "react";
import AppRoutes from "./app.routes";

import AuthRoutes from "./auth.routes";
import { useAuth } from "../hooks/useAuth";

const Routes: React.FC = () => {
  const { colors } = useTheme();
  const { signed } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[100];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {signed ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
