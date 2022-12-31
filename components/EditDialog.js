import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Portal, Dialog, Button, TextInput } from "react-native-paper";
import TimePicker from "./TimePicker";
import { editItem, toggleEditMode } from "../store/slices/editSlice";
import { updateItem } from "../store/slices/itemsSlice";

export default EditDialog = ({ items, setItems, currentDate }) => {
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  const { editMode, editingItem } = useSelector(({ edit }) => edit);

  useEffect(() => {
    setEditText(editingItem.name);
  }, [editingItem]);

  return (
    <Portal>
      <Dialog
        visible={editMode}
        onDismiss={() => {
          dispatch(toggleEditMode());
        }}
      >
        <Dialog.Content>
          <TimePicker />
          <TextInput value={editText} onChangeText={setEditText}></TextInput>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              //   const unselectedItems = items[currentDate].filter(
              //     (item) => item.id !== editingItem.id
              //   );
              const editedItem = {
                ...editingItem,
                name: editText,
              };
              //   setItems((state) => {
              //     return {
              //       ...state,
              //       [currentDate]: [...unselectedItems, editedItem],
              //     };
              //   });
              dispatch(updateItem({ editedItem, currentDate }));
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
