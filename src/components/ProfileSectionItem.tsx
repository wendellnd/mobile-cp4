import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { radius, spacing, useTheme } from "../theme";
import { useThemedStyles } from "../theme/useThemedStyles";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onPress?: () => void;
};

export function ProfileSectionItem({
  icon,
  title,
  subtitle,
  right,
  onPress,
}: Props) {
  const { colors } = useTheme();
  const styles = useThemedStyles((c) => ({
    row: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: spacing.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      backgroundColor: c.background,
    },
    iconWrap: {
      width: 36,
      height: 36,
      borderRadius: radius.md,
      backgroundColor: c.surface,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    title: {
      fontSize: 15,
      fontWeight: "600" as const,
      color: c.text,
    },
    subtitle: {
      fontSize: 12,
      color: c.textMuted,
      marginTop: 2,
    },
  }));
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {right ?? (
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      )}
    </Pressable>
  );
}
