import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const CameraScreen = ({ navigation }) => {
  const [facing, setFacing] = useState('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] = MediaLibrary.usePermissions();
  const camera = useRef();

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (!camera) return;

    if (!libraryPermission.granted) {
      requestLibraryPermission();
    }

    const image = await camera?.current?.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(image.uri);
    navigation.replace('CreatePost', { photo: image.uri })
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});