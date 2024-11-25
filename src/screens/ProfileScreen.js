import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'

import { colors } from "../../styles/global";

import Input from "../components/Input";

const ProfileScreen = () => {
  const [userName, setUserName] = useState('')

  const handleImageUpload = async (userId, file, fileName) => {

  };

  const pickImage = async () => {
    
  };

  const onUserNameChange = async () => {
    try {

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <View style={styles.section}>
    <View style={styles.infoContainer}>
      <Text style={styles.title}>Name:</Text>
      <Text>Anonim</Text>
    </View>

    <Input
      value={userName}
      onBlur={onUserNameChange}
      outerStyles={{ width: "60%" }}
      onTextChange={setUserName}
    />

    <View style={styles.infoContainer}>
      <Text style={styles.title}>Email:</Text>
      <Text>Anonim</Text>
    </View>

    <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
      <Ionicons size={32} name="camera" color={colors.orange} />
    </TouchableOpacity>
  </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  infoContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black_primary,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  cameraButton: {
    marginTop: 20,
  },
});
