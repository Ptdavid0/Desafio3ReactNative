import { Box, useToast, Image } from "native-base";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import DefaultAvatar from "../assets/avatar.png";
import { PencilSimpleLine } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import uuid from "uuid";

const photoFileConstructor = async (
  selectedPhoto: ImagePicker.ImagePickerResult
) => {
  if (selectedPhoto.assets) {
    const imageRandomName = uuid.v4();
    const fileExtension = selectedPhoto.assets[0].uri.split(".").pop();
    const photoFile = {
      name: `${imageRandomName}.${fileExtension}`,
      uri: selectedPhoto.assets[0].uri,
      type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
    } as any;

    return photoFile;
  } else {
    return {
      name: "",
      uri: "",
      type: "",
    };
  }
};

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

type AvatarImagePickerProps = {
  onImagePicked: (image: any) => void;
};

const AvatarImagePicker: React.FC<AvatarImagePickerProps> = ({
  onImagePicked,
}) => {
  const [image, setImage] = React.useState<string | null>(null);
  const toast = useToast();

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
        setImage(photoFile.uri);
        onImagePicked(photoFile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box w="full" justifyContent={"center"} alignItems={"center"}>
      <Image
        w={24}
        h={24}
        rounded={50}
        borderColor="blue.500"
        borderWidth={2}
        source={image ? { uri: image } : DefaultAvatar}
        alt="avatar"
      />
      <TouchableOpacity onPress={handlePickImage}>
        <Box
          bgColor={"blue.500"}
          borderRadius={50}
          p={3}
          w="10"
          position="absolute"
          bottom={0}
          left={5}
        >
          <PencilSimpleLine color="white" size={16} />
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default AvatarImagePicker;
