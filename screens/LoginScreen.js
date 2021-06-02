import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import TextInputComponent from "../components/TextInputComponent";
import Footer from "../components/FooterComponent";
import Background from "../components/Backgorund";
import ButtonComponent from "../components/ButtonComponent";
import "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("Szymon");
  const [age, setAge] = useState("30");

  const sendLoginData = (login, password) => {
    console.log(password + " " + login);
  };

  const forgotPasswordHandler = () => {
    console.log("ForgotPassword");
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <Background />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logo}>
          <Image source={require("../assets/logo.png")} style={{ resizeMode: "contain", width: 150, height: 150 }} />
        </View>
        <View style={styles.loginView}>
          <TextInputComponent title="Login" onChangeText={(value) => setName(value)} placeholder="Login"
                              secureTextEntry={false} />

          <TextInputComponent title="Password" onChangeText={(value) => setName(value)} placeholder="Password"
                              secureTextEntry={true} />

          <TouchableOpacity onPress={() => {
            forgotPasswordHandler();
          }}>
            <Text style={{ color: "white", textAlign: "right" }}>Forgot your password?</Text>
          </TouchableOpacity>

          <ButtonComponent login="XDD" password="XD" title="Log in!" goto="Main" navigation={navigation} />

          <Text style={{ color: "white", fontSize: 18 }}>Don't have an account?</Text>

          <TouchableOpacity onPress={() => {
            console.log("signup");
            navigation.navigate("Register");
          }}>
            <Text style={{ color: "lightblue", marginTop: 12, fontSize: 18, fontWeight: "bold" }}> Sign up!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
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
});
