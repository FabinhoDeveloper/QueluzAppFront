import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Cores fixas para substituir o ThemeContext
const colors = {
  primary: '#1E88E5',
  background: '#F5F5F5',
  text: '#333333',
  textSecondary: '#757575'
};

const NewsListScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  useEffect(() => {
    // Em um app real, você buscaria os dados de uma API
    // Aqui estamos simulando com dados estáticos
    const fetchNews = () => {
      // Simular carregamento
      setTimeout(() => {
        setNews(getAllNews());
        setLoading(false);
      }, 500);
    };

    fetchNews();
  }, []);

  // Função para obter todas as notícias
  const getAllNews = () => {
    // Dados simulados - em um app real, você buscaria do backend
    return [
      {
        id: '1',
        title: 'SESC-SP visita Diretoria de Esportes para lançamento do Dia do Desafio',
        image: 'https://via.placeholder.com/400x200',
        date: '27 Mar 2025',
        category: 'Esporte',
        summary: 'A Prefeitura de Queluz, por meio da Diretoria de Esportes, recebeu na última terça-feira (26) a visita de representantes do SESC-SP para discutir o lançamento do Dia do Desafio 2025.'
      },
      {
        id: '2',
        title: 'Campanha de vacinação contra gripe começa na próxima semana',
        image: 'https://via.placeholder.com/400x200',
        date: '08 Ago 2023',
        category: 'Saúde',
        summary: 'A Secretaria Municipal de Saúde de Queluz anuncia o início da Campanha de Vacinação contra a Gripe, que começará na próxima segunda-feira (15) e seguirá até o dia 30 de agosto.'
      },
      {
        id: '3',
        title: 'Novo parque será inaugurado no próximo mês',
        image: 'https://via.placeholder.com/400x200',
        date: '05 Ago 2023',
        category: 'Lazer',
        summary: 'A Prefeitura de Queluz anuncia a inauguração do novo Parque Municipal "Verde Vida", prevista para o dia 15 de setembro. O espaço será o maior parque público do município.'
      },
      {
        id: '4',
        title: 'Festival Gastronômico de Queluz acontece neste final de semana',
        image: 'https://via.placeholder.com/400x200',
        date: '02 Ago 2023',
        category: 'Cultura',
        summary: 'O tradicional Festival Gastronômico de Queluz chega à sua 10ª edição neste final de semana, dias 5 e 6 de agosto, na Praça Central da cidade.'
      },
      {
        id: '5',
        title: 'Prefeitura abre inscrições para cursos profissionalizantes gratuitos',
        image: 'https://via.placeholder.com/400x200',
        date: '01 Ago 2023',
        category: 'Educação',
        summary: 'A Prefeitura de Queluz, por meio da Secretaria de Desenvolvimento Econômico, abre a partir desta quinta-feira (3) as inscrições para 500 vagas em cursos profissionalizantes gratuitos.'
      },
      {
        id: '6',
        title: 'Queluz recebe prêmio de cidade mais sustentável da região',
        image: 'https://via.placeholder.com/400x200',
        date: '28 Jul 2023',
        category: 'Meio Ambiente',
        summary: 'O município de Queluz foi reconhecido como a cidade mais sustentável da região no Prêmio Estadual de Sustentabilidade, realizado na capital do estado na última sexta-feira (27).'
      },
      {
        id: '7',
        title: 'Secretaria de Educação promove Feira de Ciências nas escolas municipais',
        image: 'https://via.placeholder.com/400x200',
        date: '25 Jul 2023',
        category: 'Educação',
        summary: 'A Secretaria Municipal de Educação de Queluz promoverá, entre os dias 10 e 14 de agosto, a Feira de Ciências 2023 nas escolas da rede municipal de ensino.'
      },
      {
        id: '8',
        title: 'Prefeitura inicia obras de pavimentação em cinco bairros',
        image: 'https://via.placeholder.com/400x200',
        date: '20 Jul 2023',
        category: 'Infraestrutura',
        summary: 'A Prefeitura de Queluz deu início nesta semana às obras de pavimentação asfáltica em cinco bairros da cidade. O investimento total é de R$ 3,2 milhões.'
      }
    ];
  };

  // Obter categorias únicas para o filtro
  const getCategories = () => {
    const categories = news.map(item => item.category);
    return ['Todas', ...new Set(categories)];
  };

  // Filtrar notícias com base na pesquisa e categoria
  const getFilteredNews = () => {
    return news.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  };

  // Renderizar item de notícia
  const renderNewsItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <View style={styles.newsHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.newsSummary} numberOfLines={2}>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );

  // Renderizar categoria
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && { backgroundColor: colors.primary }
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text 
        style={[
          styles.categoryItemText,
          selectedCategory === item && { color: '#FFF' }
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  // Renderizar o conteúdo principal
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.text, marginTop: 10 }}>Carregando notícias...</Text>
        </View>
      );
    }

    const filteredNews = getFilteredNews();
    
    if (filteredNews.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Feather name="search" size={50} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            Nenhuma notícia encontrada
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Tente mudar os filtros ou termos de pesquisa
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.newsList}
        showsVerticalScrollIndicator={true}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Notícias</Text>
        
        <View style={{ width: 40 }} />
      </View>
      
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar notícias..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Filtro de categorias */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={getCategories()}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      {/* Lista de notícias */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 5,
  },
  categoryItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsList: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  newsItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 180,
  },
  newsContent: {
    padding: 15,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  newsSummary: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});

export default NewsListScreen;
