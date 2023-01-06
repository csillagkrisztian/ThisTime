import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Portal, Dialog, Button, TextInput } from "react-native-paper";
import TimePicker from "./TimePicker";
import { toggleEditMode } from "../store/slices/editSlice";
import { upsertItem } from "../store/slices/itemsSlice";
import { getFancyPhrase } from "../helpers";
import { getTime } from "./TimePickerHelpers";

export default EditDialog = () => {
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  const [editTime, setEditTime] = useState(getTime());
  const { editMode, editingItem } = useSelector(({ edit }) => edit);
  const currentDate = useSelector(({ current }) => current.date);

  useEffect(() => {
    if (editingItem.name) {
      setEditText(editingItem.name);
    } else {
      setEditText(getFancyPhrase());
    }
  }, [editingItem]);

  console.log("editT", editTime);

  return (
    <Portal>
      <Dialog
        visible={editMode}
        onDismiss={() => {
          dispatch(toggleEditMode());
        }}
      >
        <Dialog.Content>
          <TimePicker editTime={editTime} setEditTime={setEditTime} />
          <TextInput
            label={"Item Name"}
            placeholder={"Write whatever you wanna do!"}
            value={editText}
            onChangeText={setEditText}
          ></TextInput>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              dispatch(
                upsertItem({
                  editedItem: {
                    ...editingItem,
                    name: editText,
                    time: editTime,
                  },
                  currentDate,
                })
              );
              dispatch(toggleEditMode());
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
