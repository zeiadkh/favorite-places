# 📍 Favorite Places

A mobile app to save and explore your favorite locations, built with React Native and Expo. Users can capture a photo, select a location via map or GPS, and save it with a title. Designed for both Android and iOS.

## 🚀 Features

* Add new favorite places with photo, title, and location
* View a list of saved locations with previews
* View selected place on an interactive map
* Use device camera and geolocation features
* Data stored locally using SQLite

## 🛠️ Tech Stack

* **React Native** (Expo)
* **Expo SQLite**
* **Expo ImagePicker**
* **Expo Location**
* **Google Maps API**
* **React Navigation**

## 📱 Platform Support

* ✅ Android
* ✅ iOS

## 🔧 Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/zeiadkh/favorite-places.git
   cd favorite-places
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run on device:

   ```bash
   npm start
   ```

   Then scan the QR code with **Expo Go** on your phone.

## 📂 Folder Structure

* `/screens` – App screens (AddPlace, AllPlaces, Map, PlaceDetail)
* `/components` – Reusable UI components like PlaceItem, Button
* `/util` – Location, image handling, and SQLite logic
* `/constants` – API keys and reusable configs

## ✨ Future Improvements

* Add categories or tags to organize places
* Enable cloud sync with Firebase or Supabase
* Add search and filtering capabilities

---

Feel free to open issues or submit pull requests to contribute!
