import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import Note from "../components/Note";
import NoteAddModal from "../components/NoteAddModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Background from "../components/Backgorund";

const NotesScreen = () => {
  const [notesList, setNotesList] = useState([]);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [refresh, setRefresh] = useState(true)
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    fetchNotes();
    // setLastId(notesList[notesList.length].id)
  }, []);

  const fetchNotes = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        json.length = 10;
        return json;
      })
      .then(json => {
        setNotesList(json);

      });
  };
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
      editedList.splice(note.id , 1, note);
      setNotesList(editedList);
    } else {
      setNotesList([note]);
    }
    setRefresh(!refresh)
  };

  const deleteNote = (index) => {
    let notesCopy = [...notesList]
    notesCopy.splice(index, 1)
    setNotesList(notesCopy);
  };

  return (
    <View style={styles.mainContainer}>
      <Background/>
      <SafeAreaView style={styles.notesContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {notesList.map((item, index) => {
            return (<Note noteTitle={item.title}
                          noteDescription={item.body}
                          idNote={index}
                          fnEdit={editNote}
                          fnDelete={deleteNote}
                          key={index} />);
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
    backgroundColor: "rgba(255,255,255,1)",
  },
  notesContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 54,
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    width: 54,
    height: 54,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,1)",
    bottom: 12,
    right: 12,
    position: "absolute",
    elevation: 16,
  },
});

export default NotesScreen;
