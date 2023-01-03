import { View } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import Loading from "./src/components/Loading";
import { NativeBaseProvider } from "native-base";
import { THEME } from "./src/theme";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {!fontsLoaded ? <View /> : <Loading />}
    </NativeBaseProvider>
  );
};

export default App;
