import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView, Pic } from "react-native";
import 'react-native-gesture-handler'
import { Agenda } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Background from "../components/Backgorund";
import CalendarAddModal from "../components/CalendarAddModal";
import '../service/Mapper';
import { mapper } from "../service/Mapper";
import { getData } from "../service/RestApi";

const listCalendar = {
  "2021-05-28": [
    { name: "item 1 - any js object" , marked: true, dotColor: 'red'},
  ],
  "2021-05-29": []
};

const CalendarScreen = () => {
  const [calendarList, setCalendarList] = useState([])
  const [modalAddVisible, setModalAddVisible] = useState(false)

  useEffect(() => {
    fetchNotes()
  },[])

  const fetchNotes = () => {
    fetch("http://localhost:8080/task/getTasks/andrzej")
      .then(response => response.json())
      .then(json => {
        json.length = 10;
        return json;
      })
      .then(json => {
        this.listCalendar = mapper(json, listCalendar);
      });
  };

  const cancelCalendar = () =>{
    setModalAddVisible(false);
  }

  const rowHasChanged = (r1, r2) =>{
    return r1.name !== r2.name
  }

  const timeToString = (time) =>{
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  const addCalendar = (calendar) => {
    const startDate = new Date(calendar.start)
    const endDate = new Date(calendar.end)

    const newStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds()
    const newEndDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate() + " " + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds()

    //zmienic idUser -> username
    let newTask = {
      idUser: 1,
      titleTask: calendar.title,
      descriptionTask: calendar.description,
      startTask: newStartDate,
      endTask: newEndDate,
      tags: calendar.tags,
      color: calendar.color,
      notificationTask: newStartDate
    }

    fetch('http://localhost:8080/task/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask),
    })
      .then(result => result.json())
      .then(response => {
        console.log(response.status)
        Alert.alert(response.status, "Dodano!")
        setModalAddVisible(false)
      });

    console.log(newTask);

  };

  const renderItem = (item) =>{
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => {
          Alert.alert(item.name)
        }}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  const renderEmptyDate = () =>{
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Background/>
    <Agenda
      items={listCalendar}
      rowHasChanged={rowHasChanged}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      style={{marginTop: 40}}
      markingType={'period'}
      dayLoading={false}
      theme={{
        backgroundColor: 'rgba(255,255,255,0)',
        calendarBackground: 'white',
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: 'black',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'rgba(255,255,255,0)',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
      }}
    />
      <SafeAreaView>
      <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalAddVisible(true)}>
        <Icon name="plus" size={30} color="#000" />
      </TouchableOpacity>
      </SafeAreaView>
      <CalendarAddModal visible={modalAddVisible} fnCancel={cancelCalendar} fnAdd={addCalendar} length={calendarList.length} />


    </View>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  container:{

  },
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
