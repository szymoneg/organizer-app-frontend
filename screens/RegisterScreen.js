import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from "react-native";
import TextInputComponent from "../components/TextInputComponent";
import Footer from "../components/FooterComponent"
import 'react-native-gesture-handler'

const RegisterScreen = ({ navigation }) => {
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const sendRegisterData = () => {
      console.log("DD")
  }

  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.logo}>
          <Image source = {require('../assets/logo.jpeg')}/>
        </View>
        <View style = {styles.loginView}>
          <TextInputComponent title='login' onChangeText={(value) => setLogin(value)} placeholder='Login' secureTextEntry={false}/>

          <TextInputComponent title='email' onChangeText={(value) => setEmail(value)} placeholder='Email' secureTextEntry={false}/>

          <TextInputComponent title='password' onChangeText={(value) => setPassword(value)} placeholder='password' secureTextEntry={true}/>

          <TextInputComponent title='Repeat password' onChangeText={(value) => setPassword2(value)} placeholder='password' secureTextEntry={true}/>

          <TouchableOpacity style={styles.buttonSend} onPress={() => {
              navigation.navigate('Login')
              sendRegisterData()
              } }>
            <Text style = {{fontSize: 20}}>Register!</Text>
          </TouchableOpacity>

        </View>
        <Footer/>

      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    scrollContainer: {
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
        width: 200,
        height: 200,
        marginTop: 64,
      },
      loginView: {
        flex: 3,
        marginTop: 64,
        marginBottom:24,
        alignItems: 'center',
        justifyContent: "flex-start"
      }
})
