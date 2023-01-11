import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Box, Pressable, useTheme } from "native-base";
import { Platform } from "react-native";
import Home from "../screens/Home";
import MySales from "../screens/MySales";
import CreateSale from "../screens/FormSale";
import {
  House,
  Tag,
  Plus,
  ArrowLeft,
  PencilSimple,
} from "phosphor-react-native";
import SignOutIcon from "../components/SignOutIcon";
import SaleDetails from "../screens/SaleDetails";
import { useNavigation } from "@react-navigation/native";
import ProductTag from "../components/ProductTag";
import MySaleDetails from "../screens/MySaleDetails";
import PreviewSale from "../screens/PreviewSale";
import FormSale from "../screens/FormSale";

type AppRoutes = {
  Home: undefined;
  MySales: undefined;
  SaleDetails: undefined;
  MySaleDetails: undefined;
  FormSale: undefined;
  PreviewSale: undefined;
  MockSignOutScreen: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const AppRoutes: React.FC = () => {
  const { colors, sizes, fonts } = useTheme();
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>();
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
        name="PreviewSale"
        component={PreviewSale}
        options={{
          headerShown: false,
          tabBarLabel: "Início",
          tabBarStyle: { display: "none" },
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
        name="FormSale"
        component={FormSale}
        options={{
          tabBarButton: () => null,
          headerTitle: "Criar anúncio",
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
          tabBarStyle: { display: "none" },

          headerLeft: () => {
            return (
              <Pressable
                ml={4}
                onPress={() => goBack()}
                mr={10}
                mt={Platform.OS === "android" ? 0 : 25}
              >
                <ArrowLeft size={24} weight="bold" />
              </Pressable>
            );
          },
        }}
      />

      <Screen
        name="SaleDetails"
        component={SaleDetails}
        options={{
          tabBarButton: () => null,
          headerTitle: "",
          tabBarStyle: { display: "none" },
          headerStyle: {
            backgroundColor: colors.gray[200],
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => {
            return (
              <Pressable
                ml={4}
                onPress={() => goBack()}
                mr={10}
                mt={Platform.OS === "android" ? 0 : 25}
              >
                <ArrowLeft size={24} weight="bold" />
              </Pressable>
            );
          },
          headerRight: () => (
            <Box mr={4} mt={Platform.OS === "android" ? 0 : 25}>
              <ProductTag />
            </Box>
          ),
        }}
      />

      <Screen
        name="MySaleDetails"
        component={MySaleDetails}
        options={{
          tabBarButton: () => null,
          headerTitle: "",
          tabBarStyle: { display: "none" },
          headerStyle: {
            backgroundColor: colors.gray[200],
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => {
            return (
              <Pressable
                ml={4}
                onPress={() => navigate("MySales")}
                mr={10}
                mt={Platform.OS === "android" ? 0 : 25}
              >
                <ArrowLeft size={24} weight="bold" />
              </Pressable>
            );
          },
          headerRight: () => (
            <Box mr={4} mt={Platform.OS === "android" ? 0 : 25}>
              <PencilSimple size={24} weight="bold" />
            </Box>
          ),
        }}
      />

      <Screen
        name="MockSignOutScreen"
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
