import { useState } from "react";
import {
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { Game } from "../components/Game";
import { gameServices } from "../services/game.services";

export const Home = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleButton = () => {
    gameServices
      .searchGame(searchText)
      .then(data => setGames(data.results))
      .catch(err => alert(err.message));
  };

  const handlePressBookmarksBtn = () => {
    navigation.push("Bookmarks");
  };

  return (
    <View style={style.page}>
      <Text style={style.searchText}>You can search any games !</Text>
      <View style={style.searchBar}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={style.searchInput}></TextInput>
        <TouchableOpacity style={style.button} onPress={handleButton}>
          <Text style={style.textBtnSearch}>🔍</Text>
        </TouchableOpacity>
      </View>
      <View style={style.list}>
        <FlatList
          data={games}
          renderItem={({ item }) => (
            <Game game={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}></FlatList>
        <Button title="Mes jeux" onPress={handlePressBookmarksBtn}></Button>
      </View>
    </View>
  );
};

const style = {
  page: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },

  searchText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    marginTop: 15,
  },

  searchBar: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
  },

  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    marginRight: 10,
    backgroundColor: "white",
    height: 70,
    padding: 10,
    fontSize: 20,
  },

  button: {
    height: 70,
    width: 70,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },

  textBtnSearch: {
    color: "white",
    fontSize: 40,
  },

  list: {
    flex: 8,
    backgroundColor: "black",
  },
};
