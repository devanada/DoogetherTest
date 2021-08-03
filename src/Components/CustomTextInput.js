/* eslint-disable prettier/prettier */
import React from 'react';
import {FormControl, Input, IconButton, Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomTextInput = ({
  isRequired,
  isInvalid,
  label,
  placeholder,
  errorMsg,
  iconName,
  onPress,
  onChangeText,
  value,
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        InputRightElement={
          <IconButton
            icon={<Icon as={FontAwesome5} name={iconName} size={4} />}
            colorScheme="emerald"
            ml={1}
            onPress={onPress}
            mr={1}
          />
        }
      />
      <FormControl.ErrorMessage>{errorMsg}</FormControl.ErrorMessage>
    </FormControl>
  );
};

export {CustomTextInput};
