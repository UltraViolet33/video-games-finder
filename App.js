import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Bookmarks from "./pages/Bookmarks";
import { createStore } from "redux";
import MainReducer from "./reducers";
import { Provider } from "react-redux";
const store = createStore(MainReducer);

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{ title: "Details" }}
          />
          <Stack.Screen
            name="Bookmarks"
            component={Bookmarks}
            options={{ title: "Mes jeux" }}
          />
        </Stack.Navigator>
        <StatusBar hidden={true} style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
