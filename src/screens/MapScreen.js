import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import Header from '../components/Header';
import MapView from '../components/MapView';

const MapScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Categorias de locais
  const categories = [
    'Todos',
    'Saúde',
    'Educação',
    'Lazer',
    'Serviços',
    'Turismo'
  ];
  
  // Dados de exemplo para locais
  const locations = [
    {
      id: '1',
      name: 'Prefeitura Municipal',
      address: 'Rua Principal, 123',
      category: 'Serviços',
      coordinates: { latitude: -22.5432, longitude: -44.9876 },
      phone: '(12) 3456-7890',
      schedule: 'Segunda a Sexta: 8h às 17h'
    },
    {
      id: '2',
      name: 'Hospital Municipal',
      address: 'Av. da Saúde, 456',
      category: 'Saúde',
      coordinates: { latitude: -22.5532, longitude: -44.9976 },
      phone: '(12) 3456-7891',
      schedule: '24 horas'
    },
    {
      id: '3',
      name: 'Escola Municipal João Silva',
      address: 'Rua da Educação, 789',
      category: 'Educação',
      coordinates: { latitude: -22.5332, longitude: -44.9776 },
      phone: '(12) 3456-7892',
      schedule: 'Segunda a Sexta: 7h às 17h'
    },
    {
      id: '4',
      name: 'Praça Central',
      address: 'Centro',
      category: 'Lazer',
      coordinates: { latitude: -22.5432, longitude: -44.9676 },
      phone: 'N/A',
      schedule: 'Aberto 24 horas'
    },
    {
      id: '5',
      name: 'Mirante da Serra',
      address: 'Estrada da Serra, km 5',
      category: 'Turismo',
      coordinates: { latitude: -22.5632, longitude: -44.9576 },
      phone: 'N/A',
      schedule: 'Diariamente: 8h às 18h'
    }
  ];
  
  // Filtrar locais com base na pesquisa e categoria
  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || location.category === selectedCategory;
    
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
  
  // Renderizar item de local
  const renderLocationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => setSelectedLocation(item)}
    >
      <View style={styles.locationIconContainer}>
        <Feather
          name={getCategoryIcon(item.category)}
          size={20}
          color="#FFF"
        />
      </View>
      <View style={styles.locationContent}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationAddress}>{item.address}</Text>
        <Text style={styles.locationCategory}>{item.category}</Text>
      </View>
      <Feather name="chevron-right" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
  
  // Obter ícone com base na categoria
  const getCategoryIcon = (category) => {
    const icons = {
      'Saúde': 'heart',
      'Educação': 'book',
      'Lazer': 'coffee',
      'Serviços': 'briefcase',
      'Turismo': 'map-pin'
    };
    
    return icons[category] || 'map';
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <Header 
        navigation={navigation} 
        showTabs={false} 
        showWeather={false} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Mapa da Cidade</Text>
        
        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar locais..."
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
        
        {/* Mapa */}
        <View style={styles.mapContainer}>
          <MapView 
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </View>
        
        {/* Lista de locais */}
        <View style={styles.locationsListContainer}>
          <Text style={styles.locationsListTitle}>
            {filteredLocations.length} {filteredLocations.length === 1 ? 'local encontrado' : 'locais encontrados'}
          </Text>
          
          <FlatList
            data={filteredLocations}
            renderItem={renderLocationItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.locationsList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum local encontrado</Text>
            }
          />
        </View>
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
  mapContainer: {
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 15,
    backgroundColor: '#E5E5E5',
  },
  locationsListContainer: {
    flex: 1,
  },
  locationsListTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 10,
  },
  locationsList: {
    paddingBottom: 20,
  },
  locationItem: {
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
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  locationContent: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 3,
  },
  locationAddress: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 3,
  },
  locationCategory: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default MapScreen;