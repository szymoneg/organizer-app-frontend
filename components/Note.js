import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Note = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { noteTitle, noteDescription } = props;
  const [titleSize, setTitleSize] = useState(1)

  const expandNote = () =>{
    setExpanded( prevExpanded => !prevExpanded);
    setTitleSize(!expanded ? 0 : 1);
  }

  return (
    <View style={styles.noteContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="pencil" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.expandButton} onPress={() => expandNote()}>
          <View style={styles.titleView}>
            <Text style={styles.titleText} numberOfLines={titleSize}>{noteTitle}</Text>
          </View>

          <View><Icon name="chevron-down" size={30} color="#000" /></View>
        </TouchableOpacity>
      </View>
      {expanded && <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{noteDescription}</Text>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flex: 1,
    borderWidth: 1,
    marginTop: 24,
    marginHorizontal: 24,
  },
  titleContainer: {
    flex: 0,
    flexDirection: "row",
  },
  titleText: {
    fontSize: 18,
  },
  titleView: {
    flex: 1,
  },
  editButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  expandButton: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  descriptionContainer: {
    flex: 1,
    padding: 12,
    borderTopWidth: 1,
  },
  descriptionText: {
    fontSize: 14,
  },
});

export default Note;
