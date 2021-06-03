import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import Note from "../components/Note";
import NoteAddModal from "../components/NoteAddModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Background from "../components/Backgorund";
import config from "../service/config";
import { getData } from "../service/AsyncStorage";

const NotesScreen = () => {
  const [notesList, setNotesList] = useState([]);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [lastId, setLastId] = useState(0);
  const [username, setUsername] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData("username").then(r => setUsername(r));
  }, []);

  useEffect(() => {
    if (username !== "") {
      fetchNotes();
    }
  }, [username]);


  const fetchNotes = () => {
    fetch(`${config.SERVER_URL}note/getAll/${username}`)
      .then(response => response.json())
      .then(json => {
        console.log(username + "xxxdd");
        console.log(json);
        return json;
      })
      .then(json => {
        setNotesList(json);
        setLoaded(true);
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
      editedList.splice(note.id, 1, note);
      setNotesList(editedList);
    } else {
      setNotesList([note]);
    }
    setRefresh(!refresh);
  };

  const deleteNote = (index) => {
    let notesCopy = [...notesList];
    notesCopy.splice(index, 1);
    setNotesList(notesCopy);
  };

  return (
    <View style={styles.mainContainer}>
      <Background />
      {loaded && <SafeAreaView style={styles.notesContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {notesList.map((item, index) => {
            return (<Note noteTitle={item.titleNote}
                          noteDescription={item.descriptionNote}
              // idNote={index}
                          fnEdit={editNote}
                          fnDelete={deleteNote}
                          key={index} />);
          })}
        </ScrollView>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalAddVisible(true)}>
          <Icon name="plus" size={30} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>}
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
