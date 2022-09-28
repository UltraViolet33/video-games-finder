import { Pressable, View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

export const Game = ({ game, navigation }) => {
  const bookmarks = useSelector(state => state.bookmarks);

  const isBookmarked = game =>
    bookmarks.find(bookmark => bookmark.id == game.id) !== undefined;

  const handleClick = slug => {
    navigation.push("Details", { slug });
  };

  return (
    <Pressable
      onPress={() => {
        handleClick(game.slug);
      }}>
      <View style={style.listItem}>
        <Image
          source={{ uri: game.background_image }}
          style={style.listImage}></Image>
        <View>
          <Text style={style.name}>{game.name}</Text>
          <Text
            style={
              game.rating <= 3 ? style.itemRBadRating : style.itemGoodRating
            }>
            Rate : {game.rating}
          </Text>
          {isBookmarked(game) ? <Text>⭐</Text> : <Text></Text>}
        </View>
      </View>
    </Pressable>
  );
};

const style = {
  listItem: {
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
    height: 100,
    margin: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  listImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 10,
    borderRadius: 10,
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
  },

  itemRBadRating: {
    color: "red",
  },

  itemGoodRating: {
    color: "green",
  },
};
