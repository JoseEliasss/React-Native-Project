import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from "./CartContext"; // Import CartProvider
import Login from "./Login";
import List from "./List";
import Details from "./Details";
import Home from "./Home";
import AboutUs from "./AboutUs";
import { FIREBASE_AUTH } from "../FirebaseCofing"; // Ensure the correct path
import { onAuthStateChanged } from "firebase/auth";
import SignUp from "./SignUp";
import Header from "./Header";
import Footer from "./Footer";
import JobApplication from "./JobApplication";
import Restaurant from "./Restaurant";
import ContactUs from "./ContactUs";
import RestaurantMenu from "./RestaurantMenu"; // Import the menu screen
import Cart from "./Cart";
import Profile from "./Profile"; // Import Profile screen
import { LogBox } from "react-native"; // Import LogBox to suppress warnings

// Suppress specific warnings
LogBox.ignoreLogs([
  "Warning: Text strings must be rendered within a <Text> component",
]);

// Suppress all warnings (not recommended for debugging)
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="My Todos"
        component={List}
        options={{ header: () => <Header /> }}
      />
      <InsideStack.Screen
        name="Details"
        component={Details}
        options={{ header: () => <Header /> }}
      />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("User:", user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <CartProvider>
      {" "}
      {/* Wrap everything with CartProvider */}
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

          {user ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ header: () => <Header /> }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ header: () => <Header /> }}
              />
              <Stack.Screen
                name="Inside"
                component={InsideLayout}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{ header: () => <Header /> }}
              />
              <Stack.Screen
                name="JobApplication"
                component={JobApplication}
                options={{ header: () => <Header /> }}
              />
              <Stack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{ header: () => <Header /> }}
              />
              <Stack.Screen
                name="Restaurant"
                component={Restaurant}
                options={{ header: () => <Header /> }}
              />
              <Stack.Screen
                name="RestaurantMenu"
                component={RestaurantMenu}
                options={{ header: () => <Header /> }}
              />
              <Stack.Screen
                name="Cart"
                component={Cart}
                options={{ header: () => <Header /> }}
              />
            </>
          ) : null}
        </Stack.Navigator>
        {user ? <Footer /> : null}
      </NavigationContainer>
    </CartProvider>
  );
}
