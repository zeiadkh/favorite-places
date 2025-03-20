import { useState } from "react";
import { View, StyleSheet, Alert, Image, Text } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { getMapPreview } from "../../util/location";
export default function LocationPicker() {
  const [location, setLocation] = useState();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  async function verifyPermissions() {
    const locationPermission = await requestForegroundPermissionsAsync();
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestPermission();
      return permission.granted;
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app"
      );
      return false;
    }
    return true;
    // const location = await getCurrentPositionAsync({})
    // setLocation(location)
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const location = await getCurrentPositionAsync({});
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    console.log(location);
  }
  function pickOnMapHandler() {}
  let pickedLocation = <Text>No Locations Picked Yet.</Text>;
  if (location)
   pickedLocation = (
      <Image
        source={{ uri: getMapPreview(location.lat, location.lng) }}
        style={styles.image}
      />
    );

  return (
    <View>
      <View style={styles.mapPreview}>{pickedLocation}</View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
});
