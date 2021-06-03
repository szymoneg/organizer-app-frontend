import { Alert, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import NoteEditModal from "./NoteEditModal";
import CalendarEditModal from "./CalendarEditModal";

const Task = (props) => {
  const [modalEditVisible, setModalEditVisible] = useState(false);

  const { item } = props;

  const editTask = () => {
    setModalEditVisible(true);
  };

  const closeEdit = () => {
    setModalEditVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => {
          editTask();
        }}
      >
        <Text>{item.name}</Text>
        <Text>{item.idTask}</Text>
      </TouchableOpacity>
      <CalendarEditModal visible={modalEditVisible}
                         idTask = {item.idTask}
                         // fnEdit={fnEdit}
                         fnCancel={closeEdit} />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

export default Task;
