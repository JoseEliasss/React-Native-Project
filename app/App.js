import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator"; // Import TabNavigator
import Login from "./Login"; // Import Login screen
import SignUp from "./SignUp"; // Import SignUp screen
import RestaurantMenu from "./RestaurantMenu"; // Import RestaurantMenu
import Profile from "./Profile"; // Import Profile
import { CartProvider } from "./CartContext"; // Import CartProvider
import JobApplication from "./JobApplication"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Authentication Screens */}
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

          {/* Main Application */}
          <Stack.Screen
            name="Main"
            component={TabNavigator} // TabNavigator contains the main tabs
            options={{ headerShown: false }}
          />

          {/* Additional Screens */}
          <Stack.Screen
            name="RestaurantMenu"
            component={RestaurantMenu}
            options={{
              title: "Menu",
              headerTintColor: "#00b391",
              headerStyle: { backgroundColor: "white" },
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "Profile",
              headerTintColor: "#00b391",
              headerStyle: { backgroundColor: "white" },
            }}
          />
          <Stack.Screen
            name="JobApplication"
            component={JobApplication}
            options={{
              title: "Join Us",
              headerTintColor: "#00b391",
              headerStyle: { backgroundColor: "white" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
