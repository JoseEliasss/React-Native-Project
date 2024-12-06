import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import RestaurantCard from "./RestaurantCard";

const RestaurantCarousel = ({ count, typeFilter, location }) => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);

  // Fetching data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "restaurants"));
      const data = querySnapshot.docs.map(doc => doc.data());
  
      const filteredData = data.filter(r => 
        (!typeFilter || r.type.some(type => type.toLowerCase() === typeFilter.toLowerCase())) &&
        (!location || r.location.toLowerCase() === location.toLowerCase())
      );
  
      setRestaurants(filteredData);
    };
  
    fetchData();
  }, [typeFilter, location]);
  

  // Display a limited number of restaurants based on `count`
  const displayedData = count ? restaurants.slice(0, count) : restaurants;

  // Handle the View All button click
  const handleViewAllClick = () => {
    navigation.navigate("Restaurant");  // Navigate to the Restaurants screen
  };

  // Favorite toggle handler
  const handleFavoriteToggle = (id, favorite) => {
    // You can implement Firestore update logic here
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
          <View style={styles.selectionRestaurantCard}>
            <RestaurantCard restaurant={item} onFavoriteToggle={handleFavoriteToggle} />
          </View>
        )}
        contentContainerStyle={styles.carouselList}
      />
      <View style={styles.viewAllContainer}>
        <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllClick}>
          <Text style={styles.viewAllButtonText}>→</Text>
        </TouchableOpacity>
        <Text style={styles.viewAllText}>View All</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantCarousel: {
    padding: 16,
  },
  carouselList: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  selectionRestaurantCard: {
    marginRight: 30,
  },
  viewAllContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  viewAllButton: {
    backgroundColor: '#00b391',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  viewAllButtonText: {
    color: 'white',
    fontSize: 24,
  },
  viewAllText: {
    color: '#00b391',
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default RestaurantCarousel;
