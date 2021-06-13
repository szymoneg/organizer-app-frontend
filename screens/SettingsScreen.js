import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import TextInputComponent from "../components/TextInputComponent";
import Background from "../components/Backgorund";
import config from "../service/config.json";

const SettingsScreen = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(route.params.username);
  }, []);
  useEffect(() => {
    if (username !== "") {
      fetchUser();
    }
  }, [username]);

  const fetchUser = () => {
    fetch(`${config.SERVER_URL}/user/details/${username}`)
      .then(response => response.json())
      .then(json => {
        setName(json.name);
        setSurname(json.surname);
        json.phoneNumber === 0 ? setPhoneNumber("") : setPhoneNumber(json.phoneNumber.toString());
      });
  };

  const updateData = () => {
    let user = {
      username: username,
      name: name,
      surname: surname,
      phoneNumber: phoneNumber,
    };
    fetch(`${config.SERVER_URL}/user/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => {
      navigation.navigate("Main");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <ScrollView>
        <View style={styles.scrollCont}>
          <Text style={styles.headerText}>Edit your data</Text>
          <TextInputComponent title="Name" onChangeText={(value) => setName(value)} placeholder="Name" value={name} />
          <TextInputComponent title="Surname" onChangeText={(value) => setSurname(value)} placeholder="Surname"
                              value={surname} />
          <TextInputComponent title="Phone number" onChangeText={(value) => setPhoneNumber(value)}
                              placeholder="123456789"
                              value={phoneNumber} />
          <TouchableOpacity style={styles.buttonSend} onPress={() => updateData()}>
            <Text style={styles.textButton}>Update your data</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Reset your password</Text>
          <TouchableOpacity style={styles.buttonSend} onPress={() => {
            navigation.navigate("Login");
          }}>
            <Text style={styles.textButton}>Reset</Text>
          </TouchableOpacity>
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
  buttonSend: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 128, 128, 0.9)",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    height: 50,
    width: 300,
  },
  textButton: {
    flex: 1,
    fontSize: 20,
    color: "white",
  },

});

export default SettingsScreen;
