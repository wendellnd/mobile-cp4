import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { radius, spacing, useTheme } from "../theme";
import { useThemedStyles } from "../theme/useThemedStyles";
import type { Category } from "../types";

type Props = {
  category: Category;
  selected: boolean;
  onPress: () => void;
};

export function CategoryChip({ category, selected, onPress }: Props) {
  const { colors } = useTheme();
  const styles = useThemedStyles((c) => ({
    chip: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 6,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radius.pill,
      backgroundColor: c.surface,
      marginRight: spacing.sm,
    },
    chipSelected: { backgroundColor: c.primary },
    label: {
      color: c.text,
      fontSize: 13,
      fontWeight: "600" as const,
    },
    labelSelected: { color: c.white },
  }));
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Ionicons
        name={category.icon as any}
        size={16}
        color={selected ? colors.white : colors.text}
      />
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {category.name}
      </Text>
    </Pressable>
  );
}
