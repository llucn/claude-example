import { MD3LightTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

export const theme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#143055',
    onPrimary: '#ffffff',
    primaryContainer: '#d1e4ff',
    onPrimaryContainer: '#001d36',
    secondary: '#535f70',
    onSecondary: '#ffffff',
    secondaryContainer: '#d7e3f7',
    onSecondaryContainer: '#101c2b',
    surface: '#ffffff',
    onSurface: '#1a1c1e',
    surfaceVariant: '#dfe2eb',
    onSurfaceVariant: '#43474e',
    error: '#ba1a1a',
    onError: '#ffffff',
    background: '#fafcff',
    onBackground: '#1a1c1e',
    outline: '#73777f',
  },
};
