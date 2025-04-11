import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

// Componente simulado de MapView
// Em um aplicativo real, você usaria react-native-maps ou outra biblioteca de mapas
const MapView = ({ locations, selectedLocation, onLocationSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mapPlaceholder}>
        Mapa da Cidade
      </Text>
      <Text style={styles.mapInstructions}>
        (Em um aplicativo real, aqui seria exibido um mapa interativo usando react-native-maps)
      </Text>
      
      {selectedLocation && (
        <View style={styles.selectedLocationInfo}>
          <Text style={styles.selectedLocationName}>{selectedLocation.name}</Text>
          <Text style={styles.selectedLocationAddress}>{selectedLocation.address}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
  },
  mapPlaceholder: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  mapInstructions: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  selectedLocationInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 10,
  },
  selectedLocationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  selectedLocationAddress: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default MapView;