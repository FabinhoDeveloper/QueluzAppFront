import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import Header from '../components/Header';
import CalendarView from '../components/CalendarView';
import EventListItem from '../components/EventListItem';

const AgendaScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' ou 'list'
  
  // Dados de exemplo para eventos
  const events = [
    {
      id: '1',
      title: 'Festival de Música',
      date: new Date(2023, 7, 15), // 15 de Agosto de 2023
      location: 'Praça Central',
      time: '19:00',
      description: 'Festival com apresentações de bandas locais e regionais.',
      category: 'Cultura'
    },
    {
      id: '2',
      title: 'Feira de Artesanato',
      date: new Date(2023, 7, 20), // 20 de Agosto de 2023
      location: 'Centro Cultural',
      time: '09:00',
      description: 'Exposição e venda de produtos artesanais da região.',
      category: 'Cultura'
    },
    {
      id: '3',
      title: 'Corrida Beneficente',
      date: new Date(2023, 7, 28), // 28 de Agosto de 2023
      location: 'Parque Municipal',
      time: '07:00',
      description: 'Corrida com arrecadação para instituições de caridade.',
      category: 'Esporte'
    },
    {
      id: '4',
      title: 'Vacinação Antirrábica',
      date: new Date(2023, 7, 18), // 18 de Agosto de 2023
      location: 'Postos de Saúde',
      time: '08:00 - 17:00',
      description: 'Campanha de vacinação antirrábica para cães e gatos.',
      category: 'Saúde'
    },
    {
      id: '5',
      title: 'Audiência Pública',
      date: new Date(2023, 7, 22), // 22 de Agosto de 2023
      location: 'Câmara Municipal',
      time: '19:00',
      description: 'Discussão sobre o orçamento municipal para o próximo ano.',
      category: 'Administração'
    }
  ];
  
  // Filtrar eventos para a data selecionada
  const filteredEvents = events.filter(event => 
    event.date.getDate() === selectedDate.getDate() &&
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear()
  );
  
  // Alternar entre visualização de calendário e lista
  const toggleViewMode = () => {
    setViewMode(viewMode === 'calendar' ? 'list' : 'calendar');
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Agenda de Eventos</Text>
          <TouchableOpacity onPress={toggleViewMode} style={styles.viewModeButton}>
            <Feather 
              name={viewMode === 'calendar' ? 'list' : 'calendar'} 
              size={24} 
              color={colors.primary} 
            />
          </TouchableOpacity>
        </View>
        
        {viewMode === 'calendar' ? (
          <CalendarView 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            events={events}
          />
        ) : (
          <FlatList
            data={events.sort((a, b) => a.date - b.date)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventListItem 
                event={item}
                onPress={() => console.log(`Evento ${item.title} selecionado`)}
              />
            )}
            contentContainerStyle={styles.eventsList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum evento encontrado</Text>
            }
          />
        )}
        
        {viewMode === 'calendar' && (
          <>
            <View style={styles.eventsHeaderContainer}>
              <Text style={styles.eventsHeader}>
                Eventos para {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
              </Text>
              <Text style={styles.eventsCount}>
                {filteredEvents.length} {filteredEvents.length === 1 ? 'evento' : 'eventos'}
              </Text>
            </View>
            
            <FlatList
              data={filteredEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <EventListItem 
                  event={item}
                  onPress={() => console.log(`Evento ${item.title} selecionado`)}
                />
              )}
              contentContainerStyle={styles.eventsList}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhum evento para esta data</Text>
              }
            />
          </>
        )}
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
  viewModeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  eventsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  eventsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  eventsCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  eventsList: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default AgendaScreen;
