import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Image
          source={require("/Users/charbelmsalem/React-Native-Project/assets/images/Logo-white.png")}
          style={styles.logo}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("/Users/charbelmsalem/React-Native-Project/assets/images/profile.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#00b391",
    flex: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#00b391",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 20,
    tintColor: "white",
  },
});

export default Header;