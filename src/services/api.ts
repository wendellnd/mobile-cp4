import { categories } from "../mocks/categories";
import { restaurants } from "../mocks/restaurants";
import { mockUser } from "../mocks/user";
import type { Category, Restaurant, User } from "../types";

const delay = <T>(value: T, ms = 400): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const fetchCategories = (): Promise<Category[]> => delay(categories);

export const fetchRestaurants = (): Promise<Restaurant[]> => delay(restaurants);

export const fetchUser = (): Promise<User> => delay(mockUser, 300);
