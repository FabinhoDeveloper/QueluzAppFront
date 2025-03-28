import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const WeatherWidget = () => {
  // Aqui você poderia integrar com uma API de clima real
  const weather = {
    temp: 24,
    condition: 'Ensolarado',
    icon: 'sun',
  };

  return (
    <View style={styles.container}>
      <View style={styles.weatherInfo}>
        <Feather name={weather.icon} size={24} color="#FFF" />
        <Text style={styles.temperature}>{weather.temp}°C</Text>
      </View>
      <Text style={styles.condition}>{weather.condition}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  condition: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
});

export default WeatherWidget;

console.log('WeatherWidget mantido!');