import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { AuthGuard } from './auth/AuthGuard';
import { configureApiClient } from './auth/api-client';
import { BottomTabNavigator } from './navigation/BottomTabNavigator';
import { lightTheme, darkTheme } from './theme';

function AppContent() {
  const { refreshToken, logout } = useAuth();

  useEffect(() => {
    configureApiClient(refreshToken, logout);
  }, [refreshToken, logout]);

  return (
    <AuthGuard>
      <BottomTabNavigator />
    </AuthGuard>
  );
}

export const App = () => {
  const colorScheme = useColorScheme();
  return (
    <AuthProvider>
      <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <AppContent />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
