import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FIREBASE_DB, FIREBASE_AUTH } from "../FirebaseCofing"; // Ensure correct path and include Firebase Auth
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (email) => {
      try {
        const usersRef = collection(FIREBASE_DB, "Users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        fetchUserData(user.email); // Fetch data for authenticated user's email
      } else {
        setLoading(false); // Handle unauthenticated state if necessary
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      Alert.alert("Logged Out", "You have been successfully logged out.");
      navigation.replace("Login"); // Ensure "Login" is a valid route in your navigation
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Could not log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00b391" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data found.</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Calculate points and Gold status
  const points = userData.points || 0; // Default to 0 if points are not available
  const pointsInK = Math.floor(points); // Get the whole number of points in thousands
  const ordersNeeded = Math.max(10 - pointsInK, 0); // Orders needed to reach 10K
  const isGold = pointsInK >= 10; // Determine if the user is Gold

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      <View style={styles.profileDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{userData.phoneNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Points:</Text>
          <Text style={styles.detailValue}>{points}K</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text
            style={[
              styles.detailValue,
              isGold ? styles.goldStatus : styles.greenStatus,
            ]}
          >
            {isGold ? "Gold" : "Green"}
          </Text>
        </View>
        {!isGold && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Orders Needed:</Text>
            <Text style={styles.detailValue}>{ordersNeeded}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "#d9534f",
    textAlign: "center",
    marginBottom: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#00b391",
    borderRadius: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 16,
    color: "#e6e6e6",
    marginTop: 5,
  },
  profileDetails: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailValue: {
    fontSize: 18,
    color: "#666",
  },
  greenStatus: {
    color: "#00b391",
  },
  goldStatus: {
    color: "#D4AF37",
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 100,
    marginHorizontal: 125,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Profile;
