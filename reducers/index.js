import AsyncStorage from "@react-native-async-storage/async-storage";
import { actions } from "./actions";

const STATE = {
  bookmarks: [
    {
      slug: "super-mario-kart",
      name: "Super Mario Kart",
      background_image:
        "https://media.rawg.io/media/games/4da/4da63441cb94d7adb4d954871b65db30.jpg",
      id: 24478,
    },
    {
      slug: "super-mario-bros",
      name: "Super Mario Bros.",
      background_image:
        "https://media.rawg.io/media/games/154/154fea9689109f26c49c6a2db6263ef9.jpg",
      id: 25080,
    },
  ],
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
