import React, { useState } from "react";
import {StyleSheet, View } from "react-native";
import Note from "./Note";


const NotesScreen = () => {
  const [notesList, setNotesList] = useState([]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.notesContainer}>
        <Note/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  notesContainer: {
    flex: 1,
  },
});

export default NotesScreen;
