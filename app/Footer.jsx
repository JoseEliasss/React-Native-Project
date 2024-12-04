import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}
          style={styles.iconWrapper}>
          <Image
            source={require("/Users/charbelmsalem/React-Native-Project/assets/images/home.png")}
            style={styles.cartIcon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate("Restaurants")}
          style={styles.iconWrapper}>
          <Image
            source={require("/Users/charbelmsalem/React-Native-Project/assets/images/restaurant.png")}
            style={styles.cartIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Cart")}
          style={styles.cartButtonWrapper}>
          <Image
            source={require("/Users/charbelmsalem/React-Native-Project/assets/images/cart.png")}
            style={styles.cartIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}
          style={styles.iconWrapper}>
          <Image
            source={require("/Users/charbelmsalem/React-Native-Project/assets/images/contact.png")}
            style={styles.cartIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}
          style={styles.iconWrapper}>
          <Image
            source={require("/Users/charbelmsalem/React-Native-Project/assets/images/about.png")}
            style={styles.cartIcon}
          />
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
    marginBottom: -10
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
