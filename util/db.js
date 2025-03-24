import * as SQLite from "expo-sqlite";

// Initialize database connection
const database = SQLite.openDatabaseAsync("places.db");


export async function init() {
  try {
    const db = await database;
    const result = await db.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`
    );
    console.log("Database initialized successfully");
    return result;
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}


export async function insertPlace(place) {
  try {
    const db = await database;
    const result = await db.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    console.log("Place inserted successfully with ID:", result.lastInsertRowId);
    return result;
  } catch (error) {
    console.error("Error inserting place:", error);
    throw error;
  }
}


export async function fetchPlaces() {
  try {
    const db = await database;
    const result = await db.getAllAsync(`SELECT * FROM places`);
    
    if (!result || result.length === 0) {
      console.log("No places found in database");
      return [];
    }
    
    // Map database results to place objects
    const places = result.map(item => ({
      id: item.id,
      title: item.title,
      imageUri: item.imageUri,
      address: item.address,
      location: { lat: item.lat, lng: item.lng }
    }));
    
    console.log(`Successfully fetched ${places.length} places`);
    return places;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}


export async function fetchPlaceDetails(id) {
  try {
    const db = await database;
    const result = await db.getFirstAsync(`SELECT * FROM places WHERE id = ?`, [id]);
    
    if (!result) {
      console.log(`No place found with ID: ${id}`);
      return null;
    }
    
    // Convert database result to place object
    const place = {
      id: result.id,
      title: result.title,
      imageUri: result.imageUri,
      address: result.address,
      location: { lat: result.lat, lng: result.lng }
    };
    
    console.log(`Successfully fetched place with ID: ${id}`);
    return place;
  } catch (error) {
    console.error(`Error fetching place with ID ${id}:`, error);
    return null;
  }
}


export async function deletePlace(id) {
  try {
    const db = await database;
    const result = await db.runAsync(`DELETE FROM places WHERE id = ?`, [id]);
    
    console.log(`Place with ID ${id} deleted successfully`);
    return result.changes > 0;
  } catch (error) {
    console.error(`Error deleting place with ID ${id}:`, error);
    return false;
  }
}
