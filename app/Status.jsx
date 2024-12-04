import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Status = ({ statusColor = "Green", subStatus, points }) => {
  return (
    <View style={styles.statusContainer}>
      <View style={styles.ordersStatus}>
        <Text style={[styles.statusColor, styles[`${statusColor.toLowerCase()}Status`], styles.mobileStatusColor]}>
          {statusColor}
        </Text>
        <Text style={[styles.subStatus, styles.mobileSubStatus]}>{subStatus || "10 more orders to reach Gold."}</Text>
      </View>
      <Text style={[styles.pointsStatus, styles.mobilePointsStatus]}>{points || "80K Points"}</Text>
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
  redStatus: {
    color: "#ff4d4d",
  },
  blueStatus: {
    color: "#4d79ff",
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
