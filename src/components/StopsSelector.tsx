import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

import { useState } from "react";
import { Modal, View, StyleSheet, Text, Pressable } from "react-native";

export type StopsSelectorProps = {
  isVisible: boolean;
  onConfirm: (maxStops: number) => void;
  onCancel: () => void;
};

export const StopsSelector = ({
  isVisible,
  onConfirm,
  onCancel,
}: StopsSelectorProps) => {
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
    {
      id: "0", // acts as primary key, should be unique and non-empty string
      label: "Direct",
      value: "0",
    },
    {
      id: "1",
      label: "1 stop",
      value: "1",
    },
    {
      id: "2",
      label: "2 stops",
      value: "2",
    },
  ]);

  const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
    setRadioButtons(radioButtonsArray);
    const selectedRadioButton = radioButtons.find(
      (radioButton) => radioButton.selected
    );
    const stopsValue = selectedRadioButton?.value || '0';
    const stopsValueInt = parseInt(stopsValue);
    onConfirm(stopsValueInt);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          onCancel;
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
