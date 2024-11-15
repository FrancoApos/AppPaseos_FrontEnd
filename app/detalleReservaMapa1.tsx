import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function DetalleReservaPropietario() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const id = searchParams.id;

  // Definir tipos adecuados para los estados
  const [walkerLocation, setWalkerLocation] = useState<{ latitude: number; longitude: number }>({ latitude: -31.356317, longitude: -64.212141 });
  const [ownerLocation, setOwnerLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([{ latitude: -31.356317, longitude: -64.212141 }]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de Ubicación Necesario',
            message: 'Esta aplicación necesita acceder a tu ubicación para mostrar el recorrido.',
            buttonNeutral: 'Preguntar más tarde',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Aceptar',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permiso de ubicación denegado');
          return;
        }
      } else {
        Geolocation.requestAuthorization();
      }

      // Obtener la ubicación actual y establecerla como ubicación inicial para el propietario
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const initialPosition = { latitude, longitude };

          // Inicializar la ubicación del propietario con la ubicación actual
          setOwnerLocation(initialPosition);
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );

      // Observar la ubicación del "walker" en tiempo real
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
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
    style={[styles.backButton, { position: 'absolute', top: 10, left: 5, zIndex: 1 }]}
    onPress={() => router.back()}
  >
    <Image
          source={require('../assets/images/arrow-icon.png')}
          style={styles.backIcon}
        />
  </TouchableOpacity>

      {ownerLocation && (
        <MapView style={{ flex: 1 }}
        
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: ownerLocation.latitude,
            longitude: ownerLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          
          {walkerLocation && (
            <Marker coordinate={walkerLocation}>
              <Image source={require('../assets/images/walker1.png')} style={styles.markerIcon} />
            </Marker>
          )}
          {ownerLocation && (
            <Marker coordinate={ownerLocation}>
              <Image source={require('../assets/images/miky.png')} style={styles.markerIcon} />
            </Marker>
          )}
          {routeCoordinates.length > 1 && (
            <Polyline coordinates={routeCoordinates} strokeColor="#00BFFF" strokeWidth={4} />
          )}
        </MapView>
      )}

      {/* Detalles del paseo */}
      <View style={[styles.detailContainer, { position: 'absolute', bottom: 0, left: 0, right: 0 }]}>
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

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#FEB571',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
    margin: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
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
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
  detailValue: {
    fontSize: 14,
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
  backIcon: {
    width: 20,
    height: 20,
  },
});
