import { useState } from "react";
import { View, StyleSheet } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

import Modal from "./Modal/Modal";
import { CancelButton } from "./Modal/CancelButton";

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
      id: "0", // acts as a primary key, should be a unique non-empty string
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
    const stopsValue = selectedRadioButton?.value || "0";
    const stopsValueInt = parseInt(stopsValue);
    onConfirm(stopsValueInt);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.container}>
        <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />
      </View>

      <CancelButton
        label={"Cancel"}
        onPress={onCancel}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 13,
    padding: 35,
    alignItems: "center",
  },
});
