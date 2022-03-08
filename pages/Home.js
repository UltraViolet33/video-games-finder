import React from "react";
import { useState, useEffect } from "react";
import {
  Pressable,
  Image,
  FlatList,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

export default Home = ({navigation}) => {
  const [games, setGames] = useState([
    // { id: 1, name: "Jeux 1", rating: 4.6 },
    // { id: 2, name: "Jeux 2", rating: 3.5 },
    // { id: 3, name: "Jeux 3", rating: 4.2 },
    // { id: 4, name: "Jeux 4", rating: 1.5 },
    // { id: 5, name: "Jeux 5", rating: 3.7 },
    // { id: 6, name: "Jeux 6", rating: 5 },
  ]);

  const [searchText, setSearchText] = useState("");

  const handleButton = () => {
    const apiKey = "f08ae4dc2278460e8d6fb51f41066f0b";

    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(
      searchText
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGames(data.results);
      })
      .catch(() => {
        alert("you are a debilous !!! ");
      });
  };

  const handleClick = (slug) => {
    navigation.push('Test', {slug});
  };
  return (
    <View style={style.page}>
      <View style={style.searchBar}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={style.searchInput}
        ></TextInput>
        <Button title="Chercher" onPress={handleButton}></Button>
      </View>
      {/* <Text>{searchText}</Text> */}
      <FlatList
        style={style.list}
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
              <View>
                <Text>{item.name}</Text>
                <Text>Notes : {item.rating}</Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

const style = {
  page: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 10,
  },
  list: {
    flex: 1,
  },
  listItem: {
    margin: 2,
    padding: 2,
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
  },
  listImage: {
    width: 60,
    resizeMode: "center",
    marginRight: 10,
  },
};
