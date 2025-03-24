import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import {Colors} from "../../constants/colors"
export default function PlaceItem({placeData, onSelect}) {
  return (
    <Pressable onPress={onSelect.bind(this, placeData.id)} style={({ pressed }) => [styles.placeItem, pressed && styles.pressed]}>
      <Image source={{ uri: placeData.imageUri }} style={styles.image}/>
      <View style={styles.info}>
        <Text style={styles.title}>{placeData.title}</Text>
        <Text style={styles.address}>{placeData.address}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  pressed: {opacity: 0.9},
  placeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
    width: '100%'
  },
  info: {
    flex: 2,
    padding: 12,
  },
  address: {
    fontSize: 12,
    marginVertical: 2,
    // color: "#777",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.gray700,
  }
});