import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import 'react-native-gesture-handler'
import CalendarComponent from "../components/CalendarComponent";

const MainScreen = () => {
  return (
    <CalendarComponent/>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})
