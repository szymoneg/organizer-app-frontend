import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import "react-native-gesture-handler";
import { Agenda } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Background from "../components/Backgorund";
import CalendarAddModal from "../components/CalendarAddModal";
import "../service/Mapper";
import { mapper } from "../service/Mapper";
import { getData } from "../service/AsyncStorage";
import Task from "../components/Task";
import config from "../service/config";



const CalendarScreen = () => {
  const [calendarList, setCalendarList] = useState([]);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [idUser, setIdUser] = useState(0);
  const [listCalendar, setListCalendar] = useState({})

  useEffect(() => {
    getData("username")
      .then(r => setUsername(r));
    getData("token")
      .then(r => setToken(r));
    getData("idUser")
      .then(r => setIdUser(r));
  }, []);

  useEffect(() => {
    if (username !== "" && token !== "" && idUser !== 0) {
      fetchNotes();
    }
  }, [username, token, idUser]);

  const fetchNotes = () => {
    fetch(`${config.SERVER_URL}/task/getTasks/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status !== 200) {
          Alert.alert("title", "Blad ladowania");
        } else {
          return response.json();
        }
      })
      .then(json => {
        setListCalendar(mapper(json, listCalendar));
      });
  };

  const cancelCalendar = () => {
    setModalAddVisible(false);
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const addCalendar = (calendar) => {
    const startDate = new Date(calendar.start);
    const endDate = new Date(calendar.end);

    const newStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds();
    const newEndDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate() + " " + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds();

    let newTask = {
      idUser: idUser,
      titleTask: calendar.title,
      descriptionTask: calendar.description,
      startTask: newStartDate,
      endTask: newEndDate,
      tags: calendar.tags,
      color: calendar.color,
      notificationTask: newStartDate,
    };

    fetch(`${config.SERVER_URL}/task/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newTask),
    })
      .then(result => result.json())
      .then(response => {
        Alert.alert(response.status, "Dodano!");
        fetchNotes()
        setModalAddVisible(false);
      });
  };

  const renderItem = (item) => {
    return (
      <Task item={item} fnFetch={fetchNotes}/>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Background />
      <Agenda
        items={listCalendar}
        rowHasChanged={rowHasChanged}
        renderItem={renderItem}
        markingType={"period"}
        dayLoading={false}
        theme={{
          backgroundColor: "rgba(255,255,255,0)",
          calendarBackground: "white",
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "black",
          todayTextColor: "red",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "red",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "black",
          indicatorColor: "rgba(255,255,255,0)",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
      <SafeAreaView>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalAddVisible(true)}>
          <Icon name="plus" size={30} color="#000" />
        </TouchableOpacity>
      </SafeAreaView>
      <CalendarAddModal visible={modalAddVisible} fnCancel={cancelCalendar} fnAdd={addCalendar}
                        length={calendarList.length} />


    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {},
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
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
