import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

const Hero = ({ image, title }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.heroSection}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", 
    alignItems: "center", 
    height: 300, 
  },
  heroSection: {
    width: "100%",
    height: "100%", // Adjusted to fill the container's height
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // Ensures heroSection is centered horizontally
  },
  heroOverlay: {
    backgroundColor: "rgba(0, 179, 145, 0.8)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 400,
    letterSpacing: '4',
    textAlign: "center",
    textTransform: 'uppercase'
  },
});

export default Hero;
