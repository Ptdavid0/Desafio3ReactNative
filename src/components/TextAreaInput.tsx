import {
  FormControl,
  IInputProps,
  TextArea as NativeBaseAreaInput,
} from "native-base";
import React from "react";

type Props = IInputProps & {
  errorMessages?: string | null;
};

const TextAreaInput: React.FC<Props> = ({
  errorMessages,
  isInvalid,
  ...rest
}) => {
  const invalid = isInvalid || !!errorMessages;
  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseAreaInput
        bg={"white"}
        h={14}
        px={4}
        maxH={150}
        minH={150}
        autoCompleteType="off"
        borderWidth={0}
        borderRadius={6}
        color={"gray.600"}
        fontFamily={"body"}
        placeholderTextColor={"gray.400"}
        isInvalid={invalid}
        fontSize="md"
        _invalid={{
          borderColor: "red.500",
          bg: "red.50",
          borderWidth: 1,
        }}
        _focus={{
          borderColor: "gray.600",
          bg: "white",
          borderWidth: 1,
        }}
        {...rest}
      />
      {invalid && (
        <FormControl.ErrorMessage>{errorMessages}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default TextAreaInput;
