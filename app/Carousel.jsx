import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import RestaurantCard from "./RestaurantCard";
import { updateDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseCofing";

const RestaurantCarousel = ({
  count,
  typeFilter,
  location,
  onPressRestaurant,
}) => {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      let restaurantsQuery = collection(db, "restaurant");

      if (location) {
        restaurantsQuery = query(
          restaurantsQuery,
          where("location", "==", location)
        );
      }

      if (typeFilter) {
        restaurantsQuery = query(
          restaurantsQuery,
          where("type", "array-contains", typeFilter)
        );
      }

      const querySnapshot = await getDocs(restaurantsQuery);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRestaurants(data);
    };

    fetchData();
  }, [typeFilter, location]);

  const displayedData = count ? restaurants.slice(0, count) : restaurants;
  const handleFavoriteToggle = async (id, favorite) => {
    try {
      const restaurantRef = doc(FIREBASE_DB, "restaurant", id);
      await updateDoc(restaurantRef, {
        favorite: !favorite,
      });

      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.id === id
            ? { ...restaurant, favorite: !favorite }
            : restaurant
        )
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };
  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={displayedData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressRestaurant(item.id)}>
            <View style={styles.cardContainer}>
              <RestaurantCard
                restaurant={item}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.carouselList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    padding: 10,
  },
  carouselList: {
    flexDirection: "row",
    paddingBottom: 10,
    justifyContent: "flex-start",
  },
  cardContainer: {
    marginRight: 15,
    width: 250,
  },
});

export default RestaurantCarousel;
