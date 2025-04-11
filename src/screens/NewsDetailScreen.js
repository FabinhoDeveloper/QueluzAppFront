import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Share,
  SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Cores fixas para substituir o ThemeContext
const colors = {
  primary: '#1E88E5',
  primaryLight: '#E3F2FD',
  background: '#F5F5F5',
  text: '#333333',
  textSecondary: '#757575'
};

const NewsDetailScreen = ({ route, navigation }) => {
  const { newsId } = route.params;
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    // Em um app real, você buscaria os dados da notícia de uma API
    // Aqui estamos simulando com dados estáticos
    const fetchNewsDetail = () => {
      // Simular carregamento
      setTimeout(() => {
        const newsDetail = getNewsById(newsId);
        setNews(newsDetail);
        
        // Buscar notícias relacionadas
        if (newsDetail) {
          const related = getRelatedNews(newsDetail.category, newsId);
          setRelatedNews(related);
        }
        
        setLoading(false);
      }, 500);
    };

    fetchNewsDetail();
  }, [newsId]);

  // Função para obter detalhes da notícia pelo ID
  const getNewsById = (id) => {
    // Dados simulados - em um app real, você buscaria do backend
    const allNews = [
      {
        id: '1',
        title: 'SESC-SP visita Diretoria de Esportes para lançamento do Dia do Desafio',
        image: 'https://via.placeholder.com/800x400',
        date: '27 Mar 2025',
        category: 'Esporte',
        author: 'Secretaria de Esportes',
        content: `
          <p>A Prefeitura de Queluz, por meio da Diretoria de Esportes, recebeu na última terça-feira (26) a visita de representantes do SESC-SP para discutir o lançamento do Dia do Desafio 2025.</p>
          
          <p>O Dia do Desafio é uma campanha mundial de incentivo à prática regular de atividades físicas em benefício da saúde. Realizado anualmente na última quarta-feira do mês de maio, o evento mobiliza milhões de pessoas em uma competição amigável entre cidades do mesmo porte.</p>
          
          <p>Durante a reunião, foram discutidas estratégias para aumentar a participação da população queluzense no evento, que acontecerá no dia 28 de maio. A proposta é que cada cidadão realize pelo menos 15 minutos contínuos de atividade física neste dia, registrando sua participação nos pontos de controle que serão espalhados pela cidade.</p>
          
          <p>"Estamos muito animados com esta parceria com o SESC-SP. O Dia do Desafio é uma oportunidade única para promovermos a importância da atividade física e do esporte como ferramentas de saúde e bem-estar", destacou o Diretor de Esportes, João Silva.</p>
          
          <p>Entre as atividades previstas para o Dia do Desafio em Queluz estão caminhadas, corridas, aulas de dança, jogos esportivos nas escolas, atividades para a terceira idade e muito mais.</p>
          
          <p>A Prefeitura convida toda a população a participar deste grande evento. Mais informações serão divulgadas nas próximas semanas através dos canais oficiais da Prefeitura.</p>
        `,
        tags: ['esporte', 'saúde', 'evento', 'SESC']
      },
      {
        id: '2',
        title: 'Campanha de vacinação contra gripe começa na próxima semana',
        image: 'https://via.placeholder.com/800x400',
        date: '08 Ago 2023',
        category: 'Saúde',
        author: 'Secretaria de Saúde',
        content: `
          <p>A Secretaria Municipal de Saúde de Queluz anuncia o início da Campanha de Vacinação contra a Gripe, que começará na próxima segunda-feira (15) e seguirá até o dia 30 de agosto em todas as Unidades Básicas de Saúde (UBS) do município.</p>
          
          <p>A campanha tem como objetivo imunizar os grupos prioritários, que incluem idosos acima de 60 anos, crianças de 6 meses a menores de 6 anos, gestantes, puérperas (até 45 dias após o parto), profissionais de saúde, professores das redes pública e privada, pessoas com doenças crônicas não transmissíveis e outras condições clínicas especiais.</p>
          
          <p>A vacina oferecida pelo Sistema Único de Saúde (SUS) protege contra os três subtipos do vírus da gripe que mais circularam no último ano no Hemisfério Sul, conforme determinação da Organização Mundial da Saúde (OMS).</p>
          
          <p>"É fundamental que as pessoas dos grupos prioritários procurem os postos de vacinação. A gripe pode evoluir para casos graves e até mesmo levar a óbito, especialmente nos grupos de maior risco", alerta a Secretária Municipal de Saúde, Dra. Maria Oliveira.</p>
          
          <p>Para receber a vacina, é necessário apresentar documento de identidade, cartão do SUS e, se possível, a caderneta de vacinação. As UBS funcionarão em horário estendido durante a campanha, das 8h às 19h, para facilitar o acesso da população.</p>
          
          <p>A Secretaria de Saúde reforça que a vacina contra a gripe é segura e representa uma das medidas mais eficazes para prevenir a doença e suas complicações.</p>
        `,
        tags: ['saúde', 'vacinação', 'gripe', 'prevenção']
      },
      // Outros itens de notícias...
    ];

    return allNews.find(item => item.id === id) || null;
  };

  // Função para obter notícias relacionadas
  const getRelatedNews = (category, currentId) => {
    // Dados simulados - em um app real, você buscaria do backend
    const allNews = [
      {
        id: '1',
        title: 'SESC-SP visita Diretoria de Esportes para lançamento do Dia do Desafio',
        image: 'https://via.placeholder.com/400x200',
        date: '27 Mar 2025',
        category: 'Esporte'
      },
      {
        id: '2',
        title: 'Campanha de vacinação contra gripe começa na próxima semana',
        image: 'https://via.placeholder.com/400x200',
        date: '08 Ago 2023',
        category: 'Saúde'
      },
      // Outros itens de notícias relacionadas...
    ];

    // Filtrar notícias da mesma categoria, excluindo a atual
    return allNews
      .filter(item => item.category === category && item.id !== currentId)
      .slice(0, 3);
  };

  // Função para compartilhar a notícia
  const shareNews = async () => {
    if (!news) return;
    
    try {
      await Share.share({
        message: `${news.title} - Leia mais no aplicativo Queluz+`,
        url: `https://queluz.sp.gov.br/noticias/${newsId}`, // URL fictícia
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  // Função para renderizar o conteúdo HTML da notícia
  const renderContent = (htmlContent) => {
    // Em um app real, você usaria um componente como react-native-render-html
    // Aqui estamos simplificando e apenas dividindo por parágrafos
    if (!htmlContent) return null;
    
    const paragraphs = htmlContent
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '||')
      .split('||')
      .filter(p => p.trim().length > 0);
    
    return paragraphs.map((paragraph, index) => (
      <Text key={index} style={[styles.paragraph, { color: colors.text }]}>
        {paragraph.trim()}
      </Text>
    ));
  };

  // Renderizar item de notícia relacionada
  const renderRelatedNewsItem = (item) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.relatedNewsItem}
      onPress={() => {
        // Navegar para a mesma tela, mas com ID diferente
        navigation.push('NewsDetail', { newsId: item.id });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.relatedNewsImage} />
      <View style={styles.relatedNewsContent}>
        <Text style={styles.relatedNewsCategory}>{item.category}</Text>
        <Text style={styles.relatedNewsTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.relatedNewsDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Text style={{ color: colors.text }}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (!news) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Text style={{ color: colors.text }}>Notícia não encontrada</Text>
        <TouchableOpacity 
          style={[styles.backButtonAlt, { backgroundColor: colors.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#FFF' }}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={true}
      >
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle} numberOfLines={1}>Notícia</Text>
        
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={shareNews}
        >
          <Feather name="share-2" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      
      {/* Conteúdo principal com ScrollView */}
      
        
        {/* Imagem principal */}
        <Image source={{ uri: news.image }} style={styles.mainImage} />
        
        {/* Categoria e data */}
        <View style={styles.metaContainer}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.categoryText}>{news.category}</Text>
          </View>
          <Text style={[styles.date, { color: colors.textSecondary }]}>{news.date}</Text>
        </View>
        
        {/* Título */}
        <Text style={[styles.title, { color: colors.text }]}>{news.title}</Text>
        
        {/* Autor */}
        <Text style={[styles.author, { color: colors.textSecondary }]}>
          Por {news.author}
        </Text>
        
        {/* Conteúdo */}
        <View style={styles.contentBody}>
          {renderContent(news.content)}
        </View>
        
        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <Text style={[styles.tagsTitle, { color: colors.text }]}>Tags:</Text>
            <View style={styles.tagsList}>
              {news.tags.map((tag, index) => (
                <View 
                  key={index} 
                  style={[styles.tagBadge, { backgroundColor: colors.primaryLight }]}
                >
                  <Text style={[styles.tagText, { color: colors.primary }]}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {/* Notícias relacionadas */}
        {relatedNews.length > 0 && (
          <View style={styles.relatedNewsSection}>
            <Text style={[styles.relatedNewsTitle, { color: colors.text }]}>
              Notícias Relacionadas
            </Text>
            
            <View style={styles.relatedNewsList}>
              {relatedNews.map(item => renderRelatedNewsItem(item))}
            </View>
          </View>
        )}
        
        {/* Espaço adicional no final */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  backButtonAlt: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  author: {
    fontSize: 14,
    marginTop: 5,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  contentBody: {
    paddingHorizontal: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  tagsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  relatedNewsSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  relatedNewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  relatedNewsList: {
  },
  relatedNewsItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  relatedNewsImage: {
    width: 100,
    height: 100,
  },
  relatedNewsContent: {
    flex: 1,
    padding: 10,
  },
  relatedNewsCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  relatedNewsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  relatedNewsDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default NewsDetailScreen;