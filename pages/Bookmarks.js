import { useSelector } from "react-redux";
import { FlatList, Image, Pressable, Text, View } from "react-native";

export default Bookmarks = ({ navigation }) => {

  const games = useSelector((state) => state.bookmarks);

  const handleClick = (slug) => {
    navigation.push("Details", { slug });
  };
  
  return (
    <View style={style.page}>
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
    backgroundColor: "rgba(200,200,255,1)",
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: "rgba(255,255,255,0.5)",
    margin: 2,
    padding: 15,
    flexDirection: "row",
  },
  listImage: {
    width: 75,
    resizeMode: "center",
    marginRight: 10,
  },
};
