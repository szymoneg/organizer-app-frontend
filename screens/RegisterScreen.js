import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from 'react-native';
import TextInputComponet from "../components/TextInputComponent";
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
    <View style = {styles.container}>
      <View style={styles.logo}>
        <Image source = {require('../assets/logo.jpeg')}/>
      </View>
      <View style = {styles.loginView}>
        <TextInputComponet title='login' onChangeText={(value) => setLogin(value)} placeholder='Login' secureTextEntry={false}/>

        <TextInputComponet title='email' onChangeText={(value) => setEmail(value)} placeholder='Email' secureTextEntry={false}/>

        <TextInputComponet title='password' onChangeText={(value) => setPassword(value)} placeholder='password' secureTextEntry={true}/>

        <TextInputComponet title='Repeat password' onChangeText={(value) => setPassword2(value)} placeholder='password' secureTextEntry={true}/>

        <TouchableOpacity style={styles.buttonSend} onPress={() => {
            navigation.navigate('Login')
            sendRegisterData()
            } }>
          <Text style = {{fontSize: 20}}>Log in!</Text>
        </TouchableOpacity>

      </View>
      <Footer/>
      
    </View>
  );
}

export default RegisterScreen;

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
        marginTop: 70,
        alignItems: 'center',
        justifyContent: "flex-start"
      }
})