import type { Restaurant } from "../types";

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Bella Napoli",
    description: "Pizzas artesanais no forno a lenha",
    image:
      "https://images.unsplash.com/photo-1587085416963-22efba033dd5?w=800&q=80",
    rating: 4.8,
    deliveryTimeMinutes: [30, 45],
    deliveryFee: 6.99,
    categoryId: "c1",
    basePrice: 49.9,
  },
  {
    id: "r2",
    name: "Burger House",
    description: "Smash burgers e batatas crocantes",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    rating: 4.6,
    deliveryTimeMinutes: [20, 35],
    deliveryFee: 4.99,
    categoryId: "c2",
    basePrice: 32.5,
  },
  {
    id: "r3",
    name: "Sushi Zen",
    description: "Combinados frescos e temakis",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    rating: 4.9,
    deliveryTimeMinutes: [40, 55],
    deliveryFee: 9.9,
    categoryId: "c3",
    basePrice: 78.0,
  },
  {
    id: "r4",
    name: "Verde & Vida",
    description: "Saladas, bowls e sucos detox",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    rating: 4.5,
    deliveryTimeMinutes: [25, 40],
    deliveryFee: 5.5,
    categoryId: "c4",
    basePrice: 28.9,
  },
  {
    id: "r5",
    name: "Doce Encanto",
    description: "Sobremesas, bolos e milkshakes",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    rating: 4.7,
    deliveryTimeMinutes: [20, 30],
    deliveryFee: 3.99,
    categoryId: "c5",
    basePrice: 18.5,
  },
  {
    id: "r6",
    name: "Tap House",
    description: "Cervejas artesanais e petiscos",
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80",
    rating: 4.4,
    deliveryTimeMinutes: [35, 50],
    deliveryFee: 7.5,
    categoryId: "c6",
    basePrice: 24.9,
  },
  {
    id: "r7",
    name: "Forneria Roma",
    description: "Massas frescas e antepastos",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    rating: 4.6,
    deliveryTimeMinutes: [30, 45],
    deliveryFee: 6.5,
    categoryId: "c1",
    basePrice: 44.0,
  },
  {
    id: "r8",
    name: "Green Bowl",
    description: "Poke bowls saudáveis e frescos",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    rating: 4.7,
    deliveryTimeMinutes: [25, 35],
    deliveryFee: 5.0,
    categoryId: "c4",
    basePrice: 36.9,
  },
];
