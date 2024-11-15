import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, useSegments } from 'expo-router';

const walkers = [
  {
    id: '1',
    name: 'Facundo Martinez',
    distance: '1 km de ti',
    price: '$2500/h',
    rating: '4.1',
    image: require('../assets/images/full-walker1.png'),
  },
  {
    id: '2',
    name: 'Jorge Gutierrez',
    distance: '3 km de ti',
    price: '$3500/h',
    rating: '4.5',
    image: require('../assets/images/walker2.png'),
  },
  {
    id: '3',
    name: 'Sofía Martínez',
    distance: '4 km de ti',
    price: '$4000/h',
    rating: '4.2',
    image: require('../assets/images/walker3.png'),
  },
  {
    id: '4',
    name: 'Trinidad Toledo',
    distance: '5 km de ti',
    price: '$4500/h',
    rating: '4.0',
    image: require('../assets/images/walker4.png'),
  },
];

export default function homePropietario() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('homePropietario');
  const segments = useSegments();
  useEffect(() => {
    const currentSegment = segments[0]; // Obtener el primer segmento de la ruta
    setActiveTab(currentSegment);
  }, [segments]);
  
  const screenWidth = Dimensions.get('window').width;

  const renderWalker = ({ item }: { item: { id: string; name: string; distance: string; price: string; rating: string; image: any } }) => (
    <TouchableOpacity
      style={styles.walkerCard}
      onPress={() => router.push({ pathname: '/walkerDetail', params: { id: item.id } })}
    >
      <Image source={item.image} style={styles.walkerImage} />
      <View style={styles.walkerInfo}>
        <Text style={styles.walkerName}>{item.name}</Text>
        <Text style={styles.walkerDistance}>{item.distance}</Text>
        <Text style={styles.walkerPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Inicio</Text>
      <Text style={styles.subHeader}>Explora paseadores</Text>

      {/* Campo de ubicación */}
      <View style={styles.locationContainer}>
        <Image source={require('../assets/images/location-icon.png')} style={styles.locationIcon} />
        <Text style={styles.locationText}>Córdoba, Argentina</Text>
      </View>

      {/* Lista de paseadores cerca */}
      <Text style={styles.sectionTitle}>Cerca tuyo</Text>
      <FlatList
        data={walkers}
        renderItem={renderWalker}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Lista de sugerencias */}
      <Text style={styles.sectionTitle}>Sugerencias</Text>
      <FlatList
        data={walkers}
        renderItem={renderWalker}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Barra de navegación */}
      <View style={[styles.navigationBar, { width: screenWidth }]}>
        <TouchableOpacity style={styles.navButton} onPress={() => { setActiveTab('homePropietario'); router.push('/homePropietario'); }}>
          <Image
            source={require('../assets/images/home-icon.png')}
            style={[styles.navIcon, activeTab === 'homePropietario' ? styles.activeIcon : styles.inactiveIcon]}
          />
          <Text style={[styles.navLabel, activeTab === 'homePropietario' ? styles.activeText : styles.inactiveText]}>Inicio</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  walkerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 20,
    width: 150,
  },
  walkerImage: {
    width: '100%',
    height: 100,
  },
  walkerInfo: {
    padding: 10,
  },
  walkerName: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
  walkerDistance: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 5,
  },
  walkerPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#FEB571',
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
