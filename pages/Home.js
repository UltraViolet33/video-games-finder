import React from "react";
import { useState } from "react";
import {
  Pressable,
  Image,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import config from "../config";
import { useDispatch, useSelector } from "react-redux";

export default Home = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [searchText, setSearchText] = useState("");

  const bookmarks = useSelector((state) => state.bookmarks);

  const handleButton = () => {
    const url = `https://api.rawg.io/api/games?key=${
      config.configAPI
    }&search=${encodeURI(searchText)}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGames(data.results);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const isBookmarked = (game) =>
    bookmarks.find((bookmark) => bookmark.id == game.id) !== undefined;

  const handleClick = (slug) => {
    navigation.push("Details", { slug });
  };
  return (
    <View style={style.page}>
      <Button title="Recherche" onPress={() => {
            navigation.push("Shop");
          }}></Button>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 25,
          marginTop: 15,
        }}
      >
        You can search any games !
      </Text>
      <View style={style.searchBar}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={style.searchInput}
        ></TextInput>
        <TouchableOpacity style={style.button} onPress={handleButton}>
          <Text style={{ color: "white", fontSize: 40 }}>🔍</Text>
        </TouchableOpacity>
      </View>
      <View style={style.list}>
        <FlatList
          data={games}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                handleClick(item.slug);
              }}
            >
              <View style={style.listItem}>
                <Image
                  source={{ uri: item.background_image }}
                  style={style.listImage}
                ></Image>
                <View style={style.description}>
                  <Text style={style.name}>{item.name}</Text>
                  <Text
                    style={
                      item.rating <= 3
                        ? style.itemRBadRating
                        : style.itemGoodRating
                    }
                  >
                    Notes : {item.rating}
                  </Text>
                  {isBookmarked(item) ? (
                    <Text>⭐</Text>
                  ) : <Text></Text>
                   }
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        ></FlatList>
        <Button
          title="Mes jeux"
          onPress={() => {
            navigation.push("Bookmarks");
          }}
        ></Button>
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

  listItem: {
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
    height: 100,
    margin: 8,
    borderRadius: 10,
    alignItems: "center",
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

  listImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 10,
    borderRadius: 10,
  },
};
