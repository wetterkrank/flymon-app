import { NavigationContainer } from '@react-navigation/native';
import { CacheProvider } from '@rest-hooks/react';

import HomeStackNavigator from './src/navigation/HomeStack';

export default function App() {
  return (
    <NavigationContainer>
      <CacheProvider>
        <HomeStackNavigator />
      </CacheProvider>
    </NavigationContainer>
  );
};
