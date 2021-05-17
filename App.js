import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text } from "react-native";

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import MainScreen from './screens/MainScreen'
import NotesScreen from "./screens/NotesScreen";
import CalendarScreen from "./screens/CalendarScreen"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator tabBarOptions ={{
      showLabel: false, 
      style: {
        backgroundColor: '#31132f',
        height: 90
        }}}>
      <Tab.Screen name="Main" component={MainScreen} options={{
       tabBarIcon: () => <View style={styles.viewBar}>
          <Icon name="home" size={45} color="rgba(255,255,255,0.9)" />
          <Text style={styles.textBar}>Home</Text>
         </View>
      }}/>
      <Tab.Screen name="Notes" component={NotesScreen} options={{
       tabBarIcon: () => <View style={styles.viewBar}>
          <Icon name="note-text" size={45} color="rgba(255,255,255,0.9)" />
          <Text style={styles.textBar}>Notes</Text>
         </View>
      }}/>
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{
       tabBarIcon: () => <View style={styles.viewBar}>
          <Icon name="calendar-multiselect" size={45} color="rgba(255,255,255,0.9)" />
          <Text style={styles.textBar}>Calendar</Text>
         </View>
      }}/>
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Register">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Main" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;


const styles = StyleSheet.create({
  viewBar:{
    marginTop: 20, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  textBar:{
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)'
  }
})