import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const title = "My first note";
const dsc =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis rutrum egestas. Fusce orci sem, pellentesque a turpis sit amet, suscipit bibendum orci. Vivamus eu purus dapibus, fermentum libero eget, vehicula eros. Curabitur ut facilisis purus. Nullam ut purus a leo viverra bibendum sed eu leo.";

const Note = (props) => {
  const [noteTitle, setNoteTitle] = useState("Title");
  const [noteDescription, setNoteDescription] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { titleP, dscP } = props;

  return (
    <View style={styles.noteContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text>edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.expandButton} onPress={() => setExpanded(!expanded)}>
          <Text style={styles.titleText}>{title}</Text>
          <View><Text>expand</Text></View>
        </TouchableOpacity>
      </View>
      {expanded && <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{dsc}</Text>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flex: 1,
    borderWidth: 1,
  },
  titleContainer: {
    flex: 0,
    flexDirection: "row",
    padding: 12,
  },
  titleText: {
    fontSize: 18,
  },
  editButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  expandButton: {
    flex: 3,
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
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
