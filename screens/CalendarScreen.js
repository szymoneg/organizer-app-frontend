import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView, Image } from "react-native";
import 'react-native-gesture-handler'
import { Agenda } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Background from "../components/Backgorund";
import CalendarAddModal from "../components/CalendarAddModal";
import NoteAddModal from "../components/NoteAddModal";

const listCalendar = {
  "2021-05-28": [
    { name: "item 1 - any js object" , marked: true, dotColor: 'red'},
  ],
  "2021-05-29": []
};

const CalendarScreen = () => {
  const [calendarList, setCalendarList] = useState([])
  const [modalAddVisible, setModalAddVisible] = useState(false)

  const fetchNotes = () => {
    fetch("http://localhost:8080/task/getTasks/andrzej")
      .then(response => response.json())
      .then(json => {
        json.length = 10;
        return json;
      })
      .then(json => {
        //console.log(json);
      });
  };

  const add = () => {
    console.log("click!")
    mapper(fetchNotes())
    listCalendar["2021-05-28"] = [{ name: "zadanie", marked: true}]
  }

  const mapper = (listArr) => {
    console.log(listArr)
  }

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
    if (calendarList.length > 0) {
      setCalendarList(oldCalendarList => [...oldCalendarList, calendar]);
    } else {
      setCalendarList([calendar]);
    }
    setModalAddVisible(false);
  };

  const renderItem = (item) =>{
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => {
          add()
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
        indicatorColor: 'blue',
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
