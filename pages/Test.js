import { Text, View, FlatList } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Image } from "react-native";

export default Details = ({ navigation, route }) => {
  const getGameData = (slug) => {
    const apiKey = "f08ae4dc2278460e8d6fb51f41066f0b";

    const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;

    console.log(slug);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      })
      .catch(() => {
        alert("you are a debilous !!! ");
      });
  };

  const [slug, setSlug] = useState(route.params.slug);
  const [game, setGame] = useState([]);


  useEffect(()=>{
      getGameData(route.params.slug)
  }, [])
  return (

    <View style={{flex:1}}>
      <View style={{flex:1, backgroundColor:'blue'}}></View>
      <View style={{flex:2, backgroundColor:'green'}}></View>
      <View style={{flex:3, backgroundColor:'red'}}></View>
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
