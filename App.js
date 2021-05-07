import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import TextInputComponet from "./components/TextInputComponent";
import Footer from "./components/FooterComponent"

const YourApp = () => {
  const [name, setName] = useState('Szymon')
  const [age, setAge] = useState('30')

  const sendLoginData = (login, password) => {
    console.log(password + " " +login);
  }

  return (
    <View style = {styles.container}>
      <View style={styles.logo}>
        <Image source = {require('./assets/logo.jpeg')}/>
      </View>
      <View style = {styles.loginView}>
        <TextInputComponet title='login' onChangeText={(value) => setName(value)} placeholder='Login' secureTextEntry={false}/>

        <TextInputComponet title='password' onChangeText={(value) => setName(value)} placeholder='password' secureTextEntry={true}/>

        <Text> name: {name}, age: {age}</Text>

        <TouchableOpacity style={styles.buttonSend} onPress={() => sendLoginData(name, age)}>
          <Text style = {{fontSize: 20}}>Log in!</Text>
        </TouchableOpacity>

      </View>

      <Footer/>
      
    </View>
  );
}

export default YourApp;
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
    marginTop: 100,
  },
  loginView: {
    flex: 3,
    width: "100%",
    marginTop: 100,
    alignItems: 'center',
    justifyContent: "flex-start"
  }
})
