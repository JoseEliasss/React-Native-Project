import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Restaurant from "./Restaurant";
import RestaurantMenu from "./RestaurantMenu";
import Header from "./Header";

const Stack = createNativeStackNavigator();

export default function RestaurantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Restaurant"
        component={Restaurant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RestaurantMenu"
        component={RestaurantMenu}
        options={{
          title: "Menu",
          headerTintColor: "#00b391",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
