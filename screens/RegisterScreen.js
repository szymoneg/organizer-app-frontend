import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image, Button, ScrollView } from "react-native";
import TextInputComponent from "../components/TextInputComponent";
import Footer from "../components/FooterComponent";
import ButtonComponent from "../components/ButtonComponent";
import "react-native-gesture-handler";
import Background from "../components/Backgorund";

const RegisterScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const sendRegisterData = () => {
    console.log("DD");
    if (password === password2){

    }else {
      Alert.alert("Title","Password does not match!")
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <Background />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logo}>
          <Image source={require("../assets/logo.png")}
                 style={{resizeMode: "contain", width: 150, height: 150 }} />
        </View>
        <View style={styles.loginView}>
          <TextInputComponent title="Login" onChangeText={(value) => setLogin(value)} secureTextEntry={false} />

          <TextInputComponent title="Email" onChangeText={(value) => setEmail(value)} secureTextEntry={false} />

          <TextInputComponent title="Password" onChangeText={(value) => setPassword(value)} secureTextEntry={true} />

          <TextInputComponent title="Confirm password" onChangeText={(value) => setPassword2(value)}
                              secureTextEntry={true} />

                  <TouchableOpacity style={styles.buttonSend} onPress={() => {
          sendRegisterData();
        }}>
          <Text style={styles.textButton}>Register</Text>
        </TouchableOpacity>

          <Text style={{ color: "white", fontSize: 18 }}>Have an account?</Text>

          <TouchableOpacity onPress={() => {
            console.log("signup");
            navigation.navigate("Login");
          }}>
            <Text style={{ color: "lightblue", marginTop:12, fontSize: 18, fontWeight: "bold" }}> Log in!</Text>
          </TouchableOpacity>

        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
container: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 32,
  },
  loginView: {
    flex: 1,
    marginTop: 12,
    alignItems: "center",
  },
  textButton: {
    flex: 1,
    fontSize: 20,
    color: "white",
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
  }
});
