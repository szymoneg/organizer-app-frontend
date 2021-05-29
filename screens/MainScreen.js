import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Background from "../components/Backgorund";
import ButtonMenu from "../components/ButtonMenu";

const MainScreen = ({ navigation }) => {
  const [username, setUsername] = useState("Tom");

  const logout = () => {
    //TODO logout
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Background />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome {username}</Text>
        </View>
        <View style={styles.scrollCont}>
          <ButtonMenu title={"Notes"} icon={"note-text"} onPress={() => {
            navigation.navigate("Notes");
          }} />
          <ButtonMenu title={"Calendar"} icon={"calendar-multiselect"} onPress={() => {
            navigation.navigate("Calendar");
          }} />
          <ButtonMenu title={"Settings"} icon={'cog'} onPress={() => {
            navigation.navigate("Settings");
          }} />
          <ButtonMenu title={"Log out"} icon={'exit-run'} onPress={() => logout()} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollCont: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 24,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  headerText: {
    color: "#fff",
    fontSize: 32,
  },
});
