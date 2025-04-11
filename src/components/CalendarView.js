import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';

const CalendarView = ({ selectedDate, onDateSelect, events }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  // Obter dias do mês atual
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Obter o primeiro dia da semana do mês
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Verificar se uma data tem eventos
  const hasEvents = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return events.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Verificar se uma data é a data selecionada
  const isSelectedDate = (day) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };
  
  // Verificar se uma data é hoje
  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };
  
  // Navegar para o mês anterior
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navegar para o próximo mês
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Renderizar o calendário
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    
    const days = [];
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    // Renderizar dias da semana
    const weekDaysRow = (
      <View style={styles.weekDaysRow} key="weekdays">
        {weekDays.map((day, index) => (
          <View style={styles.weekDay} key={index}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
    );
    
    days.push(weekDaysRow);
    
    // Renderizar dias do mês
    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
          // Espaço vazio
          week.push(<View style={styles.dayContainer} key={`empty-${i}-${j}`} />);
        } else {
          const day = dayCounter;
          const hasEventsForDay = hasEvents(day);
          const isSelected = isSelectedDate(day);
          const isTodayDate = isToday(day);
          
          week.push(
            <TouchableOpacity
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDayContainer,
                isTodayDate && styles.todayContainer
              ]}
              key={day}
              onPress={() => onDateSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
            >
              <Text style={[
                styles.dayText,
                isSelected && styles.selectedDayText,
                isTodayDate && styles.todayText
              ]}>
                {day}
              </Text>
              {hasEventsForDay && <View style={styles.eventDot} />}
            </TouchableOpacity>
          );
          
          dayCounter++;
        }
      }
      
      days.push(
        <View style={styles.weekRow} key={`week-${i}`}>
          {week}
        </View>
      );
      
      if (dayCounter > daysInMonth) {
        break;
      }
    }
    
    return days;
  };
  
  // Obter nome do mês
  const getMonthName = (month) => {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return monthNames[month];
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={styles.navigationButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthYearText}>
          {getMonthName(currentMonth.getMonth())} {currentMonth.getFullYear()}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.navigationButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.calendar}>
        {renderCalendar()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  navigationButton: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
    padding: 5,
  },
  calendar: {
    marginBottom: 10,
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dayContainer: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  selectedDayContainer: {
    backgroundColor: colors.primary,
  },
  todayContainer: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dayText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedDayText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  todayText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent3,
    marginTop: 2,
  },
});

export default CalendarView;