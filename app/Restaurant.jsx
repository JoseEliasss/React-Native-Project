import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { FIREBASE_DB } from "../FirebaseCofing"; // Ensure correct Firebase import
import { collection, getDocs } from "firebase/firestore";
import Hero from "./Hero";
import HomeHero from "../assets/images/HomeHero.jpeg";
import Status from "./Status";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch restaurant data from Firestore
    const fetchRestaurants = async () => {
      try {
        const restaurantsCollection = collection(FIREBASE_DB, "restaurants");
        const snapshot = await getDocs(restaurantsCollection);

        // Check if data is returned from Firestore
        console.log("Fetched Documents:", snapshot.docs);
        if (snapshot.empty) {
          console.log("No restaurants found in Firestore.");
          setLoading(false);
          return;
        }

        const restaurantsList = snapshot.docs.map((doc) => doc.data());
        console.log("Fetched Restaurant Data:", restaurantsList); // Verify the structure of the data

        setRestaurants(restaurantsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

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
              <Text style={styles.bannerHeading}>Restaurants Near You</Text>
            </View>

            {/* Display the list of restaurants */}
            <View style={styles.restaurantList}>
              {restaurants.length > 0 ? (
                restaurants.map((restaurant, index) => (
                  <View key={index} style={styles.restaurantItem}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.location}>{restaurant.location}</Text>
                    <Text>Rating: {restaurant.rating}</Text>
                    <Text>Delivery: {restaurant.delivery}</Text>
                    <Text>Currency: {restaurant.currency}</Text>

                    {/* Display the types of the restaurant */}
                    <Text style={styles.type}>
                      Type:{" "}
                      {restaurant.type ? restaurant.type.join(", ") : "N/A"}
                    </Text>

                    {/* Display the description */}
                    {restaurant.description &&
                      restaurant.description.length > 0 && (
                        <View style={styles.descriptionWrapper}>
                          <Text style={styles.descriptionHeader}>
                            Description:
                          </Text>
                          {restaurant.description.map((desc, idx) => (
                            <Text key={idx} style={styles.descriptionText}>
                              {desc}
                            </Text>
                          ))}
                        </View>
                      )}

                    {/* Display if the restaurant is marked as favorite */}
                    <Text style={styles.favorite}>
                      Favorite: {restaurant.favorite ? "Yes" : "No"}
                    </Text>
                  </View>
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
  restaurantList: {
    marginTop: 20,
    width: "100%",
  },
  restaurantItem: {
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  location: {
    color: "#555",
    marginTop: 5,
  },
  type: {
    color: "#777",
    marginTop: 5,
    fontStyle: "italic",
  },
  descriptionWrapper: {
    marginTop: 10,
    alignItems: "flex-start",
  },
  descriptionHeader: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  descriptionText: {
    color: "#555",
    marginBottom: 3,
  },
  favorite: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#00b391",
  },
});

export default Restaurants;
