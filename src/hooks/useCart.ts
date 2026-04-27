import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { getItem, setItem } from "../storage/asyncStorage";
import { StorageKeys } from "../storage/keys";
import type { CartItem, Restaurant } from "../types";
import { queryKeys } from "./queries";

const loadCart = (): Promise<CartItem[]> =>
  getItem<CartItem[]>(StorageKeys.cart, []);
const saveCart = (items: CartItem[]) => setItem(StorageKeys.cart, items);

export function useCart() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.cart,
    queryFn: loadCart,
    initialData: [] as CartItem[],
  });

  const items = query.data ?? [];

  const mutate = (next: CartItem[]) =>
    saveCart(next).then(() => {
      qc.setQueryData(queryKeys.cart, next);
    });

  const add = useMutation({
    mutationFn: async (restaurant: Restaurant) => {
      const current = await loadCart();
      const existing = current.find((i) => i.id === restaurant.id);
      const next = existing
        ? current.map((i) =>
            i.id === restaurant.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [
            ...current,
            {
              id: restaurant.id,
              restaurantId: restaurant.id,
              name: restaurant.name,
              image: restaurant.image,
              unitPrice: restaurant.basePrice,
              quantity: 1,
            } satisfies CartItem,
          ];
      await mutate(next);
    },
  });

  const updateQty = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const current = await loadCart();
      const next =
        quantity <= 0
          ? current.filter((i) => i.id !== id)
          : current.map((i) => (i.id === id ? { ...i, quantity } : i));
      await mutate(next);
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const current = await loadCart();
      await mutate(current.filter((i) => i.id !== id));
    },
  });

  const clear = useMutation({
    mutationFn: async () => {
      await mutate([]);
    },
  });

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (acc, i) => acc + i.unitPrice * i.quantity,
      0,
    );
    const deliveryFee = items.length > 0 ? 6.99 : 0;
    const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);
    return { subtotal, deliveryFee, total: subtotal + deliveryFee, totalQty };
  }, [items]);

  return {
    items,
    isLoading: query.isLoading,
    add,
    updateQty,
    remove,
    clear,
    ...totals,
  };
}
