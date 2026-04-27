import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { radius, spacing, useTheme } from "../theme";
import { useThemedStyles } from "../theme/useThemedStyles";
import type { CartItem } from "../types";
import { formatBRL } from "../utils/format";

type Props = {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

export function CartItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: Props) {
  const { colors } = useTheme();
  const styles = useThemedStyles((c) => ({
    row: {
      flexDirection: "row" as const,
      padding: spacing.md,
      backgroundColor: c.background,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: c.border,
      marginBottom: spacing.md,
      gap: spacing.md,
    },
    image: {
      width: 64,
      height: 64,
      borderRadius: radius.sm,
      backgroundColor: c.surfaceMuted,
    },
    info: { flex: 1, justifyContent: "center" as const },
    name: { fontSize: 14, fontWeight: "700" as const, color: c.text },
    price: { fontSize: 13, color: c.textMuted, marginTop: 2 },
    subtotal: {
      fontSize: 12,
      color: c.primary,
      fontWeight: "600" as const,
      marginTop: 4,
    },
    actions: {
      alignItems: "flex-end" as const,
      justifyContent: "space-between" as const,
    },
    trash: { padding: 2 },
    stepper: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      backgroundColor: c.surface,
      borderRadius: radius.pill,
      paddingHorizontal: 6,
      paddingVertical: 2,
      gap: 6,
    },
    stepBtn: {
      width: 22,
      height: 22,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    qty: {
      minWidth: 16,
      textAlign: "center" as const,
      fontWeight: "700" as const,
      color: c.text,
    },
  }));
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>{formatBRL(item.unitPrice)}</Text>
        <Text style={styles.subtotal}>
          Subtotal: {formatBRL(item.unitPrice * item.quantity)}
        </Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onRemove} hitSlop={8} style={styles.trash}>
          <Ionicons name="trash-outline" size={16} color={colors.textMuted} />
        </Pressable>
        <View style={styles.stepper}>
          <Pressable onPress={onDecrement} hitSlop={6} style={styles.stepBtn}>
            <Ionicons name="remove" size={16} color={colors.text} />
          </Pressable>
          <Text style={styles.qty}>{item.quantity}</Text>
          <Pressable onPress={onIncrement} hitSlop={6} style={styles.stepBtn}>
            <Ionicons name="add" size={16} color={colors.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
