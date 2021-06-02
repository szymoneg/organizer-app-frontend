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

          <ButtonComponent login="XDD" password="XD" title="Register!" goto="Login" navigation={navigation} />

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
});
