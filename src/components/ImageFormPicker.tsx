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
import { Alert, TouchableOpacity } from "react-native";
import { useTheme } from "native-base";
import * as FileSystem from "expo-file-system";
import { PhotoFileDTO } from "../dtos/PhotoFileDTO";
import { useAuth } from "../hooks/useAuth";
import { photoFileConstructor } from "../utils/productsUtils";
import api from "../service/api";

const checkingPhotoSize = async (selectedPhotoURI: string) => {
  const photoInfo = await FileSystem.getInfoAsync(selectedPhotoURI);
  if (photoInfo.size) {
    const photoSizeInMb = photoInfo.size / 1024 / 1024;

    if (photoSizeInMb < 5) {
      return true;
    } else {
      Alert.alert(
        "A imagem selecionada é muito grande, por favor selecione uma imagem menor do que 5MB"
      );
      return false;
    }
  } else {
    return false;
  }
};

const ImageFormPicker: React.FC = ({}) => {
  const { colors } = useTheme();
  const { setCurrentProductImages, currentProductImages } = useAuth();

  const handlePickImage = async () => {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (selectedPhoto.canceled) {
        return;
      }
      const photoIsValid = await checkingPhotoSize(selectedPhoto.assets[0].uri);

      if (photoIsValid) {
        const photoFile = await photoFileConstructor(selectedPhoto);
        setCurrentProductImages([...currentProductImages, photoFile]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImage = (image: PhotoFileDTO) => {
    const newImages = currentProductImages.filter((i) => i.name !== image.name);
    setCurrentProductImages(newImages);
  };

  const Image = (image: PhotoFileDTO) => (
    <Box justifyContent={"center"} w={100} h={100} mr={4}>
      <NativeImage
        source={
          image.path
            ? {
                uri: `${api.defaults.baseURL}/images/${image.path}`,
              }
            : { uri: image.uri }
        }
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
        onPress={() => handleRemoveImage(image)}
      >
        <X color={colors.white} size={16} weight="bold" />
      </Pressable>
    </Box>
  );
  return (
    <HStack w="100%" mt={6}>
      <TouchableOpacity
        onPress={handlePickImage}
        disabled={currentProductImages.length > 2}
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
        data={currentProductImages}
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
