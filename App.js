import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';
import { colors } from './src/styles/colors';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Criamos um componente para o Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '75%',
        },
        drawerActiveTintColor: colors.primary,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* Podemos adicionar mais telas ao drawer aqui */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* A tela inicial pode ser Login ou Home, dependendo do estado de autenticação */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Para executar este código, você precisará instalar:
// npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer
// npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
console.log('App.js configurado com navegação entre Login e Drawer!');