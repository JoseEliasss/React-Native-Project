import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import emailjs from "emailjs-com"; // Import EmailJS
import Hero from "./Hero";
import ContactHero from "../assets/images/ContactUsHero.jpeg";
import { useNavigation } from "@react-navigation/native";
import Status from "./Status";

const ContactUs = () => {
  const navigation = useNavigation();

  // State to manage form data
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    message: "",
  });

  // State to manage errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    message: "",
  });

  // Handler to update form state
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Clear error when user starts typing
    if (value.trim() !== "") {
      setErrors({ ...errors, [field]: "" });
    }
  };

  // Handler for form submission
  const handleSubmit = () => {
    let valid = true;
    let newErrors = { firstName: "", lastName: "", message: "" };

    // Validate first name
    if (form.firstName.trim() === "") {
      newErrors.firstName = "First name is required.";
      valid = false;
    }

    // Validate last name
    if (form.lastName.trim() === "") {
      newErrors.lastName = "Last name is required.";
      valid = false;
    }

    // Validate message
    if (form.message.trim() === "") {
      newErrors.message = "Message is required.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Prepare template parameters
      const templateParams = {
        firstName: form.firstName,
        lastName: form.lastName,
        message: form.message,
      };

      // Send email using EmailJS
      emailjs
        .send(
          "service_6we16wl", // Your EmailJS service ID
          "template_cumdntl", // Your EmailJS template ID ("template_ghtfj")
          templateParams, // Template parameters
          "anG2QP5XQDficMcBy" // Your EmailJS user ID (public key)
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            Alert.alert("Success", "Your message has been sent successfully!");
            // Reset form
            setForm({ firstName: "", lastName: "", message: "" });
          },
          (err) => {
            console.log("FAILED...", err);
            Alert.alert(
              "Error",
              "There was an error sending your message. Please try again later."
            );
          }
        );
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Hero Section */}
      <Status />
      <Hero image={ContactHero} title="RIGHT TO YOUR DOORSTEPS" />

      {/* Section Title */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONTACT US</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* First Name Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[styles.input, errors.firstName ? styles.inputError : null]}
            placeholder="Enter your first name"
            value={form.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
            placeholderTextColor="#888"
          />
          {errors.firstName ? (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          ) : null}
        </View>

        {/* Last Name Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={[styles.input, errors.lastName ? styles.inputError : null]}
            placeholder="Enter your last name"
            value={form.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
            placeholderTextColor="#888"
          />
          {errors.lastName ? (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          ) : null}
        </View>

        {/* Message Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.textarea, errors.message ? styles.inputError : null]}
            placeholder="Enter your message"
            value={form.message}
            onChangeText={(text) => handleChange("message", text)}
            multiline
            numberOfLines={4}
            placeholderTextColor="#888"
          />
          {errors.message ? (
            <Text style={styles.errorText}>{errors.message}</Text>
          ) : null}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Locations Section */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    paddingBottom: 20, // Added padding bottom for better spacing
  },
  section: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginVertical: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderBottomColor: "#00b391",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#00b391",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#00b391",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    height: 100,
    textAlignVertical: "top", // Ensures text starts at the top-left
    color: "#000",
  },
  button: {
    backgroundColor: "#00b391",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 20,
    width: "50%", // Adjust the width as needed
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
  inputError: {
    borderColor: "red",
  },
});

export default ContactUs;
