import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./CartContext"; // Import CartContext to access cart state
import homeImg from "../assets/images/home.png";
import restaurantImg from "../assets/images/restaurant.png";
import cartImg from "../assets/images/cart.png";
import contactImg from "../assets/images/contact.png";
import aboutImg from "../assets/images/about.png";

const Footer = () => {
  const navigation = useNavigation();
  const { cart } = useCart(); // Get the cart state

  // Calculate total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.iconWrapper}
        >
          <Image source={homeImg} style={styles.cartIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Restaurant")}
          style={styles.iconWrapper}
        >
          <Image source={restaurantImg} style={styles.cartIcon} />
        </TouchableOpacity>

        <View style={styles.cartIconWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.cartButtonWrapper}
          >
            <Image source={cartImg} style={styles.cartIcon} />
            {/* Badge for cart item count */}
            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ContactUs")}
          style={styles.iconWrapper}
        >
          <Image source={contactImg} style={styles.cartIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("AboutUs")}
          style={styles.iconWrapper}
        >
          <Image source={aboutImg} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#00B391",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#00B391",
    height: 70,
    marginBottom: -10,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  cartButtonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    position: "relative", // Needed for badge positioning
  },
  cartIconWrapper: {
    position: "relative",
  },
  cartIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Footer;
