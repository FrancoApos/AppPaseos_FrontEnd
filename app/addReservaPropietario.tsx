import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars'; // Nueva librería para el calendario
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReservaPaseoScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDurationPickerVisible, setDurationPickerVisibility] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const mascotas = ['Miky', 'Laika', 'Nala'];
  const screenWidth = Dimensions.get('window').width;

  // Días disponibles y no disponibles (como ejemplo)
  const availableDates = ["2024-11-20", "2024-11-21"];

  const togglePetSelection = (pet: string) => {
    if (selectedPets.includes(pet)) {
      setSelectedPets(selectedPets.filter((p) => p !== pet));
    } else {
      setSelectedPets([...selectedPets, pet]);
    }
  };

  const handleDayPress = (day: any) => {
    const dateString = day.dateString;
    if (availableDates.includes(dateString)) {
      setSelectedDay(day.day + '-' + day.month + '-' + day.year);
      setShowSaveButton(true);
      setShowCalendar(false);
    } else {
      alert('La fecha seleccionada no está disponible.');
    }
  };

  const handleSaveDate = () => {
    if (selectedDay) {
      alert(`Fecha ${selectedDay} guardada correctamente.`);
      setShowSaveButton(false);
    }
  };

  const handleConfirmTime = (time: string) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  const handleConfirmDuration = (duration: string) => {
    setSelectedDuration(duration);
    setShowDurationPicker(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image source={require('../assets/images/arrow-icon.png')} style={styles.backIcon} />
          </TouchableOpacity>

          {/* Estado del proceso de reserva */}
          <View style={styles.statusContainer}>
            <Image source={require('../assets/images/reservas-icon.png')} style={styles.statusIcon} />
            <Image source={require('../assets/images/profile-icon.png')} style={styles.statusIcon} />
            <Image source={require('../assets/images/check-icon.png')} style={styles.statusIcon} />
          </View>

          {/* Título y subtítulo */}
          <Text style={styles.headerTitle}>Selecciona una fecha</Text>
          <Text style={styles.subHeader}>Elige un horario disponible del paseador</Text>

          {/* Container para mostrar la fecha seleccionada */}
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowCalendar(true)}>
            <Text>{selectedDay || 'Día'}</Text>
          </TouchableOpacity>
          {showCalendar && (
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                ...availableDates.reduce((acc, date) => {
                  acc[date] = { selected: true, selectedColor: 'green' };
                  return acc;
                }, {}),
                ...(selectedDay ? { [selectedDay]: { selected: true, selectedColor: 'blue' } } : {}),
              }}
              theme={{
                todayTextColor: 'red',
                arrowColor: '#FEB571',
                monthTextColor: '#4A4A4A',
                textMonthFontFamily: 'Poppins-Bold',
                textDayHeaderFontFamily: 'Poppins-Regular',
                textDayFontFamily: 'Poppins-Regular',
              }}
              minDate={new Date().toISOString().split('T')[0]}
              maxDate={'2024-11-30'}
              style={{ width: screenWidth * 0.9, borderRadius: 10, marginBottom: 20 }}
            />
          )}

          {/* Botón para guardar la fecha seleccionada */}
          {showSaveButton && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveDate}>
              <Text style={styles.saveButtonText}>Guardar fecha</Text>
            </TouchableOpacity>
          )}

          {/* Desplegable para hora */}
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowTimePicker(true)}>
            <Text>{selectedTime || 'Hora'}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <View style={styles.pickerContainer}>
              {['10:00am', '11:00am', '12:00pm'].map((time) => (
                <TouchableOpacity key={time} onPress={() => handleConfirmTime(time)}>
                  <Text style={styles.pickerItem}>{time}</Text>
                </TouchableOpacity>
              ))}
              
            </View>
          )}

          {/* Desplegable para duración */}
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowDurationPicker(true)}>
            <Text>{selectedDuration || 'Duración'}</Text>
          </TouchableOpacity>
          {showDurationPicker && (
            <View style={styles.pickerContainer}>
              {['30 min', '45 min'].map((duration) => (
                <TouchableOpacity key={duration} onPress={() => handleConfirmDuration(duration)}>
                  <Text style={styles.pickerItem}>{duration}</Text>
                </TouchableOpacity>
              ))}
              
            </View>
          )}

          {/* Selección de mascotas */}
          <Text style={styles.petsHeader}>Quién va a dar un paseo?</Text>
          <View style={styles.petsContainer}>
            {mascotas.map((mascota) => (
              <TouchableOpacity
                key={mascota}
                style={[
                  styles.petButton,
                  selectedPets.includes(mascota) ? styles.selectedPetButton : styles.unselectedPetButton,
                ]}
                onPress={() => togglePetSelection(mascota)}
              >
                <Text style={styles.petButtonText}>{mascota}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botón siguiente/confirmar */}
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>{selectedDay && selectedTime && selectedDuration && selectedPets.length ? 'Confirmar reserva' : 'Siguiente'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 70,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    padding: 10,
    zIndex: 2,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: 20,
  },
  statusIcon: {
    width: 24,
    height: 24,
    tintColor: '#FEB571',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 20,
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#4A4A4A',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  pickerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pickerItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  petsHeader: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  petsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  petButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedPetButton: {
    backgroundColor: '#4A4A4A',
  },
  unselectedPetButton: {
    backgroundColor: '#E0E0E0',
  },
  petButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#FEB571',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
});
