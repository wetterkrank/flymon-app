import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Application from 'expo-application';

const registerForPushNotificationsAsync = async (): Promise<string|undefined> => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification, status: ' + finalStatus);
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }
  apnDebug();
  console.log('Push token:', token);
  return token;
}

const apnDebug = async () => {
  const apnEnv = await Application.getIosPushNotificationServiceEnvironmentAsync();
  console.log('APN env:', apnEnv);
  const releaseType = await Application.getIosApplicationReleaseTypeAsync();
  console.log('Release type:', releaseType);

}

export { registerForPushNotificationsAsync };
