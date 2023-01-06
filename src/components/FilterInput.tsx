import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";
import React from "react";

type Props = IInputProps & {
  errorMessages?: string | null;
};

const FilterInput: React.FC<Props> = ({
  errorMessages,
  isInvalid,
  ...rest
}) => {
  const invalid = isInvalid || !!errorMessages;
  return (
    <FormControl isInvalid={invalid} w={"80%"} h={"100%"}>
      <NativeBaseInput
        borderWidth={0}
        borderRadius={6}
        color={"gray.600"}
        fontFamily={"body"}
        w={"100%"}
        h={"100%"}
        placeholderTextColor={"gray.400"}
        isInvalid={invalid}
        fontSize="md"
        _invalid={{
          borderColor: "red.500",
          bg: "red.50",
          borderWidth: 1,
        }}
        _focus={{
          borderColor: "transparent",
          bg: "white",
          borderWidth: 0,
        }}
        {...rest}
      />
      {invalid && (
        <FormControl.ErrorMessage>{errorMessages}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default FilterInput;
