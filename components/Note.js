import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NoteEditModal from "./NoteEditModal";

const Note = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { noteTitle, noteDescription, fnEdit, idNote } = props;
  const [titleSize, setTitleSize] = useState(1);
  const [modalEditVisible, setModalEditVisible] = useState(false);

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

  return (
    <View style={styles.noteContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => editNote()}>
          <Icon name="pencil" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.expandButton} onPress={() => expandNote()}>
          <View style={styles.titleView}>
            <Text style={styles.titleText} numberOfLines={titleSize}>{noteTitle}</Text>
          </View>
          <View><Icon name="chevron-down" size={30} color="#000" /></View>
        </TouchableOpacity>
      </View>
      {expanded && <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{noteDescription}</Text>
      </View>}
      <NoteEditModal visible={modalEditVisible} title={noteTitle} desc={noteDescription} fnEdit={fnEdit}
                     fnCancel={closeEdit} idNote={idNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flex: 1,
    borderWidth: 1,
    marginTop: 14,
    marginHorizontal: 24,
    marginBottom: 12,
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
    justifyContent: "center",
  },
  expandButton: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
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
