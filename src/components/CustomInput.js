import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const CustomInput = ({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  icon,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={[
      styles.inputContainer,
      isFocused && styles.inputContainerFocused
    ]}>
      {icon && (
        <Feather 
          name={icon} 
          size={20} 
          color={isFocused ? colors.primary : colors.textSecondary} 
          style={styles.icon}
        />
      )}
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        {...props}
      />
      
      {secureTextEntry && (
        <TouchableOpacity 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'} 
            size={20} 
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputContainerFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    height: '100%', // Garantir que a área tocável cubra toda a altura
    padding: 0, // Remover padding interno que pode afetar a área tocável
  },
  eyeIcon: {
    padding: 4,
  },
});

export default CustomInput;

console.log('CustomInput corrigido com sucesso!');