import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Portal, Dialog, Button, TextInput } from "react-native-paper";
import TimePicker from "./TimePicker";
import { toggleEditMode } from "../store/slices/editSlice";
import { upsertItem } from "../store/slices/itemsSlice";
import { getFancyPhrase } from "../helpers";
export default EditDialog = () => {
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  const { editMode, editingItem } = useSelector(({ edit }) => edit);
  const currentDate = useSelector(({ current }) => current.date);

  useEffect(() => {
    if (editingItem.name) {
      setEditText(editingItem.name);
    } else {
      setEditText(getFancyPhrase());
    }
  }, [editingItem]);

  return (
    <Portal>
      <Dialog
        visible={editMode}
        onDismiss={() => {
          dispatch(toggleEditMode());
          dispatch(upsertItem({ editedItem: {}, currentDate }));
        }}
      >
        <Dialog.Content>
          <TimePicker />
          <TextInput value={editText} onChangeText={setEditText}></TextInput>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              dispatch(
                upsertItem({
                  editedItem: {
                    ...editingItem,
                    name: editText,
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
