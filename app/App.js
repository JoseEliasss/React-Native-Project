import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../app/Login";
import List from "../app/List";
import Details from "../app/Details";
import { FIREBASE_AUTH } from "../FirebaseCofing";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My Todos" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("User:", user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Inside" : "Login"}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Inside" component={InsideLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//minute17.30
