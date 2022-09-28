import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { Game } from "../components/Game";

export const Bookmarks = ({ navigation }) => {
  const games = useSelector(state => state.bookmarks);

  return (
    <View style={style.list}>
      <FlatList
        data={games}
        renderItem={({ item }) => <Game game={item} navigation={navigation} />}
        keyExtractor={item => item.id}></FlatList>
    </View>
  );
};

const style = {
  list: {
    flex: 8,
    backgroundColor: "black",
  },
};
