import { Pressable, Text } from "react-native";
import { radius, spacing } from "../theme";
import { useThemedStyles } from "../theme/useThemedStyles";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled,
}: Props) {
  const styles = useThemedStyles((colors) => ({
    base: {
      paddingVertical: spacing.md,
      borderRadius: radius.md,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    primary: { backgroundColor: colors.primary },
    ghost: { backgroundColor: colors.surface },
    disabled: { opacity: 0.5 },
    label: { fontSize: 15, fontWeight: "700" as const },
    primaryLabel: { color: colors.white },
    ghostLabel: { color: colors.text },
  }));
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === "primary" ? styles.primary : styles.ghost,
        disabled && styles.disabled,
        pressed && !disabled && { opacity: 0.85 },
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === "primary" ? styles.primaryLabel : styles.ghostLabel,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
