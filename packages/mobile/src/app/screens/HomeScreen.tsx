import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export function HomeScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
          App Headline
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          App Title
        </Text>
        <Text variant="bodyMedium" style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
          Description Text
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 4,
  },
  description: {
    marginTop: 4,
  },
});
