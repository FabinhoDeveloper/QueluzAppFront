import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  ScrollView,
  SafeAreaView
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { colors } from '../styles/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    // if (!email || !password) {
    //   console.log('Por favor, preencha todos os campos');
    //   return;
    // }
    
    setIsLoading(true);
    // Simulação de login
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login com:', email, password);
      // Navegar para a tela principal após login bem-sucedido
      if (navigation.navigate) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        });
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/150' }} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <Text style={styles.appName}>Queluz+</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>
            
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail"
            />
            
            <CustomInput
              placeholder="Senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              icon="lock"
            />
            
            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
            
            <CustomButton 
              title="Entrar" 
              onPress={handleLogin} 
              isLoading={isLoading}
            />
            
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Não tem uma conta? </Text>
              <Text style={styles.signupLink}>Cadastre-se</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 30,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: colors.primary,
    marginTop: 8,
    marginBottom: 24,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: colors.textSecondary,
  },
  signupLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

console.log('LoginScreen corrigido com sucesso!');