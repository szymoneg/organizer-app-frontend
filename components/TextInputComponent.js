import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

export default class TextInputComponet extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
            <Text style = {{fontSize: 20}}> Enter {this.props.title}: </Text>
                <TextInput 
                    style={styles.input}
                    placeholder={this.props.placeholder}
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
        borderColor: 'black',
        borderRadius: 5,
        padding: 8,
        marginTop: 10,
        marginBottom: 10,
        width: 300,
        height: 40,
        fontSize: 16
      },
    
})