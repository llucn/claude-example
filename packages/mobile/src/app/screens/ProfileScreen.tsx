import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import { useAuth } from '../auth/AuthContext';
import { apiClient } from '../auth/api-client';

interface UserInfo {
  sub: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  [key: string]: unknown;
}

export function ProfileScreen() {
  const theme = useTheme();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<UserInfo>('/me');
      setUserInfo(response.data);
    } catch (err) {
      setError('获取用户信息失败，请重试');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.background }]}>
        <Text variant="bodyLarge" style={{ color: theme.colors.error, marginBottom: 16 }}>
          {error}
        </Text>
        <Button mode="contained" onPress={fetchUserInfo}>
          重试
        </Button>
      </View>
    );
  }

  const displayName = userInfo?.preferred_username ?? userInfo?.name ?? '';
  const avatarLabel = displayName.charAt(0).toUpperCase() || '?';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.avatarSection}>
        <Avatar.Text
          size={80}
          label={avatarLabel}
          style={{ backgroundColor: theme.colors.primary }}
        />
        <Text variant="headlineSmall" style={styles.displayName}>
          {displayName}
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <List.Item
            title="用户名"
            description={userInfo?.preferred_username ?? '-'}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
          <Divider />
          <List.Item
            title="姓名"
            description={userInfo?.name ?? '-'}
            left={(props) => <List.Icon {...props} icon="card-account-details" />}
          />
          <Divider />
          <List.Item
            title="邮箱"
            description={userInfo?.email ?? '-'}
            left={(props) => <List.Icon {...props} icon="email" />}
          />
          <Divider />
          <List.Item
            title="用户 ID"
            description={userInfo?.sub ?? '-'}
            left={(props) => <List.Icon {...props} icon="identifier" />}
          />
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        onPress={logout}
        style={styles.logoutButton}
        textColor={theme.colors.error}
        icon="logout"
      >
        登出
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  displayName: {
    marginTop: 12,
    fontWeight: '600',
  },
  card: {
    marginBottom: 24,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 32,
    borderColor: '#ba1a1a',
  },
});
