import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import Home from "./pages/Home";
import Details from './pages/Details';
import Test from './pages/Test';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Test"
          component={Details}
          options={{ title: "Détails" }}
        />
      </Stack.Navigator>
      <StatusBar hidden={true} style="auto" />
    </NavigationContainer>
  );
}
