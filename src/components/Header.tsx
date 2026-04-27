import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme";

type Props = {
  greeting: string;
  address: string;
};

export function Header({ greeting, address }: Props) {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  address: {
    color: colors.textMuted,
    fontSize: 13,
    flexShrink: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});
