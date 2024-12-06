import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import RestaurantCard from "./RestaurantCard";

const RestaurantCarousel = ({ count, typeFilter, location }) => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);

  // Fetching data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      let restaurantsQuery = collection(db, "restaurant");

      // Apply filters based on location and type
      if (location === "Kaslik") {
        restaurantsQuery = query(restaurantsQuery, where("location", "==", "Kaslik"));
      }

      if (typeFilter === "American") {
        restaurantsQuery = query(restaurantsQuery, where("type", "array-contains", "American"));
      }

      // Fetch the filtered data
      const querySnapshot = await getDocs(restaurantsQuery);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRestaurants(data);
    };

    fetchData();
  }, [typeFilter, location]);

  // Display a limited number of restaurants based on `count`
  const displayedData = count ? restaurants.slice(0, count) : restaurants;

  // Handle the View All button click
  const handleViewAllClick = () => {
    navigation.navigate("Restaurant"); // Navigate to the Restaurants screen
  };

  // Handle restaurant card click to navigate to the menu
  const handleRestaurantClick = (id) => {
    navigation.navigate("RestaurantMenu", { restaurantId: id });
  };

  // Favorite toggle handler
  const handleFavoriteToggle = (id, favorite) => {
    // Implement Firestore update logic here
    console.log("Toggled favorite for:", id, favorite);
  };

  return (
    <View style={styles.restaurantCarousel}>
      <FlatList
        data={displayedData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleRestaurantClick(item.id)} // Navigate to restaurant menu
          >
            <View style={styles.selectionRestaurantCard}>
              <RestaurantCard
                restaurant={item}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.carouselList}
        ListFooterComponent={
          <View style={styles.viewAllContainer}>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={handleViewAllClick}
            >
              <Text style={styles.viewAllButtonText}>→</Text>
            </TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantCarousel: {
    padding: 16,
  },
  carouselList: {
    flexDirection: "row",
    paddingBottom: 10,
    justifyContent: "flex-start", // Align items to the left
  },
  selectionRestaurantCard: {
    marginRight: 15, // Reduced margin to avoid too much space between cards
    width: 250, // Set a fixed width for the card to avoid stretching
  },
  viewAllContainer: {
    alignItems: "center",
    marginVertical: 80, // Adjusted margin to separate from carousel
    marginHorizontal: 20,
  },
  viewAllButton: {
    backgroundColor: "#00b391",
    borderRadius: 30,
    width: 50, // Slightly smaller size for the button
    height: 50, // Same size for the button height
    justifyContent: "center",
    alignItems: "center",
  },
  viewAllButtonText: {
    color: "white",
    fontSize: 24,
  },
  viewAllText: {
    color: "#00b391",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "bold",
  },
});

export default RestaurantCarousel;
