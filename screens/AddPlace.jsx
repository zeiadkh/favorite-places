import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/db";

export default function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    // console.log(place)
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
