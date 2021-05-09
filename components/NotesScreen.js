import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from "react-native";
import Note from "./Note";
import NoteAddModal from "./NoteAddModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const NotesScreen = () => {
  const [notesList, setNotesList] = useState([]);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        json.length = 10;
        return json;
      })
      .then(json => setNotesList(json));
  }, []);

  const cancelNote = () => {
    setModalAddVisible(false);
  };

  const addNote = (note) => {
    if (notesList.length > 0) {
      setNotesList(oldNotesList => [...oldNotesList, note]);
    } else {
      setNotesList([note]);
    }
    setModalAddVisible(false);
  };

  const editNote = (note) => {
    if (notesList.length > 1) {
      let editedList = notesList;
      editedList.splice(note.id - 1, 1, note);
      setNotesList(editedList);
    } else {
      setNotesList([note]);
    }
    setRefresh(!refresh);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.notesContainer}>
        <ScrollView>
          {notesList.map((item, id) => {
            return (<Note noteTitle={item.title} noteDescription={item.body} idNote={item.id} fnEdit={editNote} key={item.id} />);
          })}
        </ScrollView>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalAddVisible(true)}>
          <Icon name="plus" size={30} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>
      <NoteAddModal visible={modalAddVisible} fnCancel={cancelNote} fnAdd={addNote} length={notesList.length} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  notesContainer: {
    flex: 1,
  },
  buttonAdd: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: "white",
    alignSelf: "flex-end",
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});

export default NotesScreen;
