import React, { useState, useEffect } from "react";
import { Agenda, CalendarProvider } from "react-native-calendars";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  FAB,
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import TimePicker from "./TimePicker";

export default function AgendaRoute() {
  const testData = {
    "2022-12-25": [
      {
        id: 1576996323453,
        name: "Radagon has come",
        date: "2022-12-25",
      },
    ],
  };
  const todayString = new Date().toJSON().slice(0, 10);
  const [items, setItems] = useState(testData);
  const [currentDate, setCurrentDate] = useState(todayString);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    setItems((state) => {
      return { [todayString]: [], ...state };
    });
  }, []);

  const loadItems = (day) => {
    const today = day.timestamp + 0 * 24 * 60 * 60 * 1000;
    const todayString = timeToString(today);
    if (!items[todayString]) {
      setItems((state) => {
        return { [todayString]: [], ...state };
      });
    }
  };

  const addItem = () => {
    setItems((state) => ({
      ...state,
      [currentDate]: [
        ...state[currentDate],
        { id: Date.now(), name: "New Item", date: currentDate },
      ],
    }));
  };

  const renderItem = (item, isFirst) => {
    /*const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";*/
    console.log("item", item.name);

    return (
      <View style={[styles.container, { marginTop: 20 }]}>
        <TouchableOpacity onPress={() => console.log(item)}>
          <Text
            style={
              {
                /*fontSize, color*/
              }
            }
          >
            {item.name}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <FAB
            variant=""
            icon="pencil"
            onPress={() => {
              setSelectedItem(item);
              setEditMode(true);
            }}
          />
          {isFirst && <FAB variant="" icon="plus" onPress={addItem} />}
        </View>
      </View>
    );
  };

  const renderEmptyDate = (day) => {
    return (
      <View style={[styles.container, { marginTop: 20 }]}>
        <Text>{"There are no tasks yet for today!"}</Text>
        <FAB
          icon="plus"
          onPress={() => {
            setEditMode(true);
          }}
        />
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const onDayPress = (day) => {
    const savedItems = Object.entries(items).filter(
      ([key, value]) =>
        value.length !== 0 ||
        (key === todayString && day.dateString === todayString)
    );
    setItems(Object.fromEntries(savedItems));
    setCurrentDate(timeToString(day.timestamp + 0 * 24 * 60 * 60 * 1000));
    loadItems(day);
  };

  console.log("editMode", editMode);
  console.log("items", items);

  const EditDialog = () => {
    const [editText, setEditText] = useState(selectedItem.name);
    return (
      <Portal>
        <Dialog
          visible={editMode}
          onDismiss={() => {
            setEditMode(false);
          }}
        >
          <Dialog.Content>
            <TimePicker
              selectedItem={selectedItem}
              items={items}
              setItems={setItems}
            ></TimePicker>
            <TextInput value={editText} onChangeText={setEditText}></TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                const unselectedItems = items[currentDate].filter(
                  (item) => item.id !== selectedItem.id
                );
                const editedItem = {
                  ...selectedItem,
                  name: editText,
                };
                setItems((state) => {
                  return {
                    ...state,
                    [currentDate]: [...unselectedItems, editedItem],
                  };
                });
                setEditMode(false);
              }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  return (
    <>
      <View style={{ flex: 1, marginTop: 30 }}>
        <EditDialog></EditDialog>
        <CalendarProvider date="">
          <Agenda
            onDayPress={onDayPress}
            items={items}
            loadItemsForMonth={loadItems}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
            refreshing={true}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            // showOnlySelectedDayItems
          />
        </CalendarProvider>
        {/*<FAB
              style={{
                position: "absolute",
                left: Dimensions.get("window").width / 1.7,
                top: Dimensions.get("window").height / 1.2,
              }}
              label={"Jump to Today"}
              onPress={() => {}}
            ></FAB>*/}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    marginRight: 10,
  },
});
