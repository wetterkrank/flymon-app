import { useState } from "react";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import { Modal, ModalBackdrop } from "@gluestack-ui/themed";

export type DaysSelectorProps = {
  isVisible: boolean;
  values: [number, number];
  onConfirm: (days: [number, number]) => void;
  onCancel: () => void;
};

enum Mode {
  Min = 0,
  Max = 1,
}

export const DaysSelector = ({
  isVisible,
  values,
  onConfirm,
  onCancel,
}: DaysSelectorProps) => {
  const [daysAtDestination, setDaysAtDestination] = useState(
    values.map(String) as [string, string]
  );

  // Strip non-numeric characters from input, just in case
  const onChangeText = (value: string, mode: Mode) => {
    const newValues = [...daysAtDestination] as [string, string];
    newValues[mode] = value.replace(/[^0-9]/g, "");
    setDaysAtDestination(newValues);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        closeOnOverlayClick={true}
        isOpen={isVisible}
        onClose={() => {console.log("onClose"); onCancel();}}
      >
        <ModalBackdrop />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select days at destination</Text>

            <TextInput
              style={styles.input}
              onChangeText={(value: string) => onChangeText(value, Mode.Min)}
              value={daysAtDestination[Mode.Min]}
              selection={{ start: 0, end: daysAtDestination[Mode.Min].length }}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              onChangeText={(value: string) => onChangeText(value, Mode.Max)}
              value={daysAtDestination[Mode.Max]}
              keyboardType="numeric"
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                const days = daysAtDestination.map(Number) as [number, number];
                // Validate input: min <= max
                // Zeros are valid values in fact
                onConfirm(days);
              }}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
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
