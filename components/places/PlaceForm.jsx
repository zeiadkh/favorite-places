import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/place";
export default function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  async function savePlaceHandler() {
    const placeData = new Place(enteredTitle, pickedLocation, selectedImage)
    await onCreatePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
  label: { fontWeight: "bold", marginBottom: 4, color: Colors.primary500 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
