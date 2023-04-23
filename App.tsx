import * as React from 'react';
import { CacheProvider } from '@rest-hooks/react';

import RootNavigator from './src/navigation';

export default function App() {
  return (
    <CacheProvider>
      <RootNavigator />
    </CacheProvider>
  );
};
