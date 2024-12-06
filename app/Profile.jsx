import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FIREBASE_DB } from "../FirebaseCofing"; // Ensure the correct path
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = "uid"; 
      const userRef = doc(FIREBASE_DB, "Users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <Text>Name: {userData.name}</Text>
      <Text>Email: {userData.email}</Text>
      <Text>Phone: {userData.phoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Profile;
