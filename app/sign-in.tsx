  import React from 'react';
  import {useCallback, useEffect} from 'react';
  import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';
  import { useRouter } from 'expo-router';
  import { LinearGradient } from 'expo-linear-gradient';
  import {Poppins_400Regular, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
  import {useFonts}  from 'expo-font';
  import * as WebBrowser from "expo-web-browser";
  import * as Google from "expo-auth-session/providers/google";
  import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
  import {signIn} from "../components/signin";


  export default function SignInScreen() {
    const router = useRouter(); // Hook para navegar hacia atrás

    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold  
    });

    
    if(!fontsLoaded) return null;
    return (
      <ImageBackground
        source={require('../assets/images/img1.png')} // Usa la imagen que prefieras para el fondo
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.halfOverlay}
        />
        
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image
            source={require('../assets/images/arrow-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>¿Damos un paseo?</Text>

          
          <TouchableOpacity style={styles.googleButton} onPress={() => signIn(router)}>
            <Image
              source={require('../assets/images/google_icon.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Inicia sesión con Google</Text>
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
      fontSize: 23,
      fontFamily: 'Poppins_700Bold',
      color: '#FEB571',
      textAlign: 'center',
      paddingHorizontal: 0,
      marginBottom:5,
      width: '100%',
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 8,
      paddingVertical: 0,
      paddingHorizontal: 15,
      marginBottom: 1,
    },
    googleIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    googleButtonText: {
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
      color: '#000000',
    },
  });


