import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class TextInputComponent extends React.Component{
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

})
