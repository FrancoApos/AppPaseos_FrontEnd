import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function DetalleReservaPropietario() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const reservas = [
    {
        id: '1',
        paseador: {
          nombre: 'Facundo Martinez',
          precioPorHora: 2500,
          distancia: '1 km',
          rating: 4.4,
          paseos: 45,
          imagen: require('../assets/images/walker1.png'),
        },
        estado: 'En curso',
        detalles: {
          precioPorHora: '$2500',
          duracion: '-',
          distancia: '-',
          total: '-',
        },
      },
    
    {
      id: '2',
      paseador: {
        nombre: 'Facundo Martinez',
        precioPorHora: 2500,
        distancia: '1 km',
        rating: 4.4,
        paseos: 45,
        imagen: require('../assets/images/walker2.png'),
      },
      estado: 'Pendiente',
      detalles: {
        precioPorHora: '$2500',
        duracion: '45 mins',
        distancia: '-',
        total: '-',
      },
    },
    {
        id: '3',
        paseador: {
          nombre: 'Facundo Martinez',
          precioPorHora: 2500,
          distancia: '1 km',
          rating: 4.4,
          paseos: 45,
          imagen: require('../assets/images/walker1.png'),
        },
        estado: 'Completado',
        detalles: {
          precioPorHora: '$2500',
          duracion: '45 mins',
          distancia: '3 km',
          total: '$1875',
        },
      },
  ];

  const reserva = reservas.find((reserva) => reserva.id === id);

  if (!reserva) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Reserva no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <Image source={require('../assets/images/close-icon.png')} style={styles.closeIcon} />
          </TouchableOpacity>

          {/* Imagen del paseador */}
          <Image source={reserva.paseador.imagen} style={styles.paseadorImage} />

          {/* Información del paseador */}
          <Text style={styles.paseadorName}>{reserva.paseador.nombre}</Text>
          <View style={styles.paseadorInfoContainer}>
            <Text style={styles.paseadorInfo}>{reserva.paseador.precioPorHora}$ / hr</Text>
            <Text style={styles.paseadorInfo}>| {reserva.paseador.distancia}</Text>
            <Text style={styles.paseadorInfo}>| {reserva.paseador.rating} ⭐</Text>
            <Text style={styles.paseadorInfo}>| {reserva.paseador.paseos} paseos</Text>
          </View>

          {/* Detalles del paseo */}
          <Text style={styles.headerTitle}>Detalles del paseo</Text>
          <View style={styles.detallesContainer}>
            <Text style={styles.detalleText}>Estado del paseo: {reserva.estado}</Text>
            <Text style={styles.detalleText}>Precio por hora: {reserva.detalles.precioPorHora}</Text>
            <Text style={styles.detalleText}>Duración del paseo: {reserva.detalles.duracion}</Text>
            <Text style={styles.detalleText}>Distancia del paseo: {reserva.detalles.distancia}</Text>
            <Text style={styles.detalleText}>Total abonado: {reserva.detalles.total}</Text>
          </View>

          {/* Botón de acción */}
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{reserva.estado === 'Pendiente' ? 'Cancelar' : 'Reagendar'}</Text>
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
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    padding: 10,
    zIndex: 2,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  paseadorImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  paseadorName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  paseadorInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paseadorInfo: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginHorizontal: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  detallesContainer: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  detalleText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
    marginBottom: 5,
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#FEB571',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
});
