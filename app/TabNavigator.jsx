import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Cart from "./Cart";
import RestaurantStack from "./RestaurantStack";
import { useCart } from "./CartContext";

import homeImg from "../assets/images/home.png";
import restaurantImg from "../assets/images/restaurant.png";
import cartImg from "../assets/images/cart.png";
import contactImg from "../assets/images/contact.png";
import aboutImg from "../assets/images/about.png";
import Header from "./Header";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { cart } = useCart();

  // Calculate total items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => {
          let icon;
          let badge = null;
          let wrapperStyle = [styles.iconWrapper];

          if (route.name === "Home") {
            icon = homeImg;
          } else if (route.name === "Restos") {
            icon = restaurantImg;
          } else if (route.name === "Cart") {
            icon = cartImg;
            wrapperStyle.push(styles.cartIconWrapper);
            if (totalItems > 0) {
              badge = (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              );
            }
          } else if (route.name === "Contact") {
            icon = contactImg;
          } else if (route.name === "Info") {
            icon = aboutImg;
          }

          return (
            <View style={wrapperStyle}>
              {focused && <View style={styles.activeIndicator} />}
              <Image
                source={icon}
                style={[styles.icon, focused && styles.iconFocused]}
              />
              {badge}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{header: () => <Header />}} />
      <Tab.Screen name="Restos" component={RestaurantStack} options={{header: () => <Header />}}/>
      <Tab.Screen name="Cart" component={Cart} options={{header: () => <Header />}} />
      <Tab.Screen name="Contact" component={ContactUs} options={{header: () => <Header />}}/>
      <Tab.Screen name="Info" component={AboutUs} options={{header: () => <Header />}} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#00B391",
    borderTopWidth: 0,
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  cartIconWrapper: {
    backgroundColor: "white",
    padding: 18,
    borderRadius:10,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  activeIndicator: {
    position: "absolute",
    top: -8,
    width: 30,
    height: 4,
    backgroundColor: "white",
    borderRadius: 2,
  },
});
