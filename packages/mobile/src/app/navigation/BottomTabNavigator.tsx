import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from 'react-native-paper';
import type { RootTabParamList } from './types';
import { HomeStack } from './HomeStack';
import { ProfileStack } from './ProfileStack';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.surfaceVariant,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({ color, size }) => (
            <Icon source="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color, size }) => (
            <Icon source="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
