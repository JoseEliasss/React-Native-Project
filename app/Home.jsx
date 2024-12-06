import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseCofing"; // Ensure the correct import path
import { collection, query, where, getDocs } from "firebase/firestore";
import Gif1 from "../assets/images/gif1.gif";
import Gif2 from "../assets/images/gif2.gif";
import Gif3 from "../assets/images/gif3.gif";
import Hero from "./Hero";
import RestaurantCarousel from "./Carousel";
import HomeHero from "../assets/images/HomeHero.jpeg";
import Status from "./Status";

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.home}>
        {/* Pass the fetched username to the Status component */}
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
          {/* Popular Italian Choices */}
          <View style={styles.selectionSection}>
            <Text style={styles.selectionTitle}>🍕 Popular Italian Choices</Text>
            <RestaurantCarousel/>
          </View>

          {/* Kaslik Favorites */}
          <View style={styles.selectionSection}>
            <Text style={styles.selectionTitle}>📍 Kaslik Favorites</Text>
            <RestaurantCarousel typeFilter="" location="Kaslik" count={5} />
          </View>

          {/* American Classics */}
          <View style={styles.selectionSection}>
            <Text style={styles.selectionTitle}>🍔 American Classics</Text>
            <RestaurantCarousel typeFilter="American" location="" count={5} />
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
});

export default Home;
