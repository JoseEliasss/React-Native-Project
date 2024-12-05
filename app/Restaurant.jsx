// Restaurants.js
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { FIREBASE_DB } from "../FirebaseCofing"; // Ensure correct Firebase import
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Hero from "./Hero";
import HomeHero from "../assets/images/HomeHero.jpeg";
import Status from "./Status";
import RestaurantCard from "./RestaurantCard"; // Import the RestaurantCard component

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantsCollection = collection(FIREBASE_DB, "restaurant");
        const snapshot = await getDocs(restaurantsCollection);

        if (snapshot.empty) {
          setLoading(false);
          return;
        }

        const restaurantsList = snapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID for later use
          ...doc.data(),
        }));

        setRestaurants(restaurantsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

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

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.home}>
        <Status />
        <Hero image={HomeHero} title="Quick Reliable Convenient" />

        <View style={styles.container}>
          <View style={styles.homeBanner}>
            <View style={styles.bannerDetails}>
              <Text style={styles.bannerHeading}>Restaurants</Text>
            </View>

            {/* Display the list of restaurants */}
            <View style={styles.restaurantPadding}>
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))
              ) : (
                <Text>No restaurants available.</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  home: {
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  container: {
    paddingVertical: 15,
    textAlign: "center",
  },
  homeBanner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    color: "#333",
  },
  bannerDetails: {
    flexDirection: "column",
    alignItems: "center",
  },
  bannerHeading: {
    fontSize: 25,
    color: "#00b391",
    fontWeight: "bold",
    textAlign: "center",
  },
  restaurantPadding: {
    padding: 10,
  },
});

export default Restaurants;
