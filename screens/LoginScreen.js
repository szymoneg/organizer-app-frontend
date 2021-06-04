import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import TextInputComponent from "../components/TextInputComponent";
import Footer from "../components/FooterComponent";
import Background from "../components/Backgorund";
import "react-native-gesture-handler";
import { storeData } from "../service/AsyncStorage";
import config from "../service/config";
import LinearGradient from "react-native-linear-gradient";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginData = () => {    

    fetch(`${config.SERVER_URL}/user/login`, {
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
        if (response.status !== 200) {
          console.log("nie zalogowano" + response.status);
          Alert.alert(response.status.toString(), "Nie zalogowano");
          navigation.navigate("Register");
          return "empty token";
        } else {
          storeData("username", username).then();
          navigation.navigate("Main");
          return response.json();
        }
      })
      .then(json => {
        storeData("token", json.token).then();
        storeData("userId", json.userId.toString()).then();
      });
  };

  const forgotPasswordHandler = () => {
    console.log("ForgotPassword");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logo}>
          <Image source={require("../assets/logo.png")} style={{ resizeMode: "contain", width: 150, height: 150 }} />
        </View>
        <View style={styles.loginView}>
          <TextInputComponent title="Login" onChangeText={(value) => setUsername(value)} placeholder="Login"
                              secureTextEntry={false} />

          <TextInputComponent title="Password" onChangeText={(value) => setPassword(value)} placeholder="Password"
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

          <Text style={{ color: "white", fontSize: 18 }}>Don't have an account?</Text>

          <TouchableOpacity onPress={() => {
            console.log("signup");
            navigation.navigate("Register");
          }}>
            <Text style={{ color: "lightblue", marginTop: 12, fontSize: 18, fontWeight: "bold" }}> Sign up!</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
  },
});
