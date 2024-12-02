import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ActivityIndicator, TextInput } from "react-native";
import { FIREBASE_AUTH } from "../FirebaseCofing";
import { BlockReason } from "firebase/vertexai";
import { KeyboardAvoidingView } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = FIREBASE_AUTH;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      alert("sign in failed " + error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    // Check if email and password are not empty
    if (!email || !password) {
      alert("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Account created! Check your email for confirmation."); // More informative message
      // Optionally clear the input fields here (if desired)
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Sign-up failed: " + error.message); // Provide user-friendly error message
      console.log(error); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>

        <Text>{"\n"}</Text>

        <TextInput
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Login" onPress={() => signIn()} />
            <Button title="Create a new account!" onPress={() => signUp()} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
