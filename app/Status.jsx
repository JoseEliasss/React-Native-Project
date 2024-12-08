import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseCofing"; // Ensure correct path
import { collection, query, where, getDocs } from "firebase/firestore";

const Status = () => {
  const [userName, setUserName] = useState("Loading...");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser; // Get the currently logged-in user
        if (user) {
          const userEmail = user.email;

          // Query Firestore for the user data
          const usersCollection = collection(FIREBASE_DB, "Users");
          const userQuery = query(
            usersCollection,
            where("email", "==", userEmail)
          );
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserName(userData.name); // Set the user's name
            setPoints(userData.points); // Set the user's points
          } else {
            setUserName("Guest");
            setPoints(0);
          }
        } else {
          setUserName("Guest");
          setPoints(0);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const pointsInK = Math.floor(points); // Get the whole number of points in thousands
  const ordersNeeded = Math.max(10 - pointsInK, 0); // Orders needed to reach 10K
  const statusColor = points >= 10000 ? "Gold" : "Green"; // Determine status color

  return (
    <View style={styles.statusContainer}>
      <View style={styles.ordersStatus}>
        <Text
          style={[
            styles.statusColor,
            styles[`${statusColor.toLowerCase()}Status`],
            styles.mobileStatusColor,
          ]}
        >
          {userName + " - " + statusColor}
        </Text>
        <Text style={[styles.subStatus, styles.mobileSubStatus]}>
          {points >= 10
            ? "Congratulations! You've reached Gold."
            : `${ordersNeeded} more orders to reach Gold.`}
        </Text>
      </View>
      <Text style={[styles.pointsStatus, styles.mobilePointsStatus]}>
        {`${points}K Points`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  /* General Styles */
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: "#00b391",
    borderRadius: 15,
    backgroundColor: "#f9f9f9",
  },
  ordersStatus: {
    flexDirection: "column",
  },
  statusColor: {
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  greenStatus: {
    color: "#00b391",
  },
  goldStatus: {
    color: "#D4AF37",
  },
  subStatus: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
  },
  pointsStatus: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#777",
  },
});

export default Status;
