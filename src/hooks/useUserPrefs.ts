import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getItem, setItem } from "../storage/asyncStorage";
import { StorageKeys } from "../storage/keys";
import type { UserPrefs } from "../types";
import { queryKeys } from "./queries";

const defaults: UserPrefs = { notifications: true, darkMode: false };

const load = (): Promise<UserPrefs> =>
  getItem<UserPrefs>(StorageKeys.userPrefs, defaults);

export function useUserPrefs() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.userPrefs,
    queryFn: load,
    initialData: defaults,
  });

  const update = useMutation({
    mutationFn: async (patch: Partial<UserPrefs>) => {
      const current = await load();
      const next = { ...current, ...patch };
      await setItem(StorageKeys.userPrefs, next);
      qc.setQueryData(queryKeys.userPrefs, next);
    },
  });

  return { prefs: query.data ?? defaults, update };
}
