// RestaurantCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import ratingStar from "../assets/images/ratingStar.png";

const RestaurantCard = ({ restaurant, onFavoriteToggle }) => {
  return (
    <View style={styles.restaurantItem}>
      <Image source={{ uri: restaurant.image }} style={styles.imgprocss} />

      <View style={styles.name_location_rating}>
        <Text style={styles.restaurantName}>
          {restaurant.name} - {restaurant.location}
        </Text>

        <View style={styles.rating}>
          <Image source={ratingStar} style={styles.ratingStar} />
          <Text style={{ fontWeight: "bold" }}>{restaurant.rating}</Text>
        </View>
      </View>
      <Text style={styles.delivery}>Delivery: {restaurant.delivery}</Text>

      {/* Favorite Button (Positioned Top-Right) */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onFavoriteToggle(restaurant.id, restaurant.favorite)}
      >
        <Text style={styles.favoriteIcon}>
          {restaurant.favorite ? "❤️" : "🤍"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imgprocss: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  restaurantItem: {
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#F8F8FF",
    position: "relative", // Allow positioning of the favorite button inside the container
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

export default RestaurantCard;
