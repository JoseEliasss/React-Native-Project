import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  Alert,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { FIREBASE_AUTH } from "../FirebaseCofing"; // Ensure that the import path is correct
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import logo from "../assets/images/loadingScreenLogo.png";
import Login from "./Login";

const auth = FIREBASE_AUTH;

export default function SignUp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation(); // Access navigation prop

  const signUp = async () => {
    if (!email || !password || !name || !phoneNumber) {
      Alert.alert("Please fill the inputs.");
      setError(true);
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Account created! Check your email for confirmation."); // Informative message
      // Optionally navigate to a different screen upon signup completion
      navigation.navigate("AboutUs"); // Navigate to AboutUs or any other screen you want
    } catch (error) {
      Alert.alert("Sign-up failed: " + error.message); // User-friendly error message
      console.error(error); // Log the error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.avoidingView}>
        <Image style={styles.tinyLogo} source={logo} />
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          autoCapitalize="none"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          placeholder="phoneNumber"
          autoCapitalize="none"
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity onPress={signUp}>
              <Text style={styles.button}>Sign Up</Text>
            </TouchableOpacity>

            {/* Call signUp method */}

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.button}>Already have an account? Login</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00b391",
  },
  tinyLogo: {
    width: 200, // Set width of the logo
    height: 100, // Set height of the logo
    marginBottom: 20, // Space below the logo
  },
  avoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "white",
    borderWidth: 0,
    marginBottom: 12,
    paddingHorizontal: 10,
    textAlign: "center",
    borderRadius: 5,
  },
  button: {
    color: "white", // Change text color to make it visible
    textAlign: "center",
    marginBottom: 5,
    fontSize: 20,
  },
});
