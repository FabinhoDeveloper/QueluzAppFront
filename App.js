import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './src/screens/LoginScreen';

import HomeScreen from './src/screens/HomeScreen';
import AgendaScreen from './src/screens/AgendaScreen';
import MapScreen from './src/screens/MapScreen';
import PhonesScreen from './src/screens/PhonesScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import ContactScreen from './src/screens/ContactScreen';
import NewsDetailScreen from './src/screens/NewsDetailScreen';
import NewsListScreen from './src/screens/NewsListScreen';
import CustomDrawerContent from './src/components/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '75%',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Agenda" component={AgendaScreen} />
      <Drawer.Screen name="Map" component={MapScreen} options={{ title: 'Mapa da Cidade' }} />
      <Drawer.Screen name="Phones" component={PhonesScreen} options={{ title: 'Telefones Úteis' }} />
      <Drawer.Screen name="Documents" component={DocumentsScreen} options={{ title: 'Documentos' }} />
      <Drawer.Screen name="Alerts" component={AlertsScreen} options={{ title: 'Alertas' }} />
      <Drawer.Screen name="Contact" component={ContactScreen} options={{ title: 'Fale Conosco' }} />
    </Drawer.Navigator>
  );
}

// Componente para o Stack Navigator principal
function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={DrawerNavigator} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="NewsList" component={NewsListScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

// Para executar este código, você precisará instalar:
// npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer
// npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
console.log('App.js configurado com todas as telas!');
