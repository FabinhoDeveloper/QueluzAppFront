import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { 
  DrawerContentScrollView, 
  DrawerItemList 
} from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  // Função para navegar para a tela de login
  const navigateToLogin = () => {
    // Primeiro fechamos o drawer
    navigation.closeDrawer();
    
    // Depois navegamos para a tela de login
    // Usando reset para limpar a pilha de navegação
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const menuItems = [
    { icon: 'home', label: 'Início', screen: 'Home' },
    { icon: 'calendar', label: 'Agenda', screen: 'Agenda' },
    { icon: 'map', label: 'Mapa da Cidade', screen: 'Map' },
    { icon: 'phone', label: 'Telefones Úteis', screen: 'Phones' },
    { icon: 'file-text', label: 'Documentos', screen: 'Documents' },
    { icon: 'alert-circle', label: 'Alertas', screen: 'Alerts' },
    { icon: 'message-square', label: 'Fale Conosco', screen: 'Contact' },
  ];

  const quickLinks = [
    { icon: 'dollar-sign', label: 'Impostos', color: colors.primary },
    { icon: 'clipboard', label: 'Protocolos', color: colors.secondary },
    { icon: 'briefcase', label: 'Empregos', color: colors.tertiary },
    { icon: 'award', label: 'Concursos', color: colors.accent3 },
  ];

  return (
    <DrawerContentScrollView 
      {...props} 
      contentContainerStyle={styles.drawerContent}
    >
      <View style={styles.userSection}>
        <Image 
          source={require('../../assets/logoBranca1.png')}
          style={styles.cityLogo} 
          resizeMode="contain"
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Olá, Visitante</Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={navigateToLogin}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <ScrollView style={styles.menuItems}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={() => {
              if (navigation.navigate && item.screen) {
                navigation.navigate(item.screen);
              }
            }}
          >
            <Feather name={item.icon} size={20} color={colors.text} />
            <Text style={styles.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.divider} />
      
      <View style={styles.quickLinksSection}>
        <Text style={styles.quickLinksTitle}>Acesso Rápido</Text>
        <View style={styles.quickLinksContainer}>
          {quickLinks.map((item, index) => (
            <TouchableOpacity key={index} style={styles.quickLinkItem}>
              <View style={[styles.quickLinkIconContainer, { backgroundColor: `${item.color}20` }]}>
                <Feather name={item.icon} size={18} color={item.color} />
              </View>
              <Text style={styles.quickLinkText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Feather name="settings" size={20} color={colors.textSecondary} />
          <Text style={styles.footerItemText}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Feather name="help-circle" size={20} color={colors.textSecondary} />
          <Text style={styles.footerItemText}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userSection: {
    padding: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
  },
  cityLogo: {
    width: 150,
    height: 60,
    marginBottom: 15,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
  menuItems: {
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: colors.text,
  },
  quickLinksSection: {
    padding: 15,
  },
  quickLinksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickLinkItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickLinkIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  quickLinkText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 'auto',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerItemText: {
    marginLeft: 15,
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default CustomDrawerContent;

console.log('CustomDrawerContent atualizado com navegação para login!');