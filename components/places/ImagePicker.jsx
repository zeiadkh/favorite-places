// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { View, Alert, Image, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";
export default function ImagePicker({ onTakeImage }) {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [imageTaken, setImageTaken] = useState();
  async function verifyPermissions() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImageTaken(image);
    onTakeImage(image.assets[0].uri);
  }
  let imagePreview = <Text>No image taken yet.</Text>;
  return (
    <View>
      <View style={styles.imagePreview}>
        {imageTaken ? (
          <Image
            source={{ uri: imageTaken.assets[0].uri }}
            style={styles.image}
          />
        ) : (
          imagePreview
        )}
      </View>
      <OutlinedButton onPress={takeImageHandler} icon={'camera'}>Take a photo</OutlinedButton>
    </View>
  );
}
const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: { width: "100%", height: "100%", borderRadius: 4, overflow: 'hidden' },
});
