import { useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";
export default function Map({ navigation, route }) {
  const lat = route.params && route.params.lat
  const lng = route.params && route.params.lng
  const [selectedLocaion, setSelectedLocation] = useState(lat && lng ? { lat, lng } : null);
  const region = {
    latitude: lat || 37.78,
    longitude: lng || -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectLocationHandler(event) {
    if(lat && lng) {return}  // Check if both lat and lng exist from props
    
    const newLat = event.nativeEvent.coordinate.latitude;
    const newLng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: newLat, lng: newLng });
  };
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocaion) {
      Alert.alert(
        "No location picked yet.",
        "You have to pick a location by tapping on the map first!"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocaion.lat,
      pickedLng: selectedLocaion.lng,
    });
  }, [selectedLocaion, navigation]);

  useLayoutEffect(() => {
    if(lat && lng) return
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          icon="save"
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, lng, lat]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocaion && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocaion.lat,
            longitude: selectedLocaion.lng,
          }}
        />
      )}
    </MapView>
  );
}
const styles = StyleSheet.create({ map: { flex: 1 } });
