import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class FooterComponent extends React.Component{
    render(){
        return(
            <View style={styles.footer}>
                <Text>Szymon Biliński & Andrzej Osika ®</Text>
            </View>   
        )
    }
}

const styles = StyleSheet.create({
    footer : {
        width: '100%',
        height: 50,
        backgroundColor: 'gray',
        justifyContent: "center",
        alignItems: 'center'
      }, 
})