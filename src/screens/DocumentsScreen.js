import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  Share
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import Header from '../components/Header';

const DocumentsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  // Categorias de documentos
  const categories = [
    'Todos',
    'Formulários',
    'Leis',
    'Editais',
    'Relatórios',
    'Manuais'
  ];
  
  // Dados de exemplo para documentos
  const documents = [
    {
      id: '1',
      title: 'Formulário de Inscrição para Programas Sociais',
      category: 'Formulários',
      date: '10/01/2023',
      size: '245 KB',
      format: 'PDF',
      url: 'https://exemplo.com/documento1.pdf'
    },
    {
      id: '2',
      title: 'Lei Orgânica do Município',
      category: 'Leis',
      date: '15/03/2022',
      size: '1.2 MB',
      format: 'PDF',
      url: 'https://exemplo.com/documento2.pdf'
    },
    {
      id: '3',
      title: 'Edital de Concurso Público 001/2023',
      category: 'Editais',
      date: '05/05/2023',
      size: '780 KB',
      format: 'PDF',
      url: 'https://exemplo.com/documento3.pdf'
    },
    {
      id: '4',
      title: 'Relatório de Gestão Fiscal - 1º Trimestre 2023',
      category: 'Relatórios',
      date: '20/04/2023',
      size: '1.5 MB',
      format: 'PDF',
      url: 'https://exemplo.com/documento4.pdf'
    },
    {
      id: '5',
      title: 'Manual do Cidadão - Serviços Municipais',
      category: 'Manuais',
      date: '12/02/2023',
      size: '3.7 MB',
      format: 'PDF',
      url: 'https://exemplo.com/documento5.pdf'
    },
    {
      id: '6',
      title: 'Formulário de Solicitação de Alvará',
      category: 'Formulários',
      date: '18/01/2023',
      size: '320 KB',
      format: 'DOCX',
      url: 'https://exemplo.com/documento6.docx'
    },
    {
      id: '7',
      title: 'Lei Municipal nº 2345 - Plano Diretor',
      category: 'Leis',
      date: '30/11/2022',
      size: '2.1 MB',
      format: 'PDF',
      url: 'https://exemplo.com/documento7.pdf'
    },
    {
      id: '8',
      title: 'Edital de Chamamento Público - Cultura',
      category: 'Editais',
      date: '22/06/2023',
      size: '650 KB',
      format: 'PDF',
      url: 'https://exemplo.com/documento8.pdf'
    }
  ];
  
  // Filtrar documentos com base na pesquisa e categoria
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Renderizar item de categoria
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  
  // Função para compartilhar documento
  const shareDocument = (document) => {
    Share.share({
      message: `Confira este documento: ${document.title}\n${document.url}`,
      title: document.title,
    });
  };
  
  // Função para baixar documento (simulada)
  const downloadDocument = (document) => {
    // Em um app real, aqui você implementaria o download do documento
    console.log(`Baixando documento: ${document.title}`);
    alert(`Download iniciado: ${document.title}`);
  };
  
  // Obter ícone com base no formato do documento
  const getFormatIcon = (format) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return 'file-text';
      case 'docx':
      case 'doc':
        return 'file';
      case 'xlsx':
      case 'xls':
        return 'grid';
      case 'pptx':
      case 'ppt':
        return 'layers';
      default:
        return 'file';
    }
  };
  
  // Renderizar item de documento
  const renderDocumentItem = ({ item }) => (
    <View style={styles.documentItem}>
      <View style={styles.documentIconContainer}>
        <Feather name={getFormatIcon(item.format)} size={24} color="#FFF" />
      </View>
      
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{item.title}</Text>
        
        <View style={styles.documentDetails}>
          <Text style={styles.documentCategory}>{item.category}</Text>
          <Text style={styles.documentDate}>{item.date}</Text>
          <View style={styles.formatBadge}>
            <Text style={styles.formatText}>{item.format}</Text>
          </View>
          <Text style={styles.documentSize}>{item.size}</Text>
        </View>
      </View>
      
      <View style={styles.documentActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => downloadDocument(item)}
        >
          <Feather name="download" size={20} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => shareDocument(item)}
        >
          <Feather name="share-2" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <Header 
        navigation={navigation} 
        showTabs={false} 
        showWeather={false} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Documentos</Text>
        
        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar documentos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Categorias */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
        
        {/* Lista de documentos */}
        <FlatList
          data={filteredDocuments}
          renderItem={renderDocumentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.documentsList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum documento encontrado</Text>
          }
        />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedCategoryText: {
    color: '#FFF',
    fontWeight: '500',
  },
  documentsList: {
    paddingBottom: 20,
  },
  documentItem: {
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
  documentIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  documentDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  documentCategory: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: 10,
  },
  documentDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: 10,
  },
  formatBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
  },
  formatText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
  },
  documentSize: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  documentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default DocumentsScreen;