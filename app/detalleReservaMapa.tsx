import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useRouter, useLocalSearchParams } from 'expo-router';


export default function DetalleReservaPropietario() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const id = searchParams.id;

  // Estado para la ubicación en tiempo real del "walker"
  const [walkerLocation, setWalkerLocation] = useState({ latitude: -31.4201, longitude: -64.1888 });
  // Estado para almacenar el trayecto del "walker"
  const [routeCoordinates, setRouteCoordinates] = useState([
    { latitude: -31.4201, longitude: -64.1888 },
  ]);

  useEffect(() => {
    // Solicitar permiso de ubicación
    Geolocation.requestAuthorization();

    // Obtener la ubicación en tiempo real del "walker"
    const watchID = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = { latitude, longitude };

        // Actualizar la ubicación del "walker" y el trayecto
        setWalkerLocation(newPosition);
        setRouteCoordinates((prevCoords) => [...prevCoords, newPosition]);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    // Limpiar el observador al desmontar el componente
    return () => Geolocation.clearWatch(watchID);
  }, []);

  // Ubicación ficticia del perro
  const petLocation = {
    latitude: -31.4255,
    longitude: -64.1905,
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Mapa con el recorrido */}
      <MapView
        style={{ flex: 3 }}
        initialRegion={{
          latitude: walkerLocation.latitude,
          longitude: walkerLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={walkerLocation}>
          <Image source={require('../assets/images/walker1.png')} style={styles.markerIcon} />
        </Marker>
        <Marker coordinate={petLocation}>
          <Image source={require('../assets/images/miky.png')} style={styles.markerIcon} />
        </Marker>
        <Polyline coordinates={routeCoordinates} strokeColor="#00BFFF" strokeWidth={4} />
      </MapView>

      {/* Detalles del paseo */}
      <View style={styles.detailContainer}>
        <Text style={styles.walkerName}>Facundo Martinez</Text>
        <Text style={styles.walkerRating}>⭐ 4.4</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Estado del paseo</Text>
          <Text style={styles.detailValue}>En curso</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hora estimada de llegada</Text>
          <Text style={styles.detailValue}>25 mins</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Precio por hora</Text>
          <Text style={styles.detailValue}>$2500</Text>
        </View>

        {/* Botón de acción */}
        <TouchableOpacity style={styles.actionButton} onPress={() => alert('Ir a pagar')}>
          <Text style={styles.actionButtonText}>Ir a pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  markerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#FEB571',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  walkerName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
  walkerRating: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#4A4A4A',
  },
  actionButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
});
