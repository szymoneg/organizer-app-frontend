import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";

const listCalendar = {
  "2021-05-28": [{ name: "item 1 - any js object" , marked: true}],
};

export default class CalendarComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Agenda
        items={listCalendar}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        style={{marginTop: 40}}
        markingType={'period'}
        markedDates={{
          '2021-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
          '2021-05-22': {color: '#70d7c7', textColor: 'white'},
          '2021-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
          '2021-05-24': {color: '#70d7c7', textColor: 'white'},
          '2021-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
          '2021-05-28': {color: '#70d7c7', textColor: 'white'},
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: 'lightgray',
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
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
    );
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

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
});
