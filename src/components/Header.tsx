import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { spacing, useTheme } from "../theme";
import { useThemedStyles } from "../theme/useThemedStyles";

type Props = {
  greeting: string;
  address: string;
};

export function Header({ greeting, address }: Props) {
  const { colors } = useTheme();
  const styles = useThemedStyles((c) => ({
    container: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      gap: spacing.md,
    },
    greeting: {
      fontSize: 18,
      fontWeight: "700" as const,
      color: c.text,
    },
    row: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 4,
      marginTop: 2,
    },
    address: {
      color: c.textMuted,
      fontSize: 13,
      flexShrink: 1,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: c.surface,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
  }));
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.greeting}>{greeting}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={14} color={colors.primary} />
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
        </View>
      </View>
      <View style={styles.iconButton}>
        <Ionicons name="search" size={20} color={colors.text} />
      </View>
    </View>
  );
}
