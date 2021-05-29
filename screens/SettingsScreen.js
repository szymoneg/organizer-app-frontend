import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
import TextInputComponent from "../components/TextInputComponent";
import Background from "../components/Backgorund";
import ButtonComponent from "../components/ButtonComponent";

const SettingsScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    //TODO get form server if nonempty
    setName("Tom");
    setSurname("Jones");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <ScrollView>
        <View style={styles.scrollCont}>
          <Text style={styles.headerText}>Edit your data</Text>
          <TextInputComponent title="Name" onChangeText={(value) => setName(value)} placeholder="Name" value={name} />
          <TextInputComponent title="Surname" onChangeText={(value) => setSurname(value)} placeholder="Surname"
                              value={surname} />
          <Text style={styles.headerText}>Reset your password</Text>
          <ButtonComponent title="Reset!" goto="Login" navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollCont: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 24,
  },
  headerText: {
    color: "#fff",
    fontSize: 32,
    padding: 24,
  },

});

export default SettingsScreen;
