import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  FlatList,
  Dimensions,
  StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import NewsCarousel from '../components/NewsCarousel';
import SectorCard from '../components/SectorCard';
import EventCard from '../components/EventCard';
import WeatherWidget from '../components/WeatherWidget';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Destaques');
  
  // Dados de exemplo para os setores (atualizados com as cores do logo)
  const sectors = [
    { id: '1', title: 'Saúde', icon: 'heart', color: colors.primary },
    { id: '2', title: 'Educação', icon: 'book', color: colors.secondary },
    { id: '3', title: 'Transporte', icon: 'truck', color: colors.tertiary },
    { id: '4', title: 'Turismo', icon: 'map-pin', color: colors.accent1 },
    { id: '5', title: 'Segurança', icon: 'shield', color: colors.accent2 },
    { id: '6', title: 'Cultura', icon: 'film', color: colors.accent3 },
  ];
  
  // Dados de exemplo para os eventos
  const events = [
    { 
      id: '1', 
      title: 'Festival de Música', 
      date: '15 Ago', 
      location: 'Praça Central',
      image: 'https://via.placeholder.com/150',
      time: '19:00'
    },
    { 
      id: '2', 
      title: 'Feira de Artesanato', 
      date: '20 Ago', 
      location: 'Centro Cultural',
      image: 'https://via.placeholder.com/150',
      time: '09:00'
    },
    { 
      id: '3', 
      title: 'Corrida Beneficente', 
      date: '28 Ago', 
      location: 'Parque Municipal',
      image: 'https://via.placeholder.com/150',
      time: '07:00'
    },
  ];
  
  // Dados de exemplo para as notícias
  const news = [
    {
      id: '1',
      title: 'Prefeitura anuncia novo programa de revitalização urbana',
      image: 'https://via.placeholder.com/400x200',
      date: '10 Ago 2023',
      category: 'Urbanismo'
    },
    {
      id: '2',
      title: 'Campanha de vacinação contra gripe começa na próxima semana',
      image: 'https://via.placeholder.com/400x200',
      date: '08 Ago 2023',
      category: 'Saúde'
    },
    {
      id: '3',
      title: 'Novo parque será inaugurado no próximo mês',
      image: 'https://via.placeholder.com/400x200',
      date: '05 Ago 2023',
      category: 'Lazer'
    },
  ];

  const tabs = ['Destaques', 'Notícias', 'Serviços'];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      {/* Header Atualizado */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={24} color="#FFF" />
          </TouchableOpacity>
          
          {/* Logo da cidade no lugar do texto */}
          <Image 
            source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s9nV46k2Zbfu1Z3c6FIwk7AeuQcfkN.png' }} 
            style={styles.cityLogo}
            resizeMode="contain"
          />
          
          <TouchableOpacity>
            <Feather name="bell" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerBottom}>
          <WeatherWidget />
          
          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      
      {/* Body */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Notícias em Destaque */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notícias</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          <NewsCarousel news={news} />
        </View>
        
        {/* Setores */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Serviços</Text>
          </View>
          
          <View style={styles.sectorsGrid}>
            {sectors.map((sector) => (
              <SectorCard 
                key={sector.id} 
                title={sector.title} 
                icon={sector.icon} 
                color={sector.color}
                onPress={() => console.log(`Setor ${sector.title} clicado`)}
              />
            ))}
          </View>
        </View>
        
        {/* Eventos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Eventos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={events}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventCard 
                title={item.title}
                date={item.date}
                location={item.location}
                image={item.image}
                time={item.time}
                onPress={() => console.log(`Evento ${item.title} clicado`)}
              />
            )}
            contentContainerStyle={styles.eventsList}
          />
        </View>
        
        {/* Espaço adicional no final */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 40,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  cityLogo: {
    width: 120,
    height: 40,
  },
  headerBottom: {
    paddingHorizontal: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFF',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllText: {
    color: colors.primary,
    fontWeight: '500',
  },
  sectorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  eventsList: {
    paddingRight: 20,
  },
});

export default HomeScreen;

console.log('HomeScreen atualizado com o logo de Queluz!');