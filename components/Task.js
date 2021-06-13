import { Alert, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CalendarEditModal from "./CalendarEditModal";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import config from "../service/config";

const Task = (props) => {
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [titleSize, setTitleSize] = useState(1);

  const { item, fnFetch } = props;

  const rightSwipe = () => {
    return (
      <TouchableOpacity onPress={() => deleteTask()} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Icon name="trash-can" size={30} color='#000'/>
        </View>
      </TouchableOpacity>
    );
  };

  const expandTask = () => {
    setExpanded(prevExpanded => !prevExpanded);
    setTitleSize(!expanded ? 0 : 1);
  };
  const editTask = () => {
    fnFetch()
    setModalEditVisible(true);
  };

  const closeEdit = () => {
    setModalEditVisible(false);
  };

  const deleteTask = () =>{
    fetch(`${config.SERVER_URL}/task/deleteTask/${item.idTask}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //"Authorization": `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status !== 200) {
          Alert.alert("title", "Blad ladowania");
        } else {
          Alert.alert("title", "Usunieto!")
          fnFetch()
        }
      })
  }

  return (
      <View style={styles.taskContainer}>
        <Swipeable renderRightActions={rightSwipe} overshootLeft={false} friction={2} overshootRight={false} >
          <>
            <View style={styles.titleContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => editTask()}>
                <Icon name="pencil" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.expandButton} onPress={() => expandTask()}>
                <View style={styles.titleView}>
                  <Text style={styles.titleText} numberOfLines={titleSize}>{item.title}</Text>
                </View>
                <View style={{ marginStart: 12 }}><Icon name="chevron-down" size={30} color="#000" /></View>
              </TouchableOpacity>
            </View>
            {expanded && <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{item.name}</Text>
              <Text style={styles.descriptionText}>Od: {item.startTask}</Text>
              <Text style={styles.descriptionText}>Do: {item.endTask}</Text>
              <Text style={styles.descriptionText}>{item.tags}</Text>
            </View>}
            <CalendarEditModal visible={modalEditVisible}
                               idTask = {item.idTask}
                               fnFetch = {fnFetch}
              // fnEdit={fnEdit}
                               fnCancel={closeEdit} />
          </>
        </Swipeable>
      </View>

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
  taskContainer: {
    flex: 1,
    marginTop: 24,
    marginBottom: 12,
    marginRight: 12,
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

export default Task;
