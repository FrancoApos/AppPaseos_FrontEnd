//import * as React from 'react';
import React, {useCallback, useEffect, useState} from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import {useFonts}  from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './app/index'; // Ajusta según la ubicación correcta
import SignUpScreen from './app/sign-up'; // Ajusta según la ubicación correcta
import SignInScreen from './app/sign-in'; UserProfileScreen
import CompleteUserDatacreen from './app/completeUserData';  
import UserProfileScreen from './app/profilePropietario'; 
import homePropietario from './app/homePropietario';
import MisReservasPropietario from './app/reservasPropietario';
import WalkerDetailScreen from './app/walkerDetail';
import DetalleReservaPropietario from './app/detalleReservaPropietario';
import RoleSelectionScreen from './app/rol'; // Ajusta según la ubicación correcta
import * as SplashScreen from 'expo-splash-screen';
import {Poppins_400Regular, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold} from '@expo-google-fonts/poppins'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

GoogleSignin.configure({
  webClientId: '77754861461-ut8iohijehf4racsc1tnr0hqi5srrcgl.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});




export default function App() {
  
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
    <View onLayout={onLayout}>
        <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="CompleteUserDatacreen" component={CompleteUserDatacreen} />
          <Stack.Screen name="UserProfileDetailScreen" component={UserProfileScreen} />
          <Stack.Screen name="homePropietario" component={homePropietario} />
          <Stack.Screen name="WalkerDetailScreen" component={WalkerDetailScreen} />
          <Stack.Screen name="MisReservasPropietario" component={MisReservasPropietario} />
          <Stack.Screen name="DetalleReservaPropietario" component={DetalleReservaPropietario} />
          <Stack.Screen name="SignIn" component={SignInScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    
  );
}
