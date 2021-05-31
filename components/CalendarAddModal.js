import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal, TextInput, Image, Picker } from "react-native";
import DatePicker from "react-native-date-picker";
import { Dropdown } from 'react-native-material-dropdown';

const BG_IMAGE = "https://cdn-0.idownloadblog.com/ezoimgfmt/media.idownloadblog.com/wp-content/uploads/2020/07/iPad-gradient-wallpaper-idownloadblog-V2byArthur1992as-2048x2048.jpeg?ezimgfmt=ng:webp/ngcb28";

const CalendarAddModal = (props) => {
  const [calendarTitle, setCalendarTitle] = useState("");
  const [calendarDescription, setCalendarDescription] = useState("");
  const [calendarStart, setCalendarStart] = useState(new Date());
  const [calendarEnd, setCalendarEnd] = useState(new Date());
  const [calendarTags, setCalendarTags] = useState("");
  const [calendarColor, setCalendarColor] = useState("");
  const [calendarNotification, setCalendarNotification] = useState("Java");
  const { visible, fnCancel, fnAdd, length } = props;


  const checkFields = () => {

    let calendar = {
      title: calendarTitle,
      body: calendarDescription,
      start: calendarStart,
      end: calendarEnd,
      tags: calendarTags,
      color: calendarColor,
      notification: calendarNotification
      //TODO change for appropriate id
      // id: length + 1,
    };
    if (calendarTitle === "") {
      //TODO add toast
    } else {
      //fetch here
      console.log(length);
      fnAdd(calendar);
    }
  };
  return (
    <Modal visible={visible} transparent={true} onRequestClose={() => fnCancel()}>

      <View style={styles.modalView}>
        <Image
          source={{ uri: BG_IMAGE }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={5}
          opacity={.9}
          backgroundColor={"rgba(212,156,97,1)"}
        />
        <View>
          <TextInput style={styles.inputTitleField}
                     placeholder={"Title"}
                     onChangeText={setCalendarTitle} />
          <TextInput style={styles.inputDescField}
                     multiline
                     placeholder={"Description"}
                     onChangeText={setCalendarDescription} />
          <TextInput style={styles.inputTitleField}
                     placeholder={"Tags"}
                     onChangeText={setCalendarTags} />

          <Text style={styles.textLabel}>Start time</Text>
          <DatePicker
            textColor={"white"}
            style={styles.inputDateField}
            date={calendarStart}
            onDateChange={setCalendarStart}
          />

          <Text style={styles.textLabel}>End time</Text>
          <DatePicker
            textColor={"white"}
            style={styles.inputDateField}
            date={calendarEnd}
            onDateChange={setCalendarEnd}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.colorPicker}
                              onPress={() => fnCancel()}>
              <Text>Color</Text>
            </TouchableOpacity>

          </View>
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
  colorPicker: {
    backgroundColor: "rgba(212,156,97,1)",
    width: 120,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: .5,
    elevation: 8,
  },
  textLabel: {
    color: "white",
    fontSize: 22,
    marginTop: 16,
  },
  inputDateField: {
    height: 90,
    padding: 12,
    elevation: 4,
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
    height: 90,
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
export default CalendarAddModal;
