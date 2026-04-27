import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getItem, setItem } from "../storage/asyncStorage";
import { StorageKeys } from "../storage/keys";
import { queryKeys } from "./queries";

const load = (): Promise<string[]> =>
  getItem<string[]>(StorageKeys.favorites, []);

export function useFavorites() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.favorites,
    queryFn: load,
    initialData: [] as string[],
  });

  const ids = query.data ?? [];

  const toggle = useMutation({
    mutationFn: async (id: string) => {
      const current = await load();
      const next = current.includes(id)
        ? current.filter((i) => i !== id)
        : [...current, id];
      await setItem(StorageKeys.favorites, next);
      qc.setQueryData(queryKeys.favorites, next);
    },
  });

  const isFavorite = (id: string) => ids.includes(id);

  return { ids, isFavorite, toggle };
}
