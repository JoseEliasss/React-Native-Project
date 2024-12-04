import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import homeImg from "../assets/images/home.png";
import restaurantImg from "../assets/images/restaurant.png";
import cartImg from "../assets/images/cart.png";
import contactImg from "../assets/images/contact.png";
import aboutImg from "../assets/images/about.png";

const Footer = () => {
  const navigation = useNavigation();

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
          onPress={() => navigation.navigate("Restaurants")}
          style={styles.iconWrapper}
        >
          <Image source={restaurantImg} style={styles.cartIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={styles.cartButtonWrapper}
        >
          <Image source={cartImg} style={styles.cartIcon} />
        </TouchableOpacity>

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
  icon: {
    tintColor: "white",
  },
  cartButtonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
  },
  cartIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
});

export default Footer;
