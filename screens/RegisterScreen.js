import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from 'react-native';
import TextInputComponet from "../components/TextInputComponent";
import Footer from "../components/FooterComponent"
import ButtonComponent from "../components/ButtonComponent"
import 'react-native-gesture-handler'
import Background from '../components/Backgorund';

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
      <Background/>
      <View style={styles.logo}>
        <Image source = {require('../assets/logo.png')} style={{resizeMode: 'contain', width: 150, height: 150}}/>
      </View>
      <View style = {styles.loginView}>
        <TextInputComponet title='login' onChangeText={(value) => setLogin(value)} secureTextEntry={false}/>

        <TextInputComponet title='email' onChangeText={(value) => setEmail(value)} secureTextEntry={false}/>

        <TextInputComponet title='password' onChangeText={(value) => setPassword(value)} secureTextEntry={true}/>

        <TextInputComponet title='repeat password' onChangeText={(value) => setPassword2(value)} secureTextEntry={true}/>

        <ButtonComponent login="XDD" password="XD" title="Register!" goto='Login'/>

        <Text style={{color: 'white', fontSize: 18}}>Do you have already account? </Text>

        <TouchableOpacity onPress={() => {
              console.log("signup")
              navigation.navigate('Login')
            }}>
                  <Text style={{color: 'lightblue', fontSize: 18, fontWeight: 'bold',}}> Log in!</Text>
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
      textButton:{
        flex: 1,
        fontSize: 20,
        color: "white"
      },
      buttonSend: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(255, 128, 128, 0.9)',
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
        marginTop: 70,
      },
      loginView: {
        flex: 3,
        width: "100%",
        marginTop: 10,
        alignItems: 'center',
        justifyContent: "flex-start"
      }
})