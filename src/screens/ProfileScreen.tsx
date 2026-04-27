import { Image, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../components/EmptyState";
import { Loading } from "../components/Loading";
import { ProfileSectionItem } from "../components/ProfileSectionItem";
import { useUser } from "../hooks/queries";
import { useFavorites } from "../hooks/useFavorites";
import { useUserPrefs } from "../hooks/useUserPrefs";
import { spacing, useTheme } from "../theme";
import { useThemedStyles } from "../theme/useThemedStyles";

export function ProfileScreen() {
  const { data: user, isLoading } = useUser();
  const favorites = useFavorites();
  const { prefs, update } = useUserPrefs();
  const { colors } = useTheme();
  const styles = useThemedStyles((c) => ({
    safe: { flex: 1, backgroundColor: c.background },
    headerWrap: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "700" as const,
      color: c.text,
    },
    userCard: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      gap: spacing.md,
      backgroundColor: c.surface,
      marginHorizontal: spacing.lg,
      borderRadius: 16,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: c.surfaceMuted,
    },
    name: {
      fontSize: 16,
      fontWeight: "700" as const,
      color: c.text,
    },
    email: {
      color: c.textMuted,
      fontSize: 13,
      marginTop: 2,
    },
    sectionTitle: {
      fontSize: 12,
      color: c.textMuted,
      fontWeight: "700" as const,
      textTransform: "uppercase" as const,
      letterSpacing: 0.5,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.sm,
    },
  }));

  const SectionTitle = ({ children }: { children: string }) => (
    <Text style={styles.sectionTitle}>{children}</Text>
  );

  if (isLoading || !user) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <View style={styles.headerWrap}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        <View style={styles.userCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.email}>{user.phone}</Text>
          </View>
        </View>

        <SectionTitle>Conta</SectionTitle>
        <ProfileSectionItem
          icon="person-outline"
          title="Dados pessoais"
          subtitle="Nome, email, telefone"
        />
        <ProfileSectionItem
          icon="location-outline"
          title="Endereços"
          subtitle={user.defaultAddress.street}
        />

        <SectionTitle>Preferências</SectionTitle>
        <ProfileSectionItem
          icon="notifications-outline"
          title="Notificações"
          right={
            <Switch
              value={prefs.notifications}
              onValueChange={(v) => update.mutate({ notifications: v })}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          }
        />
        <ProfileSectionItem
          icon="moon-outline"
          title="Modo escuro"
          right={
            <Switch
              value={prefs.darkMode}
              onValueChange={(v) => update.mutate({ darkMode: v })}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          }
        />

        <View style={{ height: spacing.md }} />
        <ProfileSectionItem icon="log-out-outline" title="Sair" />

        {favorites.ids.length === 0 && (
          <View
            style={{ paddingHorizontal: spacing.lg, marginTop: spacing.md }}
          >
            <EmptyState
              icon="heart-dislike-outline"
              title="Nenhum favorito ainda"
              message="Toque no coração de um restaurante para favoritar."
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
