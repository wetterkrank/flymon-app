import { useState } from "react";
import { Modal, View, StyleSheet, Text, Pressable } from "react-native";

import MultiSlider from "@ptomasroos/react-native-multi-slider";

export type DaysSelectorProps = {
  isVisible: boolean;
  values: number[];
  onConfirm: (days: number[]) => void;
  onCancel: () => void;
};

export const DaysSelector = ({
  isVisible,
  values,
  onConfirm,
  onCancel,
}: DaysSelectorProps) => {
  const [daysAtDestination, setDaysAtDestination] = useState(values);
  const sliderValuesChange = (values: number[]) => setDaysAtDestination(values);

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
            <Text style={styles.modalText}>Hello World!</Text>
            <MultiSlider
              values={[daysAtDestination[0], daysAtDestination[1]]}
              sliderLength={300}
              onValuesChange={sliderValuesChange}
              min={1}
              max={30}
              step={1}
              allowOverlap
              snapped
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onConfirm(daysAtDestination)}
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
