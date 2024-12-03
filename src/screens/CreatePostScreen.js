import { FC, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as ImagePicker from 'expo-image-picker';

import { colors } from "../../styles/global";

import Button from "../components/Button";
import Input from "../components/Input";
import { useSelector } from "react-redux";
import { addPost, getImageUrl, uploadImage } from "../utils/firestore";

const PLACES_KEY = "YOUR API KEY";

const CreatePostScreen = ({ navigation, route }) => {
  const params = route?.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const user = useSelector((state) => state.user.userInfo);

  const navigateToCameraScreen = () => {
    navigation.navigate('Camera');
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      
      setSelectedImage(uri);
  
      const response = await fetch(uri);
      const file = await response.blob();
      const fileName = uri.split('/').pop(); // Отримуємо ім'я файлу з URI

      const fileType = file.type; // Отримуємо тип файлу
      const imageFile = new File([file], fileName, { type: fileType });

      const uploadedImage = await uploadImage(user.uid, imageFile, fileName);
      setUploadedImage(uploadedImage)
    }
  };

  const onClearData = () => {
    setSelectedImage('');
    setUploadedImage('');
    setTitle('')
    setAddress('');
  }

  useEffect(() => {
    if (!params?.photo) return;

    setSelectedImage(params.photo);
  }, [params]);

  const onPublish = async () => {
    if (!user) return;

    try {
      await addPost(user?.uid, {
        id: Date.now().toString(),
        address,
        image: uploadedImage,
      })      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.section}>
      <View style={styles.imageContainer}>
        <View style={styles.emptyImgContainer}>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
            />
          )}
          
          <TouchableOpacity
            style={styles.cameraIconWrapper}
            onPress={navigateToCameraScreen}
            hitSlop={20}
          >
            <Ionicons
              name="camera"
              size={34}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={pickImage}>
          <Text style={[styles.btnText, styles.grayText]}>
            Завантажте фото
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ flex: 1 }}>
        <Input
          value={title}
          placeholder="Назва..."
          outerStyles={styles.input}
          onTextChange={setTitle}
        />

        <GooglePlacesAutocomplete
          placeholder="Місцевість..."
          minLength={4}
          enablePoweredByContainer={false}
          fetchDetails
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data, details);
            setAddress(data.description);
          }}
          query={{ key: PLACES_KEY }}
          styles={{
            container: {
              flex: 1,
            },
            textInputContainer: {
              flexDirection: 'row',
              paddingHorizontal: 8,
            },
            textInput: {
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 15,
              flex: 1,
              borderBottomWidth: 1,
              borderColor: colors.border_gray
            },
            row: {
              backgroundColor: '#FFFFFF',
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {
              maxHeight: 160,
            }
          }}
        />
      </View>

      <Button onPress={onPublish}>
        <Text style={styles.btnText}>Опублікувати</Text>
      </Button>

      <Button
        buttonStyle={styles.deleteBtn}
        onPress={onClearData}
      >
        <Ionicons
          name="trash"
          color={colors.text_gray}
          size={24}
        />
      </Button>
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    gap: 32,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "400",
    color: colors.white,
    textAlign: "center",
  },
  grayText: {
    textAlign: "left",
    color: colors.text_gray,
  },
  imageContainer: {
    gap: 8,
  },
  emptyImgContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIconWrapper: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: colors.white,
  },
  deleteBtn: {
    position: "absolute",
    left: "46%",
    bottom: "14%",
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light_gray,
  }
});
