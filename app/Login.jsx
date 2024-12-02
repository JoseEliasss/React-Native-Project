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
import SingUp from "./SignUp";

const auth = FIREBASE_AUTH;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Access navigation prop

  const signIn = async () => {
    //write the if email contains @gmail.com can log you
    if (!email && !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    if (!password) {
      alert("Please enter your password.");
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home"); // Change to the desired screen
    } catch (error) {
      alert("Sign in failed: " + error.message); // Better error message
      console.error(error); // Log the error for debugging
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
            <TouchableOpacity onPress={signIn}>
              <Text style={styles.button}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.button}>Create a new account!</Text>
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
    color: "white", // Change text color to make it visible
    textAlign: "center",
    marginBottom: 5,
    fontSize: 20,
  },
});
