import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import TextInputComponent from "../components/TextInputComponent";
import Footer from "../components/FooterComponent"
import Background from "../components/Backgorund"
import ButtonComponent from "../components/ButtonComponent";
import 'react-native-gesture-handler'

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState('Szymon')
  const [age, setAge] = useState('30')

  const sendLoginData = (login, password) => {
    console.log(password + " " +login);
  }

  const forgotPasswordHandler = () => {
    console.log("ForgotPassword");
  }

  return (
      <View style = {styles.container}>
        <Background/>
          <View style={styles.logo}>
            <Image source = {require('../assets/logo.png')} style={{resizeMode: 'contain', width: 150, height: 150}}/>
          </View>
          <View style = {styles.loginView}>
            <TextInputComponent title='login' onChangeText={(value) => setName(value)} placeholder='Login' secureTextEntry={false}/>

            <TextInputComponent title='password' onChangeText={(value) => setName(value)} placeholder='password' secureTextEntry={true}/>

            <TouchableOpacity onPress={() => {forgotPasswordHandler()}}>
              <Text style={{color: 'white', textAlign:'right'}}>Forgot your password?</Text>
            </TouchableOpacity>

            <ButtonComponent login="XDD" password="XD" title="Log in!" goto='Main'></ButtonComponent>

            <Text style={{color: 'white', fontSize: 18}}>Don't have account? </Text>

            <TouchableOpacity onPress={() => {
              console.log("signup")
              navigation.navigate('Register')
            }}>
                  <Text style={{color: 'lightblue', fontSize: 18, fontWeight: 'bold',}}> Sign up!</Text>
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
    alignItems: "center",
    justifyContent: "center"
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
    alignItems: 'center',
    justifyContent: "flex-start"
  },
  image: {
    flex: 1,
    width: "100%",
  },
})
