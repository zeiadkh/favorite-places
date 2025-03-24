import PlacesList from "../components/places/PlacesList";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/db";

export default function AllPlaces() {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  useEffect(() => {
    async function loadPlaces() {
        try {
          if (isFocused) {
            const fetchedPlaces = await fetchPlaces();
            
            // Simply replace the state with the fetched places
            setLoadedPlaces(fetchedPlaces || []);
          }
        } catch (error) {
          console.error("Error loading places in component:", error);
          setLoadedPlaces([]);
        }
      }
    loadPlaces();
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
}
