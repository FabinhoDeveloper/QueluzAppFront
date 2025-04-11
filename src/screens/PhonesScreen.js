import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  Linking
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import Header from '../components/Header';

const PhonesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  // Categorias de telefones
  const categories = [
    'Todos',
    'Emergência',
    'Saúde',
    'Educação',
    'Serviços',
    'Utilidade'
  ];
  
  // Dados de exemplo para telefones úteis
  const phones = [
    {
      id: '1',
      name: 'Polícia Militar',
      phone: '190',
      category: 'Emergência',
      description: 'Atendimento 24 horas para emergências policiais.'
    },
    {
      id: '2',
      name: 'Corpo de Bombeiros',
      phone: '193',
      category: 'Emergência',
      description: 'Atendimento 24 horas para incêndios, resgates e emergências.'
    },
    {
      id: '3',
      name: 'SAMU',
      phone: '192',
      category: 'Emergência',
      description: 'Serviço de Atendimento Móvel de Urgência.'
    },
    {
      id: '4',
      name: 'Hospital Municipal',
      phone: '(12) 3456-7890',
      category: 'Saúde',
      description: 'Hospital público municipal com atendimento 24 horas.'
    },
    {
      id: '5',
      name: 'UBS Central',
      phone: '(12) 3456-7891',
      category: 'Saúde',
      description: 'Unidade Básica de Saúde com atendimento de segunda a sexta.'
    },
    {
      id: '6',
      name: 'Secretaria de Educação',
      phone: '(12) 3456-7892',
      category: 'Educação',
      description: 'Atendimento para assuntos relacionados à educação municipal.'
    },
    {
      id: '7',
      name: 'Prefeitura Municipal',
      phone: '(12) 3456-7893',
      category: 'Serviços',
      description: 'Atendimento para assuntos administrativos municipais.'
    },
    {
      id: '8',
      name: 'Defesa Civil',
      phone: '199',
      category: 'Emergência',
      description: 'Atendimento para situações de risco, desastres e emergências.'
    },
    {
      id: '9',
      name: 'SAAE - Água e Esgoto',
      phone: '(12) 3456-7894',
      category: 'Utilidade',
      description: 'Serviço de água e esgoto municipal.'
    },
    {
      id: '10',
      name: 'Iluminação Pública',
      phone: '(12) 3456-7895',
      category: 'Utilidade',
      description: 'Serviço para reportar problemas com iluminação pública.'
    }
  ];
  
  // Filtrar telefones com base na pesquisa e categoria
  const filteredPhones = phones.filter(phone => {
    const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         phone.phone.includes(searchQuery) ||
                         phone.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || phone.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
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
  
  // Função para ligar para um número
  const callPhone = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  
  // Renderizar item de telefone
  const renderPhoneItem = ({ item }) => (
    <View style={styles.phoneItem}>
      <View style={styles.phoneInfo}>
        <Text style={styles.phoneName}>{item.name}</Text>
        <Text style={styles.phoneNumber}>{item.phone}</Text>
        <Text style={styles.phoneDescription}>{item.description}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.callButton}
        onPress={() => callPhone(item.phone)}
      >
        <Feather name="phone" size={20} color="#FFF" />
      </TouchableOpacity>
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
        <Text style={styles.title}>Telefones Úteis</Text>
        
        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar telefones..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
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
        
        {/* Lista de telefones */}
        <FlatList
          data={filteredPhones}
          renderItem={renderPhoneItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.phonesList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum telefone encontrado</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
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
  phonesList: {
    paddingBottom: 20,
  },
  phoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  phoneInfo: {
    flex: 1,
  },
  phoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 5,
  },
  phoneDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default PhonesScreen;