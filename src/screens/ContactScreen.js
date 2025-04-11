import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import Header from '../components/Header';

const ContactScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  
  // Departamentos disponíveis
  const departments = [
    { id: '1', name: 'Ouvidoria', icon: 'message-circle' },
    { id: '2', name: 'Secretaria de Saúde', icon: 'heart' },
    { id: '3', name: 'Secretaria de Educação', icon: 'book' },
    { id: '4', name: 'Secretaria de Obras', icon: 'tool' },
    { id: '5', name: 'Secretaria de Assistência Social', icon: 'users' },
    { id: '6', name: 'Gabinete do Prefeito', icon: 'briefcase' }
  ];
  
  // Validar formulário
  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu nome.');
      return false;
    }
    
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu e-mail.');
      return false;
    }
    
    if (!selectedDepartment) {
      Alert.alert('Erro', 'Por favor, selecione um departamento.');
      return false;
    }
    
    if (!subject.trim()) {
      Alert.alert('Erro', 'Por favor, informe o assunto.');
      return false;
    }
    
    if (!message.trim()) {
      Alert.alert('Erro', 'Por favor, escreva sua mensagem.');
      return false;
    }
    
    return true;
  };
  
  // Enviar formulário
  const handleSubmit = () => {
    if (validateForm()) {
      // Em um app real, aqui você enviaria os dados para um servidor
      console.log({
        name,
        email,
        phone,
        department: selectedDepartment,
        subject,
        message
      });
      
      Alert.alert(
        'Mensagem Enviada',
        'Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Limpar formulário
              setName('');
              setEmail('');
              setPhone('');
              setSubject('');
              setMessage('');
              setSelectedDepartment(null);
            } 
          }
        ]
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <Header 
        navigation={navigation} 
        showTabs={false} 
        showWeather={false} 
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Fale Conosco</Text>
        <Text style={styles.subtitle}>
          Envie sua mensagem, dúvida ou sugestão para a Prefeitura de Queluz.
        </Text>
        
        {/* Formulário de contato */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome completo *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome completo"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Digite seu telefone"
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Departamento *</Text>
            <View style={styles.departmentsContainer}>
              {departments.map((dept) => (
                <TouchableOpacity
                  key={dept.id}
                  style={[
                    styles.departmentItem,
                    selectedDepartment?.id === dept.id && styles.selectedDepartmentItem
                  ]}
                  onPress={() => setSelectedDepartment(dept)}
                >
                  <Feather
                    name={dept.icon}
                    size={20}
                    color={selectedDepartment?.id === dept.id ? '#FFF' : colors.text}
                  />
                  <Text
                    style={[
                      styles.departmentText,
                      selectedDepartment?.id === dept.id && styles.selectedDepartmentText
                    ]}
                  >
                    {dept.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Assunto *</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              placeholder="Digite o assunto"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mensagem *</Text>
            <TextInput
              style={styles.textArea}
              value={message}
              onChangeText={setMessage}
              placeholder="Digite sua mensagem"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Enviar Mensagem</Text>
          </TouchableOpacity>
        </View>
        
        {/* Informações de contato */}
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactInfoTitle}>Outras formas de contato</Text>
          
          <View style={styles.contactInfoItem}>
            <Feather name="phone" size={20} color={colors.primary} />
            <Text style={styles.contactInfoText}>(12) 3456-7890</Text>
          </View>
          
          <View style={styles.contactInfoItem}>
            <Feather name="mail" size={20} color={colors.primary} />
            <Text style={styles.contactInfoText}>contato@queluz.sp.gov.br</Text>
          </View>
          
          <View style={styles.contactInfoItem}>
            <Feather name="map-pin" size={20} color={colors.primary} />
            <Text style={styles.contactInfoText}>Rua Principal, 123 - Centro, Queluz/SP</Text>
          </View>
          
          <View style={styles.contactInfoItem}>
            <Feather name="clock" size={20} color={colors.primary} />
            <Text style={styles.contactInfoText}>Segunda a Sexta: 8h às 17h</Text>
          </View>
        </View>
        
        {/* Espaço adicional no final */}
        <View style={{ height: 20 }} />
      </ScrollView>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    height: 120,
  },
  departmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  departmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedDepartmentItem: {
    backgroundColor: colors.primary,
  },
  departmentText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 5,
  },
  selectedDepartmentText: {
    color: '#FFF',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactInfoText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
  },
});

export default ContactScreen;