import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import List from "./List";
import Details from "./Details";
import Home from "./Home";
import { FIREBASE_AUTH } from "../FirebaseCofing"; // Corrected import
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My Todos" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state to manage async operations

  useEffect(() => {
    // Firebase auth listener to handle user state change
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("User:", user);
      setUser(user);
      setLoading(false); // Stop loading once user state is resolved
    });

    return () => unsubscribe(); // Unsubscribe on component unmount
  }, []);

  // While waiting for Firebase auth state to resolve, show a loading screen
  if (loading) {
    return null; // Or show a loading indicator component here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Inside" : "Login"}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Inside" component={InsideLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
