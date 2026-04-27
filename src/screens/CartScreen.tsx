import { Alert, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { CartItemRow } from "../components/CartItemRow";
import { EmptyState } from "../components/EmptyState";
import { useCart } from "../hooks/useCart";
import { radius, spacing } from "../theme";
import { useThemedStyles } from "../theme/useThemedStyles";
import { formatBRL } from "../utils/format";

export function CartScreen() {
  const cart = useCart();
  const styles = useThemedStyles((c) => ({
    safe: { flex: 1, backgroundColor: c.background },
    headerWrap: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    title: {
      fontSize: 22,
      fontWeight: "700" as const,
      color: c.text,
    },
    subtitle: { color: c.textMuted, fontSize: 13, marginTop: 2 },
    list: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.lg,
    },
    summary: {
      padding: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: c.border,
      backgroundColor: c.background,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
    },
    row: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      paddingVertical: 4,
    },
    rowLabel: { color: c.textMuted, fontSize: 14 },
    rowValue: { color: c.text, fontSize: 14 },
    bold: { fontWeight: "700" as const, color: c.text },
    divider: {
      height: 1,
      backgroundColor: c.border,
      marginVertical: spacing.sm,
    },
  }));

  const Row = ({
    label,
    value,
    bold,
  }: {
    label: string;
    value: string;
    bold?: boolean;
  }) => (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.bold]}>{value}</Text>
    </View>
  );

  const handleCheckout = () => {
    Alert.alert(
      "Pedido finalizado",
      `Total: ${formatBRL(cart.total)}\nObrigado pela compra!`,
      [
        {
          text: "OK",
          onPress: () => cart.clear.mutate(),
        },
      ],
    );
  };

  if (cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.headerWrap}>
          <Text style={styles.title}>Meu carrinho</Text>
        </View>
        <EmptyState
          icon="cart-outline"
          title="Seu carrinho está vazio"
          message="Adicione itens da tela inicial para vê-los aqui."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.headerWrap}>
        <Text style={styles.title}>Meu carrinho</Text>
        <Text style={styles.subtitle}>
          {cart.totalQty} {cart.totalQty === 1 ? "item" : "itens"}
        </Text>
      </View>

      <FlatList
        data={cart.items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onIncrement={() =>
              cart.updateQty.mutate({
                id: item.id,
                quantity: item.quantity + 1,
              })
            }
            onDecrement={() =>
              cart.updateQty.mutate({
                id: item.id,
                quantity: item.quantity - 1,
              })
            }
            onRemove={() => cart.remove.mutate(item.id)}
          />
        )}
      />

      <View style={styles.summary}>
        <Row label="Subtotal" value={formatBRL(cart.subtotal)} />
        <Row label="Taxa de entrega" value={formatBRL(cart.deliveryFee)} />
        <View style={styles.divider} />
        <Row label="Total" value={formatBRL(cart.total)} bold />
        <View style={{ height: spacing.md }} />
        <Button title="Finalizar pedido" onPress={handleCheckout} />
      </View>
    </SafeAreaView>
  );
}
