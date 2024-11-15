import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useRouter , useLocalSearchParams } from 'expo-router';

export default function CompleteUserDataScreen() {
  const router = useRouter(); 
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { role } = useLocalSearchParams();
  const { email } = useLocalSearchParams();

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedImageUri = result.assets[0].uri;

        // Guarda la imagen en el directorio local
        const fileName = pickedImageUri.split('/').pop(); // obtener el nombre del archivo
        const localUri = `${FileSystem.documentDirectory}${fileName}`;

        await FileSystem.copyAsync({
          from: pickedImageUri,
          to: localUri,
        });

        setProfileImage(localUri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const handleSubmit = () => {
    if (!name || !lastName || !address || !phoneNumber || !profileImage) {
      Alert.alert('Error', 'Por favor completa todos los campos antes de continuar.');
      return;
    }
    router.push({
      pathname: '/profilePropietario',
      params: {
        name,
        lastName,
        province,
        address,
        phoneNumber,
        profileImage,
        role: role,
        email: email // o 'walker' según la selección del usuario
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
      <Text style={styles.title}>Completa tus datos</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Rol: {role} </Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu apellido"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Ciudad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu ciudad actual"
          value={province}
          onChangeText={setProvince}
        />
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu dirección"
          value={address}
          onChangeText={setAddress}
        />
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu teléfono"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Foto de perfil</Text>
        <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Image source={require('../assets/images/upload-icon.png')} style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Subí tu foto de perfil</Text>
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
  profileImage: {
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
