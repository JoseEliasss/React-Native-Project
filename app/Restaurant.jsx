import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_DB } from "../FirebaseCofing"; // Ensure correct Firebase import
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Hero from "./Hero";
import HomeHero from "../assets/images/HomeHero.jpeg";
import Status from "./Status";
import ratingStar from "../assets/images/ratingStar.png";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch restaurant data from Firestore
    const fetchRestaurants = async () => {
      try {
        const restaurantsCollection = collection(FIREBASE_DB, "restaurant"); // Corrected collection name
        const snapshot = await getDocs(restaurantsCollection);

        // Check if data is returned from Firestore
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

  const handleFavoriteToggle = async (name, favorite) => {
    try {
      // Toggle the favorite state
      const restaurantRef = doc(FIREBASE_DB, "restaurant", name);
      await updateDoc(restaurantRef, {
        favorite: !favorite,
      });

      // Update the local state to reflect the change
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.name === name
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
              <View style={styles.restaurantList}>
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant, index) => (
                    <View key={index} style={styles.restaurantItem}>
                      <Image source={HomeHero} style={styles.image} />
                      <View style={styles.name_location_rating}>
                        <Text style={styles.restaurantName}>
                          {restaurant.name} - {restaurant.location}
                        </Text>

                        <View style={styles.rating}>
                          <Image
                            source={ratingStar}
                            style={styles.ratingStar}
                          />
                          <Text style={{ fontWeight: "bold" }}>
                            {restaurant.rating}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.delivery}>
                        Delivery: {restaurant.delivery}
                      </Text>

                      {/* Favorite Button (Positioned Top-Right) */}
                      <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() =>
                          handleFavoriteToggle(
                            restaurant.id,
                            restaurant.favorite
                          )
                        }
                      >
                        <Text style={styles.favoriteIcon}>
                          {restaurant.favorite ? "❤️" : "🤍"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text>No restaurants available.</Text>
                )}
              </View>
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
  restaurantList: {
    marginTop: 20,
    width: "100%",
  },
  restaurantPadding: {
    padding: 10,
  },
  restaurantItem: {
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#F8F8FF",
    position: "relative", // Allow positioning of the favorite button inside the container
  },
  image: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 7,
  },
  name_location_rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "100%",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  ratingStar: {
    width: 20,
    height: 20,
  },
  delivery: {
    width: "100%",
    textAlign: "left",
    marginTop: 7,
  },
  favoriteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 5,
  },
  favoriteIcon: {
    fontSize: 25,
  },
});

export default Restaurants;
