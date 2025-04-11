import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import WeatherWidget from "./WeatherWidget";
import { StyleSheet } from "react-native";

const tabs = ["Notícias", "Serviços", "Eventos"];

// Cor fixa para substituir o ThemeContext
const primaryColor = '#0C447F';

const Header = ({ navigation, showWeather = true, showTabs = true, activeTab, onTabPress }) => {
  return (
    <View style={[styles.header, { backgroundColor: primaryColor }]}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => navigation?.openDrawer()}>
          <Feather name="menu" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Logo da cidade */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require('../../assets/logoBranca1.png')}
            style={styles.cityLogo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity>
          <Feather name="bell" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.headerBottom}>
        {showWeather && <WeatherWidget />}

        {showTabs && (
          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => onTabPress && onTabPress(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
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
});

export default Header;