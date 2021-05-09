import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal, TextInput } from "react-native";

const NoteEditModal = (props) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const { visible, fnCancel, fnEdit, idNote, title, desc } = props;

  useEffect(() => {
    setNoteTitle(title);
    setNoteDescription(desc);
  }, [visible]);

  const checkFields = () => {

    let note = {
      title: noteTitle,
      body: noteDescription,
      id: idNote,
    };
    if (noteTitle === "") {
      //TODO add toast
    } else {
      //fetch here
      fnEdit(note);
      fnCancel();
    }
  };
  return (
    <Modal visible={visible}>
      <View style={styles.modalView}>
        <View>
          <TextInput style={styles.inputTitleField}
                     placeholder={"Title"}
                     onChangeText={setNoteTitle}
                     value={noteTitle} />
          <TextInput style={styles.inputDescField}
                     multiline
                     placeholder={"Description"}
                     onChangeText={setNoteDescription}
                     value={noteDescription} />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.openButton}
                            onPress={() => fnCancel()}>
            <Text style={{ color: "#ffffff" }}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.openButton}
                            onPress={() => checkFields()}>
            <Text style={{ color: "#ffffff" }}>Save</Text>
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
    backgroundColor: "#1061d4",
    width: 120,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputTitleField: {
    height: 40,
    borderWidth: 1,
    marginTop: 16,
    padding: 8,
  },
  inputDescField: {
    height: 240,
    borderWidth: 1,
    marginTop: 16,
    padding: 8,
    textAlignVertical: "top",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default NoteEditModal;
