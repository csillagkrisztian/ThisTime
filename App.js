import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Agenda, CalendarProvider } from "react-native-calendars";
import { FAB, Divider } from "react-native-paper";

export default function App() {
  const testData = {
    "2022-12-25": [{ name: "Radagon has come", height: 4 }],
  };
  const todayString = new Date().toJSON().slice(0, 10);
  const [items, setItems] = useState(testData);

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

  const renderItem = (item, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <View style={[styles.container, { marginTop: 20 }]}>
        <TouchableOpacity onPress={() => console.log(item)}>
          <Text style={{ fontSize, color }}>{item.name}</Text>
        </TouchableOpacity>
        <FAB variant="" icon="plus" onPress={() => console.log("Pressed")} />
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={[styles.container, { marginTop: 20 }]}>
        <Text>{"There are no tasks yet for today!"}</Text>
        <FAB icon="plus" onPress={() => console.log("Pressed")} />
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time) => {
    console.log("time", time);
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
    loadItems(day);
  };

  return (
    <>
      <View style={{ flex: 1, marginTop: 30 }}>
        <CalendarProvider date="">
          <Agenda
            onDayPress={onDayPress}
            items={items}
            loadItemsForMonth={loadItems}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
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
