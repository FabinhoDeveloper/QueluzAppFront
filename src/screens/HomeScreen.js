import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  Dimensions,
  StatusBar
} from 'react-native';
import NewsCarousel from '../components/NewsCarousel';
import SectorCard from '../components/SectorCard';
import EventCard from '../components/EventCard';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

// Cores fixas para substituir o ThemeContext
const colors = {
  primary: '#0C447F',
  secondary: '#26A69A',
  tertiary: '#7E57C2',
  accent1: '#F57C00',
  accent2: '#D32F2F',
  accent3: '#7CB342',
  background: '#F5F5F5',
  text: '#333333'
};

const HomeScreen = ({ navigation }) => {
  // Estado para controlar a tab ativa
  const [activeTab, setActiveTab] = useState('Destaques');

  // Refs para cada seção
  const scrollViewRef = useRef(null);
  const destaquesRef = useRef(null);
  const noticiasRef = useRef(null);
  const servicosRef = useRef(null);
  const eventosRef = useRef(null);

  // Posições Y de cada seção
  const [sectionPositions, setSectionPositions] = useState({
    Destaques: 0,
    Notícias: 0,
    Serviços: 0,
    Eventos: 0
  });

  // Função para lidar com o clique nas tabs
  const handleTabPress = (tab) => {
    setActiveTab(tab);
    
    // Rolar para a seção correspondente
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: sectionPositions[tab],
        animated: true
      });
    }
  };

  // Função para capturar as posições das seções
  const captureSectionLayout = (sectionName, event) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions(prev => ({
      ...prev,
      [sectionName]: y
    }));
  };

  // Dados de exemplo para os setores
  const sectors = [
    { id: '1', title: 'Saúde', icon: 'heart', color: colors.primary },
    { id: '2', title: 'Educação', icon: 'book', color: colors.secondary },
    { id: '3', title: 'Transporte', icon: 'truck', color: colors.tertiary },
    { id: '4', title: 'Turismo', icon: 'map-pin', color: colors.accent1 },
    { id: '5', title: 'Segurança', icon: 'shield', color: '#FFC300' },
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
      title: 'ESF da Figueira realiza horta comunitária e promove sustento e união para a comunidade',
      image: 'https://queluz.sp.gov.br/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-09-at-11.01.21-1-800x445.jpeg',
      date: '27 Mar 2025',
      category: 'Saúde'
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

  // Monitorar o scroll para atualizar a tab ativa
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    // Determinar qual seção está mais visível
    if (scrollY < sectionPositions.Serviços - 50) {
      setActiveTab('Notícias');
    } else if (scrollY < sectionPositions.Eventos - 50) {
      setActiveTab('Serviços');
    } else {
      setActiveTab('Eventos');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Passando activeTab e onTabPress para o Header */}
      <Header 
        navigation={navigation} 
        showTabs={true} 
        showWeather={true} 
        activeTab={activeTab}
        onTabPress={handleTabPress}
        />
      
      {/* Body */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.body} 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Para melhor performance
      >
        
        {/* Notícias */}
        <View 
          ref={noticiasRef}
          onLayout={(event) => captureSectionLayout('Notícias', event)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Notícias</Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewsList')}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          <NewsCarousel news={news} />
        </View>
        
        {/* Serviços */}
        <View 
          ref={servicosRef}
          onLayout={(event) => captureSectionLayout('Serviços', event)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Serviços</Text>
          </View>
          
          <View style={styles.sectorsGrid}>
            {sectors.map((sector) => (
              <SectorCard 
                key={sector.id} 
                id={sector.id}
                title={sector.title} 
                icon={sector.icon} 
                color={sector.color}
                navigation={navigation}
              />
            ))}
          </View>
        </View>
        
        {/* Eventos */}
        <View 
          ref={eventosRef}
          onLayout={(event) => captureSectionLayout('Eventos', event)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Eventos</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>Ver todos</Text>
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
  },
  seeAllText: {
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