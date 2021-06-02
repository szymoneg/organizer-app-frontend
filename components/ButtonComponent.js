import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class ButtonComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
            <TouchableOpacity style={styles.buttonSend} onPress={() => {
              this.props.navigation.navigate(this.props.goto)
              //sendLoginData(this.props.login, props.password)
              }}>
              <Text style = {styles.textButton}>{this.props.title}</Text>
            </TouchableOpacity>
            </>
        )
    }
}

const styles = StyleSheet.create({
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
        marginVertical: 24,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        height: 50,
        width: 300,
      },
})
