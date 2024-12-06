import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseCofing";
import { useCart } from "./CartContext";

const RestaurantMenu = ({ route }) => {
  const { restaurantId } = route.params; // Get restaurant ID from navigation
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Use the global cart context

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const restaurantRef = doc(FIREBASE_DB, "restaurant", restaurantId);
        const docSnap = await getDoc(restaurantRef);

        if (docSnap.exists()) {
          setMenu(docSnap.data().Menu);
        } else {
          console.log("No menu data available");
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  const handleAddToCart = (item) => {
    addToCart(item); // Add item to the global cart
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (!menu) {
    return <Text style={styles.noMenuText}>No menu available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>MENU</Text>
      {Object.keys(menu).map((key) => {
        const item = menu[key];
        return (
          <View key={key} style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginVertical: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderBottomColor: "#00b391",
  },
  menuItem: {
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: "#ddd",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    color: "#555",
    marginVertical: 5,
  },
  itemPrice: {
    color: "#00b391",
    fontWeight: "bold",
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#00b391",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  noMenuText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "gray",
  },
});

export default RestaurantMenu;
