import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Gif1 from "../assets/images/gif1.gif";
import Gif2 from "../assets/images/gif2.gif";
import Gif3 from "../assets/images/gif3.gif";
import Hero from "./Hero";
import RestaurantCarousel from "./Carousel";
import HomeHero from "../assets/images/HomeHero.jpeg";
import Status from "./Status";

const Home = () => {
  const navigation = useNavigation();

  // Navigate to RestaurantMenu screen
  const navigateToRestaurantMenu = (restaurantId) => {
    navigation.navigate("RestaurantMenu", { restaurantId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.home}>
        <Status />
        <Hero image={HomeHero} title="Quick Reliable Convenient" />

        <View style={styles.container}>
          <View style={styles.homeBanner}>
            <View style={styles.bannerDetails}>
              <Text style={styles.bannerHeading}>
                Easy and Effortless Delivery
              </Text>
              <Text style={styles.bannerDescription}>
                Get your essentials delivered at lightning speed. Pay
                conveniently with card or cash upon arrival. Tracking made easy,
                from order to doorstep.
              </Text>
            </View>

            <View style={styles.gifWrapper}>
              <Image style={styles.singleGif} source={Gif1} />
              <Image style={styles.singleGif} source={Gif3} />
              <Image style={styles.singleGif} source={Gif2} />
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.selections}>
          {/* Kaslik Favorites */}
          <View style={styles.selectionSection}>
            <Text style={styles.selectionTitle}>📍 Kaslik Favorites</Text>
            <RestaurantCarousel
              typeFilter=""
              location="Kaslik"
              count={5}
              onPressRestaurant={navigateToRestaurantMenu}
            />
          </View>

          {/* American Classics */}
          <View style={styles.selectionSection}>
            <Text style={styles.selectionTitle}>🍔 American Classics</Text>
            <RestaurantCarousel
              typeFilter="American"
              location=""
              count={5}
              onPressRestaurant={navigateToRestaurantMenu}
            />
          </View>
        </ScrollView>
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
  bannerDescription: {
    color: "#555",
    textAlign: "center",
    fontSize: 12,
    marginVertical: 8,
  },
  gifWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  singleGif: {
    height: 250,
    width: 120,
    resizeMode: "contain",
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Home;
