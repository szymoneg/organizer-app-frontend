import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal, TextInput, Image, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";
import { getData } from "../service/AsyncStorage";

const BG_IMAGE = "https://cdn-0.idownloadblog.com/ezoimgfmt/media.idownloadblog.com/wp-content/uploads/2020/07/iPad-gradient-wallpaper-idownloadblog-V2byArthur1992as-2048x2048.jpeg?ezimgfmt=ng:webp/ngcb28";

const CalendarAddModal = (props) => {
  const [token, setToken] = useState("");
  const [idUser, setIdUser] = useState(0);
  const [calendarTitle, setCalendarTitle] = useState("");
  const [calendarDescription, setCalendarDescription] = useState("");
  const [calendarStart, setCalendarStart] = useState(new Date());
  const [calendarEnd, setCalendarEnd] = useState(new Date());
  const [calendarTags, setCalendarTags] = useState("");
  const [calendarColor, setCalendarColor] = useState("");
  const [calendarNotification, setCalendarNotification] = useState("");

  const { visible, fnCancel, fnAdd, length, idTask, fnFetch } = props;

  useEffect(() => {
    fetchTask()
    getData("token")
      .then(r => {
        setToken(r)
      });
    getData("idUser")
      .then(r => {
        setIdUser(Number(r))
        console.log(r)
      });
  },[visible])

  const fetchTask = () => {
    fetch(`http://localhost:8080/task/getTaskById/${idTask}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //"Authorization": `Bearer ${token}`,
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
        setCalendarTitle(json.titleTask)
        setCalendarDescription(json.descriptionTask)
        setCalendarColor('Red')
        setCalendarTags(json.tags)
      });
  }

  const postEditData = (editTask) =>{
    fetch(`http://localhost:8080/task/editTask/${idUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(editTask),
    })
      .then(result => result.json())
      .then(response => {
        console.log(response.status);
        Alert.alert(response.status, "Zmieniono!");
        fnFetch()
      });
  };

  const checkFields = () => {
    const startDate = new Date(calendarStart);
    const endDate = new Date(calendarEnd);

    const newStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds();
    const newEndDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate() + " " + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds();

    let calendar = {
      idTask: idTask,
      titleTask: calendarTitle,
      descriptionTask: calendarDescription,
      startTask: newStartDate,
      endTask: newEndDate,
      tags: calendarTags,
      color: calendarColor,
      notificationTask: newStartDate,
    };
    if (calendarTitle === "") {

    } else {
      postEditData(calendar)
      fnCancel()
    }
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <Modal visible={visible} transparent={true} onRequestClose={() => fnCancel()}>

      <View style={styles.modalView}>
        <Image
          source={{ uri: BG_IMAGE }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={5}
          opacity={1}
          backgroundColor={"rgba(212,156,97,1)"}
        />
        <View>
          <TextInput style={styles.inputTitleField}
                     placeholder={"Title"}
                     onChangeText={setCalendarTitle}
                     value={calendarTitle}/>
          <TextInput style={styles.inputDescField}
                     multiline
                     placeholder={"Description"}
                     onChangeText={setCalendarDescription}
                     value={calendarDescription}/>
          <TextInput style={styles.inputTitleField}
                     placeholder={"Tags"}
                     onChangeText={setCalendarTags}
                     value={calendarTags} />

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
  )};


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
