import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function CompleteUserDatacreen() {
  const router = useRouter(); 
  const [namePet, setNamePet] = useState('');
  const [agePet, setAgePet] = useState('');
  const [weightPet, setWeightPet] = useState('');
  const [breedtPet, setBreedtPet] = useState('');
  const [petImage, SetPetImage] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        SetPetImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const handleSubmit = () => {
    if (!namePet || !agePet || !weightPet || !breedtPet || !petImage) {
      Alert.alert('Error', 'Por favor completa todos los campos antes de continuar.');
      return;
    }
    router.push({
      pathname: '/misMascotas',
      params: {
        namePet,
        agePet,
        weightPet,
        breedtPet,
        petImage,
        role: 'owner' // o 'walker' según la selección del usuario
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image
          source={require('../assets/images/arrow-icon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Completa los datos de tu mascota</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el nombre de tu mascota"
          value={namePet}
          onChangeText={setNamePet}
        />
        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la edad de tu mascota"
          value={agePet}
          onChangeText={setAgePet}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Peso</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el peso de tu mascota"
          value={weightPet}
          onChangeText={setWeightPet}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Raza</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa la raza de tu mascota"
          value={breedtPet}
          onChangeText={setBreedtPet}
          
        />
        <Text style={styles.label}>Foto de tu mascota</Text>
        <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
          {petImage ? (
            <Image source={{ uri: petImage }} style={styles.petImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Image source={require('../assets/images/upload-icon.png')} style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Subí una foto de tu mascota</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FEB571',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  uploadContainer: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#4A4A4A',
  },
  petImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});
