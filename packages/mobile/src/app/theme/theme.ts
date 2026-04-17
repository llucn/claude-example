import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0284c7',
    onPrimary: '#ffffff',
    primaryContainer: '#d1e4ff',
    onPrimaryContainer: '#001d36',
    secondary: '#535f70',
    onSecondary: '#ffffff',
    secondaryContainer: '#d7e3f7',
    onSecondaryContainer: '#101c2b',
    surface: '#ffffff',
    onSurface: '#111827',
    surfaceVariant: '#E5E8ED',
    onSurfaceVariant: '#6B7280',
    error: '#E03940',
    onError: '#ffffff',
    background: '#F4F6F9',
    onBackground: '#111827',
    outline: '#CBD2DA',
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 8,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#0ea5e9',
    onPrimary: '#000000',
    primaryContainer: '#16202f',
    onPrimaryContainer: '#e2e8f0',
    secondary: '#94a3b8',
    onSecondary: '#000000',
    secondaryContainer: '#16202f',
    onSecondaryContainer: '#e2e8f0',
    surface: '#111827',
    onSurface: '#e2e8f0',
    surfaceVariant: '#16202f',
    onSurfaceVariant: '#94a3b8',
    error: '#ef4444',
    onError: '#000000',
    background: '#0b1120',
    onBackground: '#e2e8f0',
    outline: 'rgba(255, 255, 255, 0.13)',
  },
};

export const theme = darkTheme;
