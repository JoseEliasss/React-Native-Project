import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_AUTH } from "../FirebaseCofing"; // Ensure that the import path is correct
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import logo from "../assets/images/loadingScreenLogo.png"; // Update to your image path

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error message state
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation(); // Access navigation prop

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signIn = async () => {
    setError("");
    if (!email && !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        navigation.navigate("Home"); // Navigate to Home if authenticated
      }, 100);
    } catch (error) {
      setError("Sign in failed"); // Set error message
      console.error(error); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.avoidingView}>
        <Image style={styles.tinyLogo} source={logo} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Create a new account!</Text>
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
    alignItems: "center", // Center elements horizontally
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
    backgroundColor: "#005f73",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 300,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#0a9396",
    padding: 10,
    borderRadius: 5,
    width: 300,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  errorText: {
    color: "red", // Error text in red
    marginBottom: 10,
    textAlign: "center",
  },
});
