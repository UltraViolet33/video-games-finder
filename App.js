import { StatusBar } from "expo-status-bar";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MainReducer } from "./reducers";
import { Router } from "./Router";

const store = createStore(MainReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Router></Router>
      <StatusBar hidden={true} style="auto" />
    </Provider>
  );
}
