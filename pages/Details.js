import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../reducers/actions";
import { gameServices } from "../services/game.services";

export const Details = ({ route }) => {
  const bookmarks = useSelector(state => state.bookmarks);
  const dispatch = useDispatch();
  const [game, setGame] = useState({});

  const handlePressAdd = () => {
    dispatch({
      type: actions.ADD_BOOKMARK,
      payload: {
        slug: game.slug,
        name: game.name,
        rating: game.rating,
        background_image: game.background_image,
        id: game.id,
      },
    });
  };

  const handlePressRemove = () => {
    dispatch({
      type: actions.REMOVE_BOOKMARK,
      payload: {
        id: game.id,
      },
    });
  };

  const isBookmarked = () =>
    bookmarks.find(bookmark => bookmark.id == game.id) !== undefined;

  const regex = /(<([^>]+)>)/gi;

  const getGameData = () => {
    const slug = route.params.slug;

    gameServices
      .getGameDetails(slug)
      .then(data => {
        data.description = data.description.replace(regex, "");
        setGame(data);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  useEffect(() => {
    getGameData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.name}>{game.name}</Text>
        <View style={styles.info}>
          <Image style={styles.image} source={{ uri: game.background_image }} />
          <Text>Name : {game.name}</Text>
          <Text>Date released : {game.released}</Text>
          <Text>Notes : {game.rating}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Game description :</Text>
          <Text style={styles.descriptionText}>{game.description}</Text>
        </View>
        {isBookmarked() ? (
          <Button title="⭐ Retirer" onPress={handlePressRemove}></Button>
        ) : (
          <Button title="⭐ Ajouter" onPress={handlePressAdd}></Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
  },

  name: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },

  info: {
    alignItems: "center",
    flex: 2,
    margin: 10,
    padding: 10,
  },

  image: {
    resizeMode: "cover",
    height: 250,
    width: 400,
  },

  descriptionContainer: {
    flex: 2,
  },

  descriptionTitle: {
    fontSize: 22,
    textAlign: "center",
    paddingBottom: 5,
    fontWeight: "bold",
  },

  descriptionText: {
    fontSize: 17,
    textAlign: "justify",
    padding: 10,
  },
});
