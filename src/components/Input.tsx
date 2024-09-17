import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface InputProps extends TextInputProps {
  // Add any additional props here
}

const Input: React.FC<InputProps> = (props) => {
  const { colors } = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        { color: colors.text, borderColor: colors.subtext },
        props.style,
      ]}
      placeholderTextColor={colors.subtext}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});

export default Input;