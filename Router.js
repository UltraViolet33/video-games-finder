import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { actions } from "./reducers/actions";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { Bookmarks } from "./pages/Bookmarks";

const Stack = createNativeStackNavigator();

export const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("bookmarks").then(jsonBookmarks => {
      const bookmarks = JSON.parse(jsonBookmarks || "[]");
      dispatch({ type: actions.REPLACE_BOOKMARKS, payload: bookmarks });
    });
  }, []);

  return (
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
    </NavigationContainer>
  );
};
