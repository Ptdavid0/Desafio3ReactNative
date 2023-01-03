import { Box, Icon, Image } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import DefaultAvatar from "../assets/avatar.png";
import { PencilSimpleLine } from "phosphor-react-native";

const AvatarImagePicker: React.FC = () => {
  return (
    <Box w="full" justifyContent={"center"} alignItems={"center"}>
      <Image w={24} h={24} source={DefaultAvatar} alt="avatar" />
      <TouchableOpacity>
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
