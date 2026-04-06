import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { AuthGuard } from './auth/AuthGuard';
import { configureApiClient } from './auth/api-client';
import { BottomTabNavigator } from './navigation/BottomTabNavigator';
import { theme } from './theme';

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
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
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
