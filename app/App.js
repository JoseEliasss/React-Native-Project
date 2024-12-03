import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import List from "./List";
import Details from "./Details";
import Home from "./Home";
import AboutUs from "./AboutUs";
import { FIREBASE_AUTH } from "../FirebaseCofing"; // Ensure the correct path
import { onAuthStateChanged } from "firebase/auth";
import SignUp from "./SignUp";

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
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("User:", user);
      setUser(user);
      setLoading(false); // Stop loading once user state is resolved
    });

    return () => unsubscribe(); // Unsubscribe on component unmount
  }, []);

  if (loading) {
    return null; // You can replace this with a loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        {user ? (
          <>
            <Stack.Screen
              name="Inside"
              component={InsideLayout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{ headerShown: false }}
            />
          </>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
