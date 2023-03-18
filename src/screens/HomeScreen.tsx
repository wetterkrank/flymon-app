import { Button, StyleSheet, Text, View } from "react-native";

import { HomeScreenNavigationProps } from '../navigation/types';

export default function HomeScreen({navigation}: HomeScreenNavigationProps) {
  return (
    <View style={styles.container}>
      <View style={styles.destinations}>
        {/* <View style={styles.destinationCard}>
          <Text>Destination 1</Text>
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Destination"
          onPress={() => navigation.navigate("Subscription")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: "10%",
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  destinations: {
    flex: 1,
  },
  destinationCard: {
    height: 100,
    marginVertical: 10,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
});
