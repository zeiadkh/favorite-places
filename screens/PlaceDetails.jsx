import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/db";

export function PlaceDetails({ route, navigation }) {
  const [placeLoaded, setPlaceLoaded] = useState();
  console.log(placeLoaded)
  function showOnMapHandler() {navigation.navigate("Map", {lat: placeLoaded.location.lat, lng: placeLoaded.location.lng})}
  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    async function loadPlaceData() {
      const loadPlace = await fetchPlaceDetails(selectedPlaceId);
      setPlaceLoaded(loadPlace);
      navigation.setOptions({title: loadPlace.title})
    }
    loadPlaceData();
  }, [selectedPlaceId]);
  // Add a loading check
  if (!placeLoaded) {
    return (
      <View style={styles.fallback}> 
        <Text>Loading place data...</Text>
      </View>
    );}
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: placeLoaded.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeLoaded.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
fallback: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
