import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseCofing";
import logo from "../assets/images/loadingScreenLogo.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigation = useNavigation();

  const signUp = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password || !name || !phoneNumber) {
      setErrorMessage("Please fill all the inputs.");
      return;
    }

    setLoading(true);

    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const uid = userCredential.user.uid; // Get the user's UID

      // Add user details to Firestore
      await setDoc(doc(FIREBASE_DB, "Users", uid), {
        name,
        phoneNumber,
        email,
        createdAt: serverTimestamp(),
        points: 1,
      });

      setSuccessMessage("Account created successfully!");
      setTimeout(() => navigation.navigate("Home"), 2000);
    } catch (error) {
      setErrorMessage(`Sign-up failed: ${error.message}`);
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.avoidingView}>
        <Image style={styles.logo} source={logo} />
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          autoCapitalize="words"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={setPassword}
        />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}

        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00b391",
  },
  avoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "white",
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#005f73",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 300,
  },
  buttonSecondary: {
    backgroundColor: "#0a9396",
    padding: 10,
    borderRadius: 5,
    width: 300,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  successText: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default SignUp;
