import { Image, View, Text, Pressable } from "react-native";

export default function PlaceItem({placeData, onSelect}) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: placeData.imageUri }} />
      <View>
        <Text>{placeData.title}</Text>
        <Text>{placeData.address}</Text>
      </View>
    </Pressable>
  );
}
