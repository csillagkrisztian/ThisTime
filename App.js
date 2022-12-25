import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda, CalendarProvider } from "react-native-calendars";
import { FAB, Divider } from "react-native-paper";

export default function App() {
  const testData = {
    "2022-12-25": [{ name: "Radagon has come", height: 4 }],
  };
  const [items, setItems] = useState(testData);

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
      <TouchableOpacity
        style={[styles.container, { height: item.height }]}
        onPress={() => console.log(item)}
      >
        <Text style={{ fontSize, color }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.container}>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => console.log("Pressed")}
        />
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
      ([key, value]) => value.length !== 0
    );
    setItems(Object.fromEntries(savedItems));
    loadItems(day);
  };

  return (
    <>
      <View style={styles.container}>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "flex",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
