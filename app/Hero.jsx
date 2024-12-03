import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

// Hero component accepts 'image' and 'title' as props
const Hero = ({ image, title }) => {
  return (
    <ImageBackground source={{ uri: image }} style={styles.heroSection}>
      <View style={styles.heroOverlay}>
        <Text style={styles.heroTitle}>{title}</Text>
      </View>
    </ImageBackground>
  );
};

// Styles using StyleSheet in React Native
const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
    height: 300, // Adjust height as necessary
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Ensure the background image takes precedence
  },
  heroOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay to improve text readability
    padding: 20,
    borderRadius: 10,
  },
  heroTitle: {
    color: "#fff", // White text color
    fontSize: 30,   // Adjust font size as necessary
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Hero;
