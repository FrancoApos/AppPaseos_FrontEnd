import React from 'react';
import {useCallback, useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import {useFonts}  from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import {Poppins_400Regular, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold} from '@expo-google-fonts/poppins'
import * as SplashScreen from 'expo-splash-screen';
export default function WelcomeScreen() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold  
  });

  useEffect( () => {
  async function prepare(){
    await SplashScreen.preventAutoHideAsync();
  }
  prepare();
  }, [])

  const onLayout = useCallback(async()=> {
  if(fontsLoaded){
    await SplashScreen.hideAsync();
  }
  }, [fontsLoaded])

  if(!fontsLoaded) return null;
  return (
    <ImageBackground
      source={require('../assets/images/img1.png')}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.halfOverlay}
      />

      <View style={styles.textContainer} onLayout={onLayout}>

        <Text style={styles.title}>¿Sin tiempo para pasear a tu perro?</Text>
        <Text style={styles.subtitle}>¡Nosotros nos encargamos!</Text>
        <Link href="./rol" style={styles.button}>
        <Text style={styles.buttonText}>Únete a la comunidad</Text>
        </Link>
        <Link href="./sign-in" style={styles.loginText}>
          Ya sos miembro? <Text style={styles.loginLink}>Inicia sesión</Text>
        </Link>

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
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%', // Ajuste para ocupar todo el ancho
    paddingHorizontal: 0,
    paddingBottom: 5,
  },
  title: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: '#FEB571',
    textAlign: 'center', // Puedes cambiar a 'left' si quieres que se alinee a la izquierda
    paddingHorizontal: 0,
    marginBottom:5,
    width: '100%', // Para ocupar todo el ancho del contenedor
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FEB571',
    textAlign: 'center', // Puedes cambiar a 'left' si quieres que se alinee a la izquierda
    paddingHorizontal: 0,
    marginBottom: 10,
    width: '100%', // Para ocupar todo el ancho del contenedor
  },
  button: {
    backgroundColor: '#E19247',
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: '#FCFCFC',
    textAlign: 'center',
  },
  loginText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: '#FCFCFC',
    textAlign: 'center',
  },
  loginLink: {
    color: '#FEB571',
    fontFamily: 'Poppins_500Medium',
  },
  
});
