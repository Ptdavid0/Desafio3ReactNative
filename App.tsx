import { View, StatusBar } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import Loading from "./src/components/Loading";
import { NativeBaseProvider } from "native-base";
import { THEME } from "./src/theme";
import Routes from "./src/routes";
import AuthContextProvider from "./src/contexts/AuthContext";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
    </NativeBaseProvider>
  );
};

export default App;
