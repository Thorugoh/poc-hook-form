import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, TextInput as PaperTextInput} from 'react-native-paper';

type TextInputProps = {
  label: string;
  onChangeText: (value: string) => void;
  showError?: boolean;
  errorMessage?: string;
  value: string;
  secureTextEntry?: boolean;
};

const TextInput = ({
  label,
  onChangeText,
  errorMessage,
  value,
  secureTextEntry,
}: TextInputProps) => {
  return (
    <View style={styles.container}>
      <PaperTextInput
        value={value}
        label={label}
        onChangeText={onChangeText}
        error={!!errorMessage}
        activeUnderlineColor="blue"
        accessibilityLabelledBy={label}
        accessibilityLanguage="pt-BR"
        secureTextEntry={secureTextEntry}
      />
      {!!errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export {TextInput};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 12,
    color: 'red',
  },
});
