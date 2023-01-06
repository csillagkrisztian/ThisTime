import React, { useState } from "react";
import { Button } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTime } from "./TimePickerHelpers";
import { TouchableHighlight, View } from "react-native";

export default TimePicker = ({ editTime, setEditTime }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const time = getTime(date);
    setEditTime(time);
    hideDatePicker();
  };

  return (
    <SafeAreaView>
      <TouchableHighlight onPress={showTimePicker}>
        <View
          style={{
            borderRadius: 5,
          }}
        >
          <Button
            labelStyle={{ fontSize: 21 }}
            contentStyle={{ height: 80, padding: 0, margin: 0 }}
            mode="contained"
            onPress={showTimePicker}
          >
            {editTime}
          </Button>
        </View>
      </TouchableHighlight>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        locale="en_GB"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};
