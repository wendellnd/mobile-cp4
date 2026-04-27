import { useMemo, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryChip } from "../components/CategoryChip";
import { EmptyState } from "../components/EmptyState";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { RestaurantCard } from "../components/RestaurantCard";
import { useCategories, useRestaurants, useUser } from "../hooks/queries";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { spacing } from "../theme";
import { useThemedStyles } from "../theme/useThemedStyles";

export function HomeScreen() {
  const { data: user } = useUser();
  const categoriesQ = useCategories();
  const restaurantsQ = useRestaurants();
  const cart = useCart();
  const favorites = useFavorites();
  const styles = useThemedStyles((c) => ({
    safe: { flex: 1, backgroundColor: c.background },
    titleWrap: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.md,
    },
    title: {
      fontSize: 22,
      fontWeight: "700" as const,
      color: c.text,
    },
    subtitle: { color: c.textMuted, fontSize: 13, marginTop: 2 },
    chips: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    list: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.xxl,
      flexGrow: 1,
    },
  }));

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const list = restaurantsQ.data ?? [];
    if (!selectedCategory) return list;
    return list.filter((r) => r.categoryId === selectedCategory);
  }, [restaurantsQ.data, selectedCategory]);

  if (categoriesQ.isLoading || restaurantsQ.isLoading) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Header
        greeting={`Olá, ${user?.name.split(" ")[0] ?? "visitante"}`}
        address={user?.defaultAddress.street ?? "Definir endereço"}
      />

      <View style={styles.titleWrap}>
        <Text style={styles.title}>O que vai pedir hoje?</Text>
        <Text style={styles.subtitle}>
          Restaurantes selecionados perto de você
        </Text>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          <CategoryChip
            category={{ id: "all", name: "Todos", icon: "apps" }}
            selected={selectedCategory === null}
            onPress={() => setSelectedCategory(null)}
          />
          {(categoriesQ.data ?? []).map((c) => (
            <CategoryChip
              key={c.id}
              category={c}
              selected={selectedCategory === c.id}
              onPress={() => setSelectedCategory(c.id)}
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="restaurant-outline"
            title="Nenhum restaurante"
            message="Tente outra categoria."
          />
        }
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            isFavorite={favorites.isFavorite(item.id)}
            onToggleFavorite={() => favorites.toggle.mutate(item.id)}
            onAdd={() => cart.add.mutate(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}
