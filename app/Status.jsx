import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Status component accepts props for statusColor, subStatus, and points
const Status = ({ statusColor = "Green", subStatus, points = "80K Points" }) => {
  // Define status color dynamically
  const statusStyle = styles[`${statusColor.toLowerCase()}Status`] || styles.greenStatus;

  return (
    <View style={styles.status}>
      <View style={styles.ordersStatus}>
        <View style={[styles.statusColor, statusStyle]}>
          <Text style={styles.statusText}>{statusColor}</Text>
        </View>
        <Text style={styles.subStatus}>
          {subStatus || "10 more orders to reach Gold."}
        </Text>
      </View>
      <Text style={styles.pointsStatus}>{points}</Text>
    </View>
  );
};

// Styles using StyleSheet.create
const styles = StyleSheet.create({
  status: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    margin: 10,
    backgroundColor: "#f9f9f9",
  },
  ordersStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  statusColor: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subStatus: {
    flex: 1,
    color: "#555",
    fontSize: 14,
  },
  pointsStatus: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  // Color styles based on statusColor prop
  greenStatus: {
    backgroundColor: "#28a745", // Green color
  },
  yellowStatus: {
    backgroundColor: "#ffc107", // Yellow color
  },
  redStatus: {
    backgroundColor: "#dc3545", // Red color
  },
});

export default Status;
