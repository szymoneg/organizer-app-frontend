import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal, TextInput } from "react-native";
import Background from "./Backgorund";

const NoteAddModal = (props) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const { visible, fnCancel, fnAdd, length } = props;


  const checkFields = () => {

    let note = {
      title: noteTitle,
      body: noteDescription,
      //TODO change for appropriate id
      // id: length + 1,
    };
    if (noteTitle === "") {
      //TODO add toast
    } else {
      //fetch here
      // console.log(length)
      fnAdd(note);
    }
  };
  return (
    <Modal visible={visible} transparent={true} onRequestClose={() => fnCancel()}>

      <View style={styles.modalView}>
        <Background />
        <View>
          <TextInput style={styles.inputTitleField}
                     placeholder={"Title"}
                     onChangeText={setNoteTitle} />
          <TextInput style={styles.inputDescField}
                     multiline
                     placeholder={"Description"}
                     onChangeText={setNoteDescription} />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.openButton}
                            onPress={() => fnCancel()}>
            <Text>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.openButton}
                            onPress={() => checkFields()}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingHorizontal: 28,
    paddingTop: 24,
    width: "100%",
    height: "100%",
  },
  openButton: {
    backgroundColor: "rgba(250,250,250,1)",
    width: 120,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: .5,
    elevation: 8,
  },
  inputTitleField: {
    borderRadius: 12,
    height: 40,
    borderWidth: 1,
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 12,
    elevation: 4,
  },
  inputDescField: {
    borderRadius: 12,
    height: 240,
    borderWidth: 1,
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 12,
    textAlignVertical: "top",
    elevation: 4,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default NoteAddModal;
