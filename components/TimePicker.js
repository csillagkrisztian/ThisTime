import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default TimePicker = ({}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [timePicked, setTimePicked] = useState("");

  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dateTime = new Date(date).toLocaleString("en-US", { hour12: false });
    const timeArray = dateTime.split(" ")[1].split(":");
    const time = `${timeArray[0]}:${timeArray[1]}`;
    setTimePicked(time);
    hideDatePicker();
  };

  return (
    <SafeAreaView>
      {timePicked ? (
        <Button title={timePicked} onPress={showTimePicker}></Button>
      ) : (
        <Button title="Show Date Picker" onPress={showTimePicker} />
      )}

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
