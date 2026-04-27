import type { User } from "../types";

export const mockUser: User = {
  id: "u1",
  name: "Wendell Nascimento",
  email: "wendell@example.com",
  phone: "+55 11 99999-0000",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
  defaultAddress: {
    id: "a1",
    label: "Casa",
    street: "Rua das Flores, 123 — Apto 45",
    city: "São Paulo - SP",
  },
};
