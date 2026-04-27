import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../theme";
import type { Restaurant } from "../types";
import { formatBRL } from "../utils/format";

type Props = {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAdd: () => void;
};

export function RestaurantCard({
  restaurant,
  isFavorite,
  onToggleFavorite,
  onAdd,
}: Props) {
  const [min, max] = restaurant.deliveryTimeMinutes;
  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: restaurant.image }} style={styles.image} />
        <Pressable onPress={onToggleFavorite} style={styles.favBtn} hitSlop={8}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? colors.danger : colors.text}
          />
        </Pressable>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={12} color={colors.star} />
            <Text style={styles.ratingText}>
              {restaurant.rating.toFixed(1)}
            </Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={1}>
          {restaurant.description}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={12} color={colors.textMuted} />
            <Text style={styles.metaText}>
              {min}-{max} min
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons
              name="bicycle-outline"
              size={12}
              color={colors.textMuted}
            />
            <Text style={styles.metaText}>
              {formatBRL(restaurant.deliveryFee)}
            </Text>
          </View>
          <Pressable onPress={onAdd} style={styles.addBtn} hitSlop={6}>
            <Ionicons name="add" size={18} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageWrap: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: colors.surfaceMuted,
  },
  favBtn: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: "600",
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  addBtn: {
    marginLeft: "auto",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
