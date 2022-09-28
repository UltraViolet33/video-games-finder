import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import haversine from "haversine-distance";

export default function Shop() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cities, setCities] = useState(null);

  const getDataApi = () => {
    const url = `https://www.formacitron.com/gps-api/selection.json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((e) => {
        alert(e.message);
        setErrorMsg("Pas de villes trouvées");
      });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getDataApi();
    })();
  }, []);

  let text = "Attends on cherche...........";

  if (errorMsg) {
    text = errorMsg;
  } else if (location && cities) {
    //text = JSON.stringify(location);
    //console.log(location);

    const a = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    let b = { latitude: cities[0].gps_lat, longitude: cities[0].gps_lng };
    let min = haversine(a, b);
    city = "";

    for (let i = 1; i < cities.length; i++) {
      b = { latitude: cities[i].gps_lat, longitude: cities[i].gps_lng };

      if (haversine(a, b) < min) {
        min = haversine(a, b);
        city = cities[i].name;
        //console.log(cities[i].name);
      }
    }
    console.log("city  : ", city);
    text = "Magasin le plus proche : " + city;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Magasin le plus proche</Text>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  title:{
    fontSize:30,
    textAlign:'center',
  },

  paragraph:{
    textAlign:"center",
    margin:10,
  }
});
