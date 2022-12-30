import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { BottomNavigation, Provider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AgendaRoute from "./components/AgendaRoute";
import Example from "./components/TimePicker";
const Whiteboard = () => (
  <SafeAreaView>
    <Text>Whiteboard</Text>
  </SafeAreaView>
);

const Lists = () => (
  <SafeAreaView>
    <Text>Lists</Text>
  </SafeAreaView>
);

const MyComponent = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "agenda",
      title: "Agenda",
      focusedIcon: "calendar-multiple-check",
      unfocusedIcon: "calendar-blank-multiple",
    },
    {
      key: "whiteboard",
      title: "Whiteboard",
      focusedIcon: "clipboard-list",
      unfocusedIcon: "clipboard-list-outline",
    },
    {
      key: "lists",
      title: "Lists",
      focusedIcon: "clipboard-multiple",
      unfocusedIcon: "clipboard-multiple-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    agenda: AgendaRoute,
    whiteboard: Example,
    lists: Lists,
  });

  return (
    <Provider>
      <SafeAreaProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </SafeAreaProvider>
    </Provider>
  );
};

export default MyComponent;

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
