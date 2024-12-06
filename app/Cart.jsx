import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { useCart } from "./CartContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Get the current logged-in user's phoneNumber
const auth = getAuth();
const db = getFirestore();

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    paymentType: "cash",
  });
  const [currentLocation, setCurrentLocation] = useState(null); // For Google Maps
  const [conversionRate, setConversionRate] = useState(null);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = collection(db, "Users"); // Assuming your Firestore collection is "users"
          const userSnapshot = await getDocs(userRef);
          const userData = userSnapshot.docs
            .map((doc) => doc.data())
            .find((userDoc) => userDoc.phoneNumber === user.phoneNumber); // Match the logged-in user by phoneNumber

          if (userData) {
            setForm((prevForm) => ({
              ...prevForm,
              name: userData.name,
              phone: userData.phoneNumber,
            }));
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // Calculate total amount
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fetch conversion rate for USD to LBP
  const fetchConversionRate = async () => {
    try {
      const response = await axios.get(
        `https://open.er-api.com/v6/latest/USD`
      );
      setConversionRate(response.data.rates.LBP);
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      setConversionRate(null);
    }
  };

  // Request Permissions and Fetch Current Location
  const handleUseCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setForm({
      ...form,
      location: `Lat: ${latitude}, Long: ${longitude}`,
    });
    setCurrentLocation({ latitude, longitude });
  };

  // Send Notification
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Order Confirmed",
        body: "Your order is on its way!",
      },
      trigger: null, // Sends immediately
    });
  };

  // Send WhatsApp Message
  const sendWhatsAppMessage = () => {
    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} x${item.quantity} - $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const message = `Order Confirmed! 🚀\n\nItems:\n${orderDetails}\n\nTotal: $${totalAmount.toFixed(
      2
    )} LBP: ${(totalAmount * conversionRate).toFixed(
      0
    )}\n\nYour order is on its way! 📍Location: ${form.location}`;
    const whatsappUrl = `whatsapp://send?phone=${+96181649625}&text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(whatsappUrl).catch(() =>
      Alert.alert("Error", "WhatsApp is not installed on your device.")
    );
  };

  // Handle Order Submission
  const handleSubmitOrder = () => {
    setShowModal(false);
    setOrderStatus("Sending your order...");

    setTimeout(() => {
      clearCart();
      setOrderStatus("");
      sendNotification(); // Trigger notification
      sendWhatsAppMessage(); // Send message via WhatsApp
    }, 2000);
  };

  if (cart.length === 0 && !orderStatus) {
    return <Text style={styles.emptyCartMessage}>Your cart is empty</Text>;
  }

  return (
    <View style={styles.cartContainer}>
      <Text style={styles.heading}>Your Cart</Text>

      {/* Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartImage} />
            <View style={styles.cartItemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemRestaurant}>{item.restaurant}</Text>
              <Text style={styles.itemQuantity}>Quantity: x{item.quantity}</Text>
              <Text style={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Total Amount */}
      <View style={styles.totalAmount}>
        <Text style={styles.totalAmountText}>
          Total Amount: ${totalAmount.toFixed(2)}{" "}
          {conversionRate && `LBP: ${(totalAmount * conversionRate).toFixed(0)}`}
        </Text>
      </View>

      {/* Order Now Button */}
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => {
          fetchConversionRate();
          setShowModal(true);
        }}
      >
        <Text style={styles.buttonText}>Order Now</Text>
      </TouchableOpacity>

      {/* Modal for Order Details */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Complete Your Order</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={form.phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={form.location}
              onChangeText={(text) => setForm({ ...form, location: text })}
            />
            <TouchableOpacity
              style={styles.useLocationButton}
              onPress={handleUseCurrentLocation}
            >
              <Text style={styles.useLocationButtonText}>
                Use Current Location
              </Text>
            </TouchableOpacity>
            {currentLocation && (
              <MapView
                style={styles.map}
                initialRegion={{
                  ...currentLocation,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker coordinate={currentLocation} />
              </MapView>
            )}
            <TextInput
              style={styles.input}
              placeholder="Payment Type (cash/credit)"
              value={form.paymentType}
              onChangeText={(text) => setForm({ ...form, paymentType: text })}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitOrder}
            >
              <Text style={styles.submitButtonText}>Submit Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Order Status */}
      {orderStatus && (
        <Text style={styles.orderStatus}>{orderStatus}</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  cartItemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemRestaurant: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00b391",
    marginTop: 5,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  totalAmount: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderButton: {
    backgroundColor: "#00b391",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#00b391",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  useLocationButton: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  useLocationButtonText: {
    color: "#00b391",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#00b391",
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FF4D4D",
    fontWeight: "bold",
  },
  orderStatus: {
    textAlign: "center",
    fontSize: 18,
    color: "#00b391",
    marginTop: 20,
    fontWeight: "bold",
  },
  emptyCartMessage: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#aaa",
    marginTop: 50,
  },
  map: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
});

export default Cart;