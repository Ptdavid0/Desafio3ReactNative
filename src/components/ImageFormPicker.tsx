import {
  Box,
  FlatList,
  HStack,
  Image as NativeImage,
  Pressable,
} from "native-base";
import { Plus, X } from "phosphor-react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { useTheme } from "native-base";

type Image = {
  uri: string;
  id: string;
};

const ImageFormPicker: React.FC = () => {
  const [images, setImages] = React.useState<Image[]>([]);
  const { colors } = useTheme();

  const handlePickImage = async () => {
    if (images.length > 2) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const createID = () => {
        return Math.random().toString(36).slice(2, 9);
      };
      setImages([...images, { uri: result.assets[0].uri, id: createID() }]);
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const Image = (image: Image) => (
    <Box justifyContent={"center"} w={100} h={100} mr={4}>
      <NativeImage
        source={{ uri: image.uri }}
        alt="Alternate Text"
        w={100}
        h={100}
        borderRadius={10}
      />
      <Pressable
        position={"absolute"}
        bgColor={"gray.600"}
        borderRadius={50}
        p={1}
        top={1}
        right={1}
        onPress={() => handleRemoveImage(image.id)}
      >
        <X color={colors.white} size={16} weight="bold" />
      </Pressable>
    </Box>
  );
  return (
    <HStack w="100%" mt={6}>
      <TouchableOpacity
        onPress={handlePickImage}
        disabled={images.length > 2}
        style={{
          width: 100,
          height: 100,
          backgroundColor: colors.gray[300],
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Plus size={30} color={colors.gray[400]} />
      </TouchableOpacity>
      <FlatList
        data={images}
        ml={4}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => Image(item)}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
    </HStack>
  );
};

export default ImageFormPicker;
