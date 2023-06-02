import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth0 } from "react-native-auth0";

import { HomeScreenNavigationProps } from "../navigation/types";
import { SubscriptionsList } from "../components/SubscriptionsList";
import { useSubscriptions } from "../api/subscriptions/subscription";

export default function HomeScreen({ navigation }: HomeScreenNavigationProps) {
  const { authorize, clearSession, user, error: authError } = useAuth0();

  const onLogin = async () => {
    try {
      await authorize(
        { scope: "openid profile email" },
        { customScheme: "com.wetterkrank.flymon" }
      );
    } catch (e) {
      console.log(e);
    }
  };
  const onLogout = async () => {
    try {
      await clearSession({ customScheme: "com.wetterkrank.flymon" });
    } catch (e) {
      console.log("Log out cancelled");
    }
  };
  const loggedIn = user !== undefined && user !== null;

  const { data, isLoading, error: dataError } = useSubscriptions();

  // TODO: separate existing and new subscription types? then we won't need undefined here
  const editSubscription = (id: number | undefined) => {
    id && navigation.navigate("Subscription", { subscriptionId: id });
  };

  // TODO: better loading/error indication
  if (!data) {
    if (isLoading) return <Text>Loading...</Text>;
    else return <Text>Error: {dataError.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginStatus}>
        <Text>{loggedIn ? `You are logged in as ${user.name}` : 'You are not logged in'}</Text>
        {authError && <Text>{authError.message}</Text>}
        <Button
          onPress={loggedIn ? onLogout : onLogin}
          title={loggedIn ? "Log Out" : "Log In"}
        />
      </View>

      <View style={styles.destinations}>
        <SubscriptionsList data={data} handlePress={editSubscription} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Destination"
          onPress={() => {
            navigation.navigate("Subscription", { subscriptionId: undefined });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  loginStatus: {
    justifyContent: "center",
    alignItems: "center"
  },
  destinations: {
    flex: 3,
  },
  buttonContainer: {
    justifyContent: "center",
    flex: 1,
  },
});
