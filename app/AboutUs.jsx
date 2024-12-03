import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Hero from "./Hero";
import AboutHero from "../assets/images/DeliveryImage.jpeg";

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <Hero image={AboutHero} title="Speed Service Satisfaction" />

      {/* Mission Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          At Toters Delivery Lebanon, our mission is to bring you everything you
          need at your fingertips, from your favorite meals to essential goods.
          With us, convenience is more than just a promise—it’s a way of life.
          We ensure every delivery is quick, reliable, and seamless, no matter
          where you are in Lebanon.
        </Text>
      </View>

      {/* Values Section */}
      <View style={[styles.section, styles.lightSection]}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        <Text style={styles.sectionText}>
          We believe in customer satisfaction, community support, and
          innovation. Our dedicated team constantly strives to exceed
          expectations and provide an experience that combines ease, quality,
          and trustworthiness. At Toters, we are committed to giving back to the
          communities we serve and continuously improving our services to meet
          your evolving needs.
        </Text>
      </View>

      {/* Team Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meet Our Founders</Text>
        <Image
          source={require("../assets/images/Founders.jpeg")}
          style={styles.teamImage}
        />
        <Text style={styles.sectionText}>
          Toters Delivery was founded by a team of visionary entrepreneurs who
          saw the need for a more reliable, efficient delivery service in
          Lebanon. With backgrounds in technology, logistics, and customer
          service, our founders are dedicated to transforming the delivery
          landscape in Lebanon and beyond. Their commitment to innovation and
          excellence drives Toters’ mission to provide fast, dependable delivery
          for everyone, every day. Under their leadership, Toters has grown to
          become a trusted name in the industry, known for quality, convenience,
          and community.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  lightSection: {
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00b391",
    marginBottom: 10,
    textAlign: "center",
  },
  sectionText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    textAlign: "center",
  },
  teamImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginVertical: 20,
  },
});

export default AboutUs;
