import * as AppleAuthentication from 'expo-apple-authentication';
import { CodedError } from 'expo-modules-core';

import { View, StyleSheet } from 'react-native';

export default function AuthTest() {
  return (
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
            console.log(credential);
            alert('HELLO');
          } catch (e) {
            if (e instanceof CodedError) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                alert('CANCELLED');
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 44,
  },
});
