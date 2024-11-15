import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
export default function SignUpScreen() {
  const router = useRouter(); // Hook para navegar hacia atrás

  return (
    <ImageBackground
      source={require('../assets/images/img2.png')}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.halfOverlay}
      />
      {/* Botón para regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image
          source={require('../assets/images/arrow-icon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Únete ahora</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../assets/images/google_icon.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Regístrate con Google</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  halfOverlay: {
    position: 'absolute',
    bottom: 0,
    height: '50%', // El degradado cubrirá la mitad inferior de la pantalla
    width: '100%',
  },
  
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Poppins_Bold',
    color: '#FEB571',
    textAlign: 'center',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 1,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_Regular',
    color: '#000000',
  },
});
