import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem, toggleEditMode } from "../store/slices/editSlice";
import {
  addNewItem,
  deleteItem,
  createEmptyItem,
  deleteEmptyItems,
} from "../store/slices/itemsSlice";
import { Agenda, CalendarProvider } from "react-native-calendars";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FAB } from "react-native-paper";
import EditDialog from "./EditDialog";
import { parseDay } from "./AgendaHelpers";
import { changeCurrentDate } from "../store/slices/currentSlice";

export default function AgendaRoute() {
  const dispatch = useDispatch();
  const items = useSelector(({ items }) => items);
  const currentDate = useSelector(({ current }) => current.date);
  useEffect(() => {
    dispatch(createEmptyItem(currentDate));
  }, []);

  const loadItems = (day) => {
    const todayString = parseDay(day);
    if (!items[todayString]) {
      dispatch(createEmptyItem(todayString));
    }
  };

  const renderItem = (item, isFirst) => {
    return (
      <View style={[styles.container, { marginTop: 20 }]}>
        <TouchableOpacity onPress={() => console.log(item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <FAB
            variant="secondary"
            icon="pencil"
            onPress={() => {
              dispatch(toggleEditMode());
              dispatch(editItem(item));
            }}
          />
          <FAB
            variant="surface"
            icon="delete"
            onPress={() => {
              dispatch(deleteItem(item));
            }}
          />
          {isFirst && (
            <FAB
              variant="secondary"
              icon="plus"
              onPress={() => {
                dispatch(addNewItem(currentDate));
              }}
            />
          )}
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
            dispatch(toggleEditMode());
          }}
        />
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const onDayPress = (day) => {
    if (parseDay(day) !== currentDate) {
      dispatch(deleteEmptyItems({ currentDate, day }));
      dispatch(changeCurrentDate(parseDay(day)));
      loadItems(day);
    }
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
