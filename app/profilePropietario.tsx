import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter, useSegments, useLocalSearchParams } from 'expo-router'; 

export default function UserProfileScreen() {
  const [activeTab, setActiveTab] = useState<string>('profilePropietario');
  const segments = useSegments();
  useEffect(() => {
    const currentSegment = segments[0]; // Obtener el primer segmento de la ruta
    setActiveTab(currentSegment);
  }, [segments]);
 
const { name,
  lastName,
  province,
  address,
  phoneNumber,
  profileImage,
  role, email } = useLocalSearchParams();
 
  const router = useRouter();
 // const name = name;
  //const lastName = lastName;
 // const email = 'miemail@gmail.com';
  // const phoneNumber = phoneNumber;
  //const profileImage = require('../assets/images/image-profile.png');
  // const profileImage = profileImage;
 // const role = role;
 // const address = address;
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Iconos de configuración y notificaciones */}
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Image
                source={require('../assets/images/arrow-icon.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Imagen de perfil */}
          <Image source={{ uri: profileImage }} style={styles.profileImage} />

          {/* Nombre y ubicación */}
          <Text style={styles.userName}>{`${name} ${lastName}`}</Text>
          <Text style={styles.location}>{province}, Argentina</Text>

          {/* Botón Editar perfil */}
          <TouchableOpacity style={styles.editProfileButton} onPress={() => router.push('/editProfilePropietario')}>
            <Text style={styles.editProfileButtonText}>Editar perfil</Text>
          </TouchableOpacity>

          {/* Información de contacto */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Mi email:</Text>
            <Text style={styles.infoText}>{email}</Text>
            <Text style={styles.infoLabel}>Mi teléfono:</Text>
            <Text style={styles.infoText}>{phoneNumber}</Text>

            {role === 'owner' ? (
              <TouchableOpacity onPress={() => router.push('/misMascotas')}>
                <Text style={[styles.infoText, styles.clickableText]}>🐶 Mis perros</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.infoText}>⏰ Mis horarios</Text>
            )}
            <Text style={styles.infoLabel}>Mi domicilio:</Text>
            <Text style={styles.infoText}>{address}</Text>
          </View>

          {/* Botón Cerrar sesión */}
          <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/')}>
  <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
</TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.navigationBar, { width: screenWidth }]}>
        <TouchableOpacity style={styles.navButton} onPress={() => { setActiveTab('home'); router.push('/homePropietario'); }}>
          <Image
            source={require('../assets/images/home-icon.png')}
            style={[styles.navIcon, activeTab === 'home' ? styles.activeIcon : styles.inactiveIcon]}
          />
          <Text style={[styles.navLabel, activeTab === 'home' ? styles.activeText : styles.inactiveText]}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => { setActiveTab('reservasPropietario'); router.push('/reservasPropietario'); }}>
          <Image
            source={require('../assets/images/reservas-icon.png')}
            style={[styles.navIcon, activeTab === 'reservasPropietario' ? styles.activeIcon : styles.inactiveIcon]}
          />
          <Text style={[styles.navLabel, activeTab === 'reservasPropietario' ? styles.activeText : styles.inactiveText]}>Reservas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => { setActiveTab('profilePropietario'); router.push('/profilePropietario'); }}>
          <Image
            source={require('../assets/images/profile-icon.png')}
            style={[styles.navIcon, activeTab === 'profilePropietario' ? styles.activeIcon : styles.inactiveIcon]}
          />
          <Text style={[styles.navLabel, activeTab === 'profilePropietario' ? styles.activeText : styles.inactiveText]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between', // Para asegurar que el contenido se distribuya adecuadamente
    paddingBottom: 20, // Ajusta para evitar el deslizamiento más allá del botón "Cerrar sesión"
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 5,
    
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FEB571',
  },
  location: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: '#FEB571',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
  },
  editProfileButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  clickableText: {
    color: '#FEB571',
    marginTop: 10,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#FEB571',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    alignSelf: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
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
  activeIcon: {
    tintColor: '#FEB571',
  },
  inactiveIcon: {
    tintColor: '#A0A0A0',
  },
  navLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  activeText: {
    color: '#FEB571',
  },
  inactiveText: {
    color: '#A0A0A0',
  },
});
