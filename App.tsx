import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import { AuthProvider } from './AuthContext';
import StackNavigator from './navigation/StackNavigator';

enableScreens();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
