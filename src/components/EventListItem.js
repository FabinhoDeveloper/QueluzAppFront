import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const EventListItem = ({ event, onPress }) => {
  // Função para obter a cor com base na categoria
  const getCategoryColor = (category) => {
    const categoryColors = {
      'Cultura': colors.accent3,
      'Esporte': colors.secondary,
      'Saúde': colors.primary,
      'Educação': colors.accent1,
      'Administração': colors.tertiary,
      'Turismo': colors.accent2,
    };
    
    return categoryColors[category] || colors.primary;
  };
  
  // Função para obter o ícone com base na categoria
  const getCategoryIcon = (category) => {
    const categoryIcons = {
      'Cultura': 'film',
      'Esporte': 'activity',
      'Saúde': 'heart',
      'Educação': 'book',
      'Administração': 'briefcase',
      'Turismo': 'map-pin',
    };
    
    return categoryIcons[category] || 'calendar';
  };
  
  // Formatar data
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };
  
  const categoryColor = getCategoryColor(event.category);
  const categoryIcon = getCategoryIcon(event.category);
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: categoryColor }]}>
        <Feather name={categoryIcon} size={20} color="#FFF" />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Feather name="calendar" size={14} color={colors.textSecondary} />
            <Text style={styles.detailText}>{formatDate(event.date)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Feather name="clock" size={14} color={colors.textSecondary} />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Feather name="map-pin" size={14} color={colors.textSecondary} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
        </View>
        
        <View style={styles.categoryContainer}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {event.category}
          </Text>
        </View>
      </View>
      
      <Feather name="chevron-right" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  detailsContainer: {
    marginBottom: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 5,
  },
  categoryContainer: {
    marginTop: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default EventListItem;