import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ECLEODEV.</Text>
      <Image source={{uri:"https://images.unsplash.com/photo-1750672951701-b9dcb289ea29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"}}
        style={{ width: 200, height: 200, borderRadius: 100 }}
        contentFit="cover"
        transition={1000}
        alt="A beautiful image from Unsplash"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
})