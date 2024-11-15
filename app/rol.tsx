import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
export default function RoleSelectionScreen() {
  const router = useRouter();  
  const [selectedRole, setSelectedRole] = useState<'owner' | 'walker' | null>(null);
  const { email } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image
          source={require('../assets/images/arrow-icon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Selecciona un rol</Text>
      <View style={styles.rolesContainer}>
        {/* Tarjeta "Soy propietario" */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === 'owner' ? styles.selectedCard : null,
          ]}
          onPress={() => setSelectedRole('owner')}
        >
          <Image source={require('../assets/images/dog-icon.png')} style={styles.icon} />
          <Text style={styles.roleText}>Soy propietario</Text>
          <View style={selectedRole === 'owner' ? styles.switchOn : styles.switchOff} />
        </TouchableOpacity>

        {/* Tarjeta "Soy paseador" */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === 'walker' ? styles.selectedCard : null,
          ]}
          onPress={() => setSelectedRole('walker')}
        >
          <Image source={require('../assets/images/walker-icon.png')} style={styles.icon} />
          <Text style={styles.roleText}>Soy paseador</Text>
          <View style={selectedRole === 'walker' ? styles.switchOn : styles.switchOff} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => router.push({ pathname: '/completeUserData', params: { role: selectedRole, email: email } })}
          >
            <Text style={styles.reserveButtonText}>Siguiente</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  
  title: {
    marginTop: -30,
    marginLeft: 15,
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: '#FEB571',
    marginBottom: 50,
    textAlign: 'center'
  },
  rolesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  roleCard: {
    width: 180,
    height: 300,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 10,
    
  },
  selectedCard: {
    borderColor: '#FEB571',
    borderWidth: 2,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  roleText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 20,
  },
  switchOn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8B5CF6',
  },
  switchOff: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D3D3D3',
  },
  reserveButton: {
    backgroundColor: '#FEB571',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 20,
    marginTop: 40,
    alignSelf: 'center',
  },
  reserveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
});
