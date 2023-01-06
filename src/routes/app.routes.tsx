import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Pressable, useTheme } from "native-base";
import { Platform } from "react-native";
import Home from "../screens/Home";
import MySales from "../screens/MySales";
import CreateSale from "../screens/CreateSale";
import { House, Tag, SignOut, Plus } from "phosphor-react-native";
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
  const { colors, sizes, fonts } = useTheme();
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
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
          headerShown: false,
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
          headerTitle: "Meus anúncios",
          headerTitleAlign: "center",
          headerTitleStyle: {
            marginTop: Platform.OS === "android" ? 0 : 25,
            color: colors.gray[700],
            fontSize: sizes[5],
            fontFamily: fonts.heading,
          },
          headerStyle: {
            backgroundColor: colors.gray[200],
            elevation: 0,
            shadowOpacity: 0,
          },
          headerRight: () => {
            return (
              <Pressable
                ml={4}
                onPress={() => {}}
                mr={10}
                mt={Platform.OS === "android" ? 0 : 30}
              >
                <Plus size={24} weight="bold" />
              </Pressable>
            );
          },
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
