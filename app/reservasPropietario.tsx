import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRouter, useSegments } from 'expo-router';

export default function MisReservasPropietario() {
  const [activeTab, setActiveTab] = useState<string>('reservasPropietario');
  const segments = useSegments();
  useEffect(() => {
    const currentSegment = segments[0]; // Obtener el primer segmento de la ruta
    setActiveTab(currentSegment);
  }, [segments]);
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const reservas = [
    {
      id: '1',
      title: 'Paseo por la tarde',
      date: '10 Nov.',
      duration: '45min',
      status: 'En curso',
      statusColor: '#FEB571',
      image: require('../assets/images/walker1.png'),
    },
    {
      id: '2',
      title: 'Paseo por la tarde',
      date: '14 Nov.',
      duration: '30min',
      status: 'Pendiente',
      statusColor: '#A0A0A0',
      image: require('../assets/images/walker2.png'),
    },
    {
      id: '3',
      title: 'Paseo por la tarde',
      date: '11 Nov.',
      distance: '3km',
      duration: '45min',
      status: 'Finalizado',
      statusColor: '#00FF00',
      image: require('../assets/images/walker3.png'),
    },
    {
      id: '4',
      title: 'Paseo por la tarde',
      date: '12 Nov.',
      distance: '3km',
      duration: '45min',
      status: 'Finalizado',
      statusColor: '#00FF00',
      image: require('../assets/images/walker1.png'),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Mis reservas</Text>

          {/* Lista de reservas */}
          {reservas.map((reserva) => (
            <TouchableOpacity
              key={reserva.id}
              style={styles.reservaContainer}
              onPress={() => {
                if (reserva.status === 'En curso') {
                  router.push({ pathname: `/detalleReservaMapa1`, params: { id: reserva.id } });
                } else {
                  router.push({ pathname: `/detalleReservaPropietario`, params: { id: reserva.id } });
                }
              }}
            >          
              <Image source={reserva.image} style={styles.reservaImage} />
              <View style={styles.reservaInfoContainer}>
                <Text style={styles.reservaTitle}>{reserva.title}</Text>
                <Text style={styles.reservaDetails}>{reserva.date}. Paseo con duración de {reserva.duration}</Text>
              </View>
              <View style={[styles.statusContainer, { backgroundColor: reserva.statusColor }]}>
                <Text style={styles.statusText}>{reserva.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingBottom: 70,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 20,
  },
  reservaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  reservaImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  reservaInfoContainer: {
    flex: 1,
  },
  reservaTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 5,
    
  },
  reservaDetails: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  statusContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 14,
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
    width: '100%',
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
  activeIcon: {
    tintColor: '#FEB571',
  },
  inactiveIcon: {
    tintColor: '#A0A0A0',
  },
  activeText: {
    color: '#FEB571',
  },
  inactiveText: {
    color: '#A0A0A0',
  },
});
