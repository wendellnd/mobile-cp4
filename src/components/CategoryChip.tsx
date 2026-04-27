import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing } from "../theme";
import type { Category } from "../types";

type Props = {
  category: Category;
  selected: boolean;
  onPress: () => void;
};

export function CategoryChip({ category, selected, onPress }: Props) {
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

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  labelSelected: {
    color: colors.white,
  },
});
