import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const EventCard = ({ title, date, location, image, time, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.infoRow}>
          <Feather name="clock" size={14} color={colors.primary} />
          <Text style={styles.infoText}>{time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={14} color={colors.primary} />
          <Text style={styles.infoText} numberOfLines={1}>{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 15,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  date: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    height: 40,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 5,
  },
});

export default EventCard;

console.log('EventCard atualizado!');