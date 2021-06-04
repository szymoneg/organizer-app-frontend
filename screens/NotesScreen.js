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
  const [username, setUsername] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getData("username").then(r => setUsername(r));
    getData("userId").then(r => setUserId(r));
  }, []);

  useEffect(() => {
    if (username !== "" && userId !== "") {
      fetchNotes();
    }
  }, [username, userId]);


  const fetchNotes = () => {
    fetch(`${config.SERVER_URL}/note/getAll/${username}`)
      .then(response => response.json())
      .then(json => {
        setNotesList(json);
        setLoaded(true);
      });
  };
  const cancelNote = () => {
    setModalAddVisible(false);
  };

  const addNote = (note) => {
    setNotesList([...notesList, note]);
    setModalAddVisible(false);
  };

  const editNote = (newNote) => {
    if (notesList.length > 1) {
      const editedList = notesList.map(note => {
        if (note.idNote === newNote.idNote) {
          return {
            ...note,
            ...newNote,
          };
        } else {
          return note;
        }
      });
      setNotesList(editedList);
    } else {
      setNotesList([newNote]);
    }
    setRefresh(!refresh);
  };

  const deleteNote = (id) => {
    let notesCopy = [...notesList];
    notesCopy = notesCopy.filter(element => element.idNote !== id);
    setNotesList(notesCopy);
  };

  return (
    <View style={styles.mainContainer}>
      <Background />
      {loaded && <SafeAreaView style={styles.notesContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {notesList.map(item => {
            return (<Note noteTitle={item.titleNote}
                          noteDescription={item.descriptionNote}
                          userId={userId}
                          idNote={item.idNote}
                          fnEdit={editNote}
                          fnDelete={deleteNote}
                          key={item.idNote} />);
          })}
        </ScrollView>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalAddVisible(true)}>
          <Icon name="plus" size={30} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>}
      <NoteAddModal visible={modalAddVisible} fnCancel={cancelNote} userId={userId} fnAdd={addNote}
                    length={notesList.length} />
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
