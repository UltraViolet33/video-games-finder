import React from "react";
import { useState } from "react";
import {
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { configAPI } from "../config";
import { Game } from "../components/Game";

export const Home = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleButton = () => {
    const url = `https://api.rawg.io/api/games?key=${configAPI}&search=${encodeURI(
      searchText
    )}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setGames(data.results);
      })
      .catch(e => {
        alert(e.message);
      });
  };

  return (
    <View style={style.page}>
      <Button
        title="Recherche"
        onPress={() => {
          navigation.push("Shop");
        }}></Button>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 25,
          marginTop: 15,
        }}>
        You can search any games !
      </Text>
      <View style={style.searchBar}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={style.searchInput}></TextInput>
        <TouchableOpacity style={style.button} onPress={handleButton}>
          <Text style={{ color: "white", fontSize: 40 }}>🔍</Text>
        </TouchableOpacity>
      </View>
      <View style={style.list}>
        <FlatList
          data={games}
          renderItem={({ item }) => <Game game={item} />}
          keyExtractor={item => item.id}></FlatList>
        <Button
          title="Mes jeux"
          onPress={() => {
            navigation.push("Bookmarks");
          }}></Button>
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

  list: {
    flex: 8,
    backgroundColor: "black",
  },
};
