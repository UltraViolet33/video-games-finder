import { Text, View } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import { useEffect } from "react";

export default Shop = ({ navigation, route }) => {

  const getDataApi = () => {
    const url = `https://www.formacitron.com/gps-api/selection.json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //setGames(data.results);
        console.log(data);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  useEffect(() => {
    getDataApi()
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Recherche de villes</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
