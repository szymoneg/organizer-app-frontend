import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

export default class TextInputComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
            <Text style = {{fontSize: 20, color:'white'}}>{this.props.title} </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    input : {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding: 8,
        marginTop: 10,
        marginBottom: 10,
        width: 300,
        height: 50,
        fontSize: 16
      },

})
