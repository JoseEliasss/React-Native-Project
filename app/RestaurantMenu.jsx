import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseCofing";

const RestaurantMenu = ({ route }) => {
  const { restaurantId } = route.params; // Get restaurant ID from navigation
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!menu) {
    return <Text>No menu available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>MENU</Text>
      {Object.keys(menu).map((key) => {
        const item = menu[key];
        return (
          <View key={key} style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
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
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    color: "#555",
    marginVertical: 5,
    paddingRight: 85,
  },
  itemPrice: {
    color: "#00b391",
    fontWeight: "bold",
  },
});

export default RestaurantMenu;
