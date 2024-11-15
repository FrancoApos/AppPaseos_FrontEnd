import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function MisMascotasScreen() {
  const router = useRouter();
  const mascotas = [
    {
      id: '1',
      name: 'Laika',
      age: '3 años',
      weight: '27 kg',
      breed: 'Ovejero alemán',
      image: require('../assets/images/laika.png'),
    },
    {
      id: '2',
      name: 'Miky',
      age: '4 años',
      weight: '7 kg',
      breed: 'Caniche',
      image: require('../assets/images/miky.png'),
    },
    {
      id: '3',
      name: 'Nala',
      age: '1 año',
      weight: '20 kg',
      breed: 'Golden Retriever',
      image: require('../assets/images/nala.png'),
    },
  ];
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image source={require('../assets/images/arrow-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 70 }]}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Mis perros</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addMascota')}>
              <Text style={styles.addButtonText}>Añadir mascota</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de mascotas */}
          {mascotas.map((mascota) => (
            <View key={mascota.id} style={styles.mascotaContainer}>
              <Image source={mascota.image} style={styles.mascotaImage} />
              <Text style={styles.mascotaName}>{mascota.name}</Text>
              <View style={styles.mascotaInfoContainer}>
                <Text style={styles.mascotaInfoLabel}>Edad</Text>
                <Text style={styles.mascotaInfoText}>{mascota.age}</Text>
                <Text style={styles.mascotaInfoLabel}>Peso</Text>
                <Text style={styles.mascotaInfoText}>{mascota.weight}</Text>
                <Text style={styles.mascotaInfoLabel}>Raza</Text>
                <Text style={styles.mascotaInfoText}>{mascota.breed}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Barra de navegación */}
      <View style={[styles.navigationBar, { width: screenWidth }]}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/homePropietario')}>
          <Image source={require('../assets/images/home-icon.png')} style={styles.navIcon} />
          <Text style={styles.navLabel}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/reservasPropietario')}>
          <Image source={require('../assets/images/reservas-icon.png')} style={styles.navIcon} />
          <Text style={styles.navLabel}>Reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/profilePropietario')}>
          <Image source={require('../assets/images/profile-icon.png')} style={styles.navIcon} />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 40, // Adjusted to accommodate the back button
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
  addButton: {
    backgroundColor: '#FEB571',
    height: 45,
    paddingVertical: 7,
    marginLeft: 15,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  mascotaContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  mascotaImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  mascotaName: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
  mascotaInfoContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 5,
  },
  mascotaInfoLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 2,
  },
  mascotaInfoText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
    marginBottom: 5,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
});
