import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { spacing, useTheme } from "../theme";
import { useThemedStyles } from "../theme/useThemedStyles";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
};

export function EmptyState({ icon, title, message }: Props) {
  const { colors } = useTheme();
  const styles = useThemedStyles((c) => ({
    container: {
      flex: 1,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      paddingHorizontal: spacing.xl,
      gap: spacing.sm,
    },
    title: {
      fontSize: 17,
      fontWeight: "700" as const,
      color: c.text,
      marginTop: spacing.sm,
    },
    message: {
      color: c.textMuted,
      fontSize: 14,
      textAlign: "center" as const,
    },
  }));
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={56} color={colors.textMuted} />
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}
