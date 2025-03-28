import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { colors } from '../styles/colors';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 40; // 20px padding on each side

const NewsCarousel = ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // Função para determinar a cor da categoria com base no nome
  const getCategoryColor = (category) => {
    const categoryMap = {
      'Saúde': colors.primary,
      'Urbanismo': colors.tertiary,
      'Lazer': colors.secondary,
      'Educação': colors.accent1,
      'Cultura': colors.accent3,
      'Segurança': colors.accent2,
    };
    
    return categoryMap[category] || colors.primary;
  };

  const renderItem = ({ item }) => {
    const categoryColor = getCategoryColor(item.category);
    
    return (
      <TouchableOpacity 
        style={styles.newsItem}
        onPress={() => console.log(`Notícia ${item.title} clicada`)}
      >
        <Image source={{ uri: item.image }} style={styles.newsImage} />
        <View style={styles.newsContent}>
          <View style={[styles.categoryContainer, { backgroundColor: `${categoryColor}20` }]}>
            <Text style={[styles.category, { color: categoryColor }]}>{item.category}</Text>
          </View>
          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsDate}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / ITEM_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="center"
        decelerationRate="fast"
      />
      
      <View style={styles.pagination}>
        {news.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  newsItem: {
    width: ITEM_WIDTH,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  newsImage: {
    width: '100%',
    height: 180,
  },
  newsContent: {
    padding: 15,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  category: {
    fontWeight: '600',
    fontSize: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
    width: 16,
  },
});

export default NewsCarousel;

console.log('NewsCarousel atualizado com as cores do logo de Queluz!');