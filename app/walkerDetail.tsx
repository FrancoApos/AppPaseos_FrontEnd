import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WalkerDetailScreen() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const id = searchParams.id;

  // Datos de muestra de los paseadores
  const paseadores = [
    {
      id: '1',
      name: 'Facundo Martinez',
      price: '2500$/hr',
      distance: '1 km',
      rating: '4.4',
      walks: '45 paseos',
      age: '30 años',
      experience: '3 meses',
      description: 'Facu ama a los perros desde chico. Actualmente es estudiante de veterinaria. Le gusta compartir tiempo con los animales. Tiene mucha experiencia en el cuidado y manejo de perros, y siempre está dispuesto a ayudar a los propietarios.',
      image: require('../assets/images/full-walker1.png'),
    },
    {
      id: '2',
      name: 'Jorge Gutierrez',
    distance: '3 km de ti',
    price: '$3500/h',
    rating: '4.5',
      walks: '45 paseos',
      age: '30 años',
      experience: '3 meses',
      description: 'Jorge ama a los perros desde chico. Actualmente es estudiante de veterinaria. Le gusta compartir tiempo con los animales. Tiene mucha experiencia en el cuidado y manejo de perros, y siempre está dispuesto a ayudar a los propietarios.',
      image: require('../assets/images/walker2.png'),
    },
    {
      id: '3',
      name: 'Sofía Martínez',
      distance: '4 km de ti',
      price: '$4000/h',
      rating: '4.2',
      walks: '45 paseos',
      age: '30 años',
      experience: '3 meses',
      description: 'Sofía ama a los perros desde chico. Actualmente es estudiante de veterinaria. Le gusta compartir tiempo con los animales. Tiene mucha experiencia en el cuidado y manejo de perros, y siempre está dispuesto a ayudar a los propietarios.',
      image: require('../assets/images/walker3.png'),
    },
    {
      id: '4',
      name: 'Trinidad Toledo',
      distance: '5 km de ti',
      price: '$4500/h',
      rating: '4.0',
      walks: '45 paseos',
      age: '30 años',
      experience: '3 meses',
      description: 'Trinidad ama a los perros desde chico. Actualmente es estudiante de veterinaria. Le gusta compartir tiempo con los animales. Tiene mucha experiencia en el cuidado y manejo de perros, y siempre está dispuesto a ayudar a los propietarios.',
      image: require('../assets/images/walker4.png'),
    },
    // Puedes añadir más paseadores aquí
  ];

  const paseador = paseadores.find((p) => p.id === id);

  if (!paseador) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Paseador no encontrado</Text>
      </View>
    );
  }

  const [selectedTab, setSelectedTab] = useState<'about' | 'reviews'>('about');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.navigate('/homePropietario')}>
        <Image source={require('../assets/images/close-icon.png')} style={styles.closeIcon} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Imagen del paseador */}
          <Image source={paseador.image} style={styles.walkerImage} />

          {/* Información del paseador */}
          <View style={styles.infoContainer}>
            <Text style={styles.walkerName}>{paseador.name}</Text>
            <View style={styles.walkerDetailsRow}>
              <Text style={styles.walkerPrice}>{paseador.price}</Text>
              <Text style={styles.walkerDistance}>{paseador.distance}</Text>
              <Text style={styles.walkerRating}>{paseador.rating} ⭐</Text>
              <Text style={styles.walkerWalks}>{paseador.walks}</Text>
            </View>

            {/* Tabs "Acerca de mí" y "Reseñas" */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'about' && styles.selectedTabButton]}
                onPress={() => setSelectedTab('about')}
              >
                <Text style={[styles.tabText, selectedTab === 'about' && styles.selectedTabText]}>Acerca de mí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'reviews' && styles.selectedTabButton]}
                onPress={() => setSelectedTab('reviews')}
              >
                <Text style={[styles.tabText, selectedTab === 'reviews' && styles.selectedTabText]}>Reseñas</Text>
              </TouchableOpacity>
            </View>

            {/* Contenido según la pestaña seleccionada */}
            {selectedTab === 'about' ? (
              <View style={styles.aboutContainer}>
                <View style={styles.aboutRow}>
                  <View style={styles.aboutItem}>
                    <Text style={styles.aboutLabel}>Edad</Text>
                    <Text style={styles.aboutText}>{paseador.age}</Text>
                  </View>
                  <View style={styles.aboutItem}>
                    <Text style={styles.aboutLabel}>Experiencia</Text>
                    <Text style={styles.aboutText}>{paseador.experience}</Text>
                  </View>
                </View>
                <Text style={styles.aboutDescription} numberOfLines={isDescriptionExpanded ? undefined : 3}>{paseador.description}</Text>
                <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                  <Text style={styles.readMore}>{isDescriptionExpanded ? 'Leer menos' : 'Leer más'}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.reviewsContainer}>
                <Text style={styles.reviewsText}>Aquí se mostrarán las reseñas de los propietarios...</Text>
              </View>
            )}
          </View>

          {/* Botón para reservar */}
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => router.push({ pathname: '/addReservaPropietario', params: { id } })}
          >
            <Text style={styles.reserveButtonText}>Reservar un paseo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  closeIcon: {
    width: 38,
    height: 37,
  },
  walkerImage: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  infoContainer: {
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: '#FFFFFF',
  },
  walkerName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 10,
  },
  walkerDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  walkerPrice: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#FEB571',
  },
  walkerDistance: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
  },
  walkerRating: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
  },
  walkerWalks: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A4A4A',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  selectedTabText: {
    color: '#4A4A4A',
  },
  aboutContainer: {
    paddingHorizontal: 20,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  aboutItem: {
    width: '45%',
  },
  aboutLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
  aboutText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
  },
  aboutDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  readMore: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#FEB571',
    marginTop: 5,
  },
  reviewsContainer: {
    alignItems: 'center',
    padding: 20,
  },
  reviewsText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  reserveButton: {
    backgroundColor: '#FEB571',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 20,
    alignSelf: 'center',
  },
  reserveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
});
