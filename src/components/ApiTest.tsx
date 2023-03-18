import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { getPrices, IFlightPrice } from "../api/prices";

export default function ApiTest() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<IFlightPrice|null>(null);

  useEffect(() => {
    getPrices(setLoading, setData);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading || !data ? (
        <ActivityIndicator />
      ) : (
        <Text>{data.flyFrom}-{data.flyTo}, {data.price} EUR</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
