import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  FlatList, 
  TouchableOpacity,
  Switch
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import Header from '../components/Header';

const AlertsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  // Categorias de alertas
  const categories = [
    'Todos',
    'Emergência',
    'Clima',
    'Trânsito',
    'Saúde',
    'Eventos'
  ];
  
  // Dados de exemplo para alertas
  const alerts = [
    {
      id: '1',
      title: 'Alerta de Chuvas Intensas',
      message: 'Previsão de chuvas intensas nas próximas 24 horas. Evite áreas de risco.',
      category: 'Clima',
      severity: 'alta',
      date: '10/08/2023 14:30',
      active: true
    },
    {
      id: '2',
      title: 'Campanha de Vacinação',
      message: 'Campanha de vacinação contra a gripe começa amanhã em todos os postos de saúde.',
      category: 'Saúde',
      severity: 'média',
      date: '08/08/2023 09:15',
      active: true
    },
    {
      id: '3',
      title: 'Interdição de Via',
      message: 'Avenida Principal interditada para obras entre os dias 15 e 20 de agosto.',
      category: 'Trânsito',
      severity: 'média',
      date: '05/08/2023 16:45',
      active: true
    },
    {
      id: '4',
      title: 'Alerta de Incêndio',
      message: 'Incêndio florestal na região norte da cidade. Bombeiros já estão no local.',
      category: 'Emergência',
      severity: 'alta',
      date: '02/08/2023 11:20',
      active: false
    },
    {
      id: '5',
      title: 'Festival de Verão',
      message: 'Festival de Verão acontecerá no próximo final de semana na Praça Central.',
      category: 'Eventos',
      severity: 'baixa',
      date: '01/08/2023 10:00',
      active: true
    }
  ];
  
  // Filtrar alertas com base na categoria
  const filteredAlerts = alerts.filter(alert => {
    return selectedCategory === 'Todos' || alert.category === selectedCategory;
  });
  
  // Renderizar item de categoria
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  
  // Obter cor com base na severidade
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'alta':
        return colors.error;
      case 'média':
        return colors.accent2;
      case 'baixa':
        return colors.secondary;
      default:
        return colors.textSecondary;
    }
  };
  
  // Obter ícone com base na categoria
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Emergência':
        return 'alert-triangle';
      case 'Clima':
        return 'cloud-rain';
      case 'Trânsito':
        return 'truck';
      case 'Saúde':
        return 'heart';
      case 'Eventos':
        return 'calendar';
      default:
        return 'bell';
    }
  };
  
  // Renderizar item de alerta
  const renderAlertItem = ({ item }) => (
    <View style={[
      styles.alertItem,
      !item.active && styles.inactiveAlertItem
    ]}>
      <View style={[
        styles.alertIconContainer,
        { backgroundColor: getSeverityColor(item.severity) }
      ]}>
        <Feather name={getCategoryIcon(item.category)} size={24} color="#FFF" />
      </View>
      
      <View style={styles.alertInfo}>
        <View style={styles.alertHeader}>
          <Text style={styles.alertTitle}>{item.title}</Text>
          <Text style={styles.alertDate}>{item.date}</Text>
        </View>
        
        <Text style={styles.alertMessage}>{item.message}</Text>
        
        <View style={styles.alertFooter}>
          <View style={[
            styles.severityBadge,
            { backgroundColor: `${getSeverityColor(item.severity)}20` }
          ]}>
            <Text style={[
              styles.severityText,
              { color: getSeverityColor(item.severity) }
            ]}>
              Severidade {item.severity}
            </Text>
          </View>
          
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <Header 
        navigation={navigation} 
        showTabs={false} 
        showWeather={false} 
      />
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Alertas</Text>
          
          <View style={styles.notificationToggle}>
            <Text style={styles.notificationText}>Notificações</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E1E1E6', true: `${colors.primary}80` }}
              thumbColor={notificationsEnabled ? colors.primary : '#FFF'}
            />
          </View>
        </View>
        
        {/* Categorias */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
        
        {/* Lista de alertas */}
        <FlatList
          data={filteredAlerts}
          renderItem={renderAlertItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.alertsList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum alerta encontrado</Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  notificationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 10,
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedCategoryText: {
    color: '#FFF',
    fontWeight: '500',
  },
  alertsList: {
    paddingBottom: 20,
  },
  alertItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inactiveAlertItem: {
    opacity: 0.6,
  },
  alertIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  alertInfo: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  alertDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  alertMessage: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    marginRight: 10,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default AlertsScreen;