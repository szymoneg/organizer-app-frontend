import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ButtonMenu(props: { onPress: (() => void) | any }) {
  const {title, icon, onPress} = props
  return (
    <TouchableOpacity style={styles.menuButt} onPress={onPress}>
      <Icon name={icon} size={96} color={'#fff'}/>
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  menuButt: {
    width: 170,
    height: 170,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 24,
    backgroundColor: "rgba(255, 128, 128, 1)",
    borderRadius: 5,
  },
  menuText: {
    color: "#fff",
    fontSize: 20,
  },
});
