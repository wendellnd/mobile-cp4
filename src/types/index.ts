export type Category = {
  id: string;
  name: string;
  icon: string; // Ionicons name
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTimeMinutes: [number, number];
  deliveryFee: number;
  categoryId: string;
  basePrice: number;
};

export type CartItem = {
  id: string; // restaurantId for simplicity
  restaurantId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
};

export type Address = {
  id: string;
  label: string;
  street: string;
  city: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  defaultAddress: Address;
};

export type UserPrefs = {
  notifications: boolean;
  darkMode: boolean;
};
