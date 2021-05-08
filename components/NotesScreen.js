import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import Note from "./Note"

const NotesScreen = () => {
  const [notesList, setNotesList] = useState([]);
  const renderItem = ({ item }) => (

    <Note noteTitle={item.title} noteDescription={item.body} />);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json =>  setNotesList(json))
  }, []);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.notesContainer}>
        <FlatList
          data={notesList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
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
});

export default NotesScreen;
