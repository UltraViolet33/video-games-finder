import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Bookmarks from "./pages/Bookmarks";
import { createStore } from "redux";
import MainReducer from "./reducers";
import { Provider } from "react-redux";
import Router from './Router';


const store = createStore(MainReducer);

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
     <Router></Router>
     <StatusBar hidden={true} style="auto" />
    </Provider>
  );
}
