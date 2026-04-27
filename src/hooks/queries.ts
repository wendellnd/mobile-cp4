import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchRestaurants, fetchUser } from "../services/api";

export const queryKeys = {
  categories: ["categories"] as const,
  restaurants: ["restaurants"] as const,
  user: ["user"] as const,
  cart: ["cart"] as const,
  favorites: ["favorites"] as const,
  userPrefs: ["user-prefs"] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRestaurants() {
  return useQuery({
    queryKey: queryKeys.restaurants,
    queryFn: fetchRestaurants,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUser() {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 10,
  });
}
