import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NoteEditModal from "./NoteEditModal";
import Swipeable from "react-native-gesture-handler/Swipeable";

const Note = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [titleSize, setTitleSize] = useState(1);
  const [modalEditVisible, setModalEditVisible] = useState(false);

  const { noteTitle, noteDescription, fnEdit, idNote, fnDelete } = props;

  const rightSwipe = () => {
    return (
      <TouchableOpacity onPress={() => deleteNote()} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Icon name="trash-can" size={30} color='#000'/>
        </View>
      </TouchableOpacity>
    );
  };

  const expandNote = () => {
    setExpanded(prevExpanded => !prevExpanded);
    setTitleSize(!expanded ? 0 : 1);
  };
  const editNote = () => {
    setModalEditVisible(true);
  };

  const closeEdit = () => {
    setModalEditVisible(false);
  };

  const deleteNote = () =>{
    //TODO change for appropriate id
    //delete here
    fnDelete(idNote)
  }

  return (

    <View style={styles.noteContainer}>
      <Swipeable renderRightActions={rightSwipe} overshootLeft={false} friction={2} overshootRight={false} >
        <>
          <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => editNote()}>
              <Icon name="pencil" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.expandButton} onPress={() => expandNote()}>
              <View style={styles.titleView}>
                <Text style={styles.titleText} numberOfLines={titleSize}>{noteTitle}</Text>
              </View>
              <View style={{ marginStart: 12 }}><Icon name="chevron-down" size={30} color="#000" /></View>
            </TouchableOpacity>
          </View>
          {expanded && <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{noteDescription}</Text>
          </View>}
          <NoteEditModal visible={modalEditVisible} title={noteTitle} desc={noteDescription} fnEdit={fnEdit}
                         fnCancel={closeEdit} idNote={idNote} />
        </>
      </Swipeable>
    </View>

  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flex: 1,
    marginBottom: 24,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 20,
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
    paddingVertical: 12,
    justifyContent: "center",
  },
  expandButton: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  descriptionContainer: {
    flex: 1,
    padding: 12,
    borderTopWidth: 0.5,
  },
  descriptionText: {
    fontSize: 14,
  },
  deleteBox: {
    flex:1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:12,
  },
});

export default Note;
