import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import Hero from "./Hero";
import AboutHero from "../assets/images/DeliveryImage.jpeg";
import { useNavigation } from "@react-navigation/native";
import Status from "./Status";

const ContactUs = () => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Hero Section */}
      <Status />
      <Hero image={AboutHero} title="Speed Service Satisfaction" />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Welcome to Toters Delivery</Text>

        <Image
          source={require("../assets/images/welcometoDelevrery.jpg")}
          style={styles.teamImage}
        />
        <Text style={styles.sectionText}>
          Lebanon’s leading on-demand delivery service, making life easier and
          faster.
        </Text>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#005f47"
          onPress={() => {
            // Implement navigation or action here
            navigation.navigate("JobApplication");
          }}
        >
          <Text style={styles.buttonText}>Join Us</Text>
        </TouchableHighlight>
      </View>

      {/* Mission Section */}
      <View style={styles.sectionGreen}>
        <Text style={styles.sectionTitleWhite}>Our Mission</Text>
        <Text style={styles.sectionTextWhite}>
          At Toters Delivery Lebanon, our mission is to bring you everything you
          need at your fingertips, from your favorite meals to essential goods.
          With us, convenience is more than just a promise—it’s a way of life.
          We ensure every delivery is quick, reliable, and seamless, no matter
          where you are in Lebanon.
        </Text>
      </View>

      {/* Values Section */}
      <View style={styles.lightSection}>
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
    marginHorizontal: 5,
  },
  section: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  lightSection: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00b391",
    marginVertical: 20,
    textAlign: "center",
  },
  sectionText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 15, //here
    paddingBottom: 10, //here
  },
  sectionGreen: {
    backgroundColor: "#00b391",
  },
  sectionTextWhite: {
    fontSize: 16,
    color: "white",
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 15, //here
    paddingBottom: 10, //here
  },
  sectionTitleWhite: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginVertical: 20,
    textAlign: "center",
  },
  teamImage: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    marginBottom: 25,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#00b391",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ContactUs;
