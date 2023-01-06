import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import Home from "../screens/Home";
import MySales from "../screens/MySales";
import CreateSale from "../screens/CreateSale";
import { House, Tag, SignOut } from "phosphor-react-native";
import SignOutIcon from "../components/SignOutIcon";

type AppRoutes = {
  Home: undefined;
  MySales: undefined;
  SaleDetails: undefined;
  CreateSale: undefined;
  PreviewSale: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const AppRoutes: React.FC = () => {
  const { colors, sizes } = useTheme();
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[700],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingHorizontal: sizes[4],
          paddingVertical: sizes[2],
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size, focused }) => {
            return <House color={color} size={size} weight="bold" />;
          },
        }}
      />

      <Screen
        name="MySales"
        component={MySales}
        options={{
          tabBarLabel: "Minhas Vendas",
          tabBarIcon: ({ color, size, focused }) => {
            return <Tag color={color} size={size} weight="bold" />;
          },
        }}
      />

      <Screen
        name="CreateSale"
        component={CreateSale}
        options={{
          tabBarLabel: "Criar Venda",
          tabBarIcon: ({ color, size, focused }) => {
            return <SignOutIcon size={size} weight="bold" />;
          },
        }}
      />
    </Navigator>
  );
};

export default AppRoutes;
