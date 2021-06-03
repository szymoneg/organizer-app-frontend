import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Alert } from "react-native";
import TextInputComponent from "../components/TextInputComponent";
import Footer from "../components/FooterComponent";
import Background from "../components/Backgorund";
import "react-native-gesture-handler";
import { storeData } from "../service/AsyncStorage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginData = () => {
    console.log(username + " " + password);

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => {
        if(response.status !== 200) {
          console.log("nie zalogowano" + response.status);
          Alert.alert(response.status, "Nie zalogowano")
          navigation.navigate("Register");
          return "empty token"
        }else {
          storeData('username', username)
            .then(r => console.log("dodano!"))
          navigation.navigate("Main")
          return response.json()
        }
      })
      .then(json => {
        storeData('token', json.token)
          .then(r => console.log(json.token))
      })
  };

  const forgotPasswordHandler = () => {
    console.log("ForgotPassword");
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.logo}>
        <Image source={require("../assets/logo.png")} style={{ resizeMode: "contain", width: 150, height: 150 }} />
      </View>
      <View style={styles.loginView}>
        <TextInputComponent title="login" onChangeText={(value) => setUsername(value)} placeholder="Login"
                            secureTextEntry={false} />

        <TextInputComponent title="password" onChangeText={(value) => setPassword(value)} placeholder="password"
                            secureTextEntry={true} />

        <TouchableOpacity onPress={() => {
          forgotPasswordHandler();
        }}>
          <Text style={{ color: "white", textAlign: "right" }}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSend} onPress={() => {
          sendLoginData();
        }}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 18 }}>Don't have account? </Text>

        <TouchableOpacity onPress={() => {
          console.log("signup");
          navigation.navigate("Register");
        }}>
          <Text style={{ color: "lightblue", fontSize: 18, fontWeight: "bold" }}> Sign up!</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  },
  logo: {
    flex: 1,
    width: 150,
    height: 150,
    marginTop: 64,
  },
  loginView: {
    flex: 3,
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
