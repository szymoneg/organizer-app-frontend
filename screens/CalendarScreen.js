import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import 'react-native-gesture-handler'

const MainScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={{fontSize:26}}>Calendar Screen</Text>
        <Text>Work in progress...</Text>
    </View>
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
