import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from 'react-native';
import TextInputComponent from "../components/TextInputComponent";
import Footer from "../components/FooterComponent"
import 'react-native-gesture-handler'

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState('Szymon')
  const [age, setAge] = useState('30')

  const sendLoginData = (login, password) => {
    console.log(password + " " +login);
  }

  return (
    <View style = {styles.container}>
      <View style={styles.logo}>
        <Image source = {require('../assets/logo.jpeg')}/>
      </View>
      <View style = {styles.loginView}>
        <TextInputComponent title='login' onChangeText={(value) => setName(value)} placeholder='Login' secureTextEntry={false}/>

        <TextInputComponent title='password' onChangeText={(value) => setName(value)} placeholder='password' secureTextEntry={true}/>

        <TouchableOpacity style={styles.buttonSend} onPress={() => {
          navigation.navigate('Main')
          sendLoginData(name, age)
          }}>
          <Text style = {{fontSize: 20}}>Log in!</Text>
        </TouchableOpacity>

      </View>

      <Footer/>

    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSend: {
    backgroundColor: 'grey',
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logo: {
    flex: 1,
    width: 200,
    height: 200,
    marginTop: 64,
  },
  loginView: {
    flex: 3,
    width: "100%",
    marginTop: 100,
    alignItems: 'center',
    justifyContent: "flex-start"
  }
})
