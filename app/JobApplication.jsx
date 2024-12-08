import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Hero from "./Hero";
import emailjs from "emailjs-com";
import ApplicationHero from "../assets/images/welcometoDelevrery.jpg";

const JobApplication = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvImage, setCvImage] = useState(null);
  const [idImage, setIdImage] = useState(null);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    cvImage: "",
    idImage: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    return cameraStatus === "granted" && galleryStatus === "granted";
  };

  const pickCvImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      setErrors((prev) => ({
        ...prev,
        cvImage: "Permission to access gallery is required.",
      }));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCvImage(result.assets[0].uri);
      setErrors((prev) => ({ ...prev, cvImage: "" }));
    }
  };

  const takeIdPhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      setErrors((prev) => ({
        ...prev,
        idImage: "Permission to access the camera is required.",
      }));
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
      setErrors((prev) => ({ ...prev, idImage: "" }));
    }
  };

  const handleSubmit = async () => {
    let hasErrors = false;
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
    };

    // Validation logic
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      hasErrors = true;
    }

    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = "A valid email address is required.";
      hasErrors = true;
    }

    if (!phone.trim()) {
      newErrors.phone = "A valid phone number is required.";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      try {
        const templateParams = {
          fullName,
          email,
          phone,
        };

        // Send email using EmailJS
        await emailjs.send(
          "service_6we16wl", // Your Service ID
          "template_b1wrfxf", // Your Template ID
          templateParams, // Template Parameters
          "anG2QP5XQDficMcBy" // Public Key
        );

        Alert.alert("Success", "Your application has been submitted!");

        // Reset form
        setFullName("");
        setEmail("");
        setPhone("");
        setCvImage(null);
        setIdImage(null);
        setErrors({});
      } catch (error) {
        console.error("Error sending email:", error);
        Alert.alert("Error", "There was an error submitting your application.");
      }
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Hero
        title={`Join Our Team! \n Fill out the form to take the first step in your career.`}
        image={ApplicationHero}
      />
      <View style={styles.formContainer}>
        {/* Full Name */}
        <Text style={styles.label}>Enter your name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        {errors.fullName ? (
          <Text style={styles.errorText}>{errors.fullName}</Text>
        ) : null}
        {/* Email */}
        <Text style={styles.label}>Enter your email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
        {/* Phone */}
        <Text style={styles.label}>Enter your phone number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}
        {/* Upload CV */}
        <Text style={styles.label}>Upload Your CV:</Text>
        <Pressable style={styles.button} onPress={pickCvImage}>
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </Pressable>
        {cvImage && (
          <View>
            <Image source={{ uri: cvImage }} style={styles.imagePreview} />
            <Pressable
              style={styles.removeButton}
              onPress={() => setCvImage(null)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
          </View>
        )}
        {errors.cvImage ? (
          <Text style={styles.errorText}>{errors.cvImage}</Text>
        ) : null}
        {/* Take ID Photo */}
        <Text style={styles.label}>Take Photo of Your ID:</Text>
        <Pressable style={styles.button} onPress={takeIdPhoto}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </Pressable>
        {idImage && (
          <View>
            <Image source={{ uri: idImage }} style={styles.imagePreview} />
            <Pressable
              style={styles.removeButton}
              onPress={() => setIdImage(null)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
          </View>
        )}
        {errors.idImage ? (
          <Text style={styles.errorText}>{errors.idImage}</Text>
        ) : null}
        {/* Submit */}
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Application</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    paddingVertical: 20

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginVertical: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderBottomColor: "#00b391",
  },
  intro: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
    lineHeight: 20,
    textAlign: "center",
  },
  Image: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    marginBottom: 25,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#00b391",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 14,
    marginBottom: 10,
  },
  imagePickerContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: "#4a4a4a",
  },
  button: {
    backgroundColor: "#00b391",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 15,
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#00b391",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 50,

  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  formContainer: {
    marginHorizontal: 20,
  },
});

export default JobApplication;
