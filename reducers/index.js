import AsyncStorage from "@react-native-async-storage/async-storage";
import { actions } from "./actions";

const STATE = {
  bookmarks: [],
};

export const MainReducer = (state = STATE, action) => {
  const newState = { ...state, bookmarks: [...state.bookmarks] };
  switch (action.type) {
    case actions.ADD_BOOKMARK:
      newState.bookmarks.push(action.payload);
      save(newState.bookmarks);
      return newState;

    case actions.REMOVE_BOOKMARK:
      const test = game => game.id == action.payload.id;
      const index = newState.bookmarks.findIndex(test);
      newState.bookmarks.splice(index, 1);
      save(newState.bookmarks);
      return newState;

    case actions.REPLACE_BOOKMARKS:
      newState.bookmarks = action.payload;
      return newState;
  }
  return { ...state };
};

const save = bookmarks => {
  AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    .then(() => {
      console.log("Sauvegarde ok");
    })
    .catch(err => {
      console.log(err.message);
    });
};
