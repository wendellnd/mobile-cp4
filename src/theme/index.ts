import {
  createContext,
  createElement,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useUserPrefs } from "../hooks/useUserPrefs";

export type Colors = {
  primary: string;
  primaryDark: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  star: string;
  white: string;
};

export const lightColors: Colors = {
  primary: "#FF5A1F",
  primaryDark: "#E04A12",
  background: "#FFFFFF",
  surface: "#F7F7F8",
  surfaceMuted: "#EFEFF1",
  text: "#1B1B1F",
  textMuted: "#6B6B72",
  border: "#E5E5EA",
  success: "#1FB55A",
  warning: "#F5B500",
  danger: "#E5384C",
  star: "#F5B500",
  white: "#FFFFFF",
};

export const darkColors: Colors = {
  primary: "#FF6B33",
  primaryDark: "#FF8254",
  background: "#0E0F12",
  surface: "#1A1B1F",
  surfaceMuted: "#26272C",
  text: "#F4F4F6",
  textMuted: "#9A9AA2",
  border: "#2C2D33",
  success: "#2ECC71",
  warning: "#F5B500",
  danger: "#FF5A6E",
  star: "#F5B500",
  white: "#FFFFFF",
};

/**
 * Backward-compatible static export (light palette).
 * Prefer `useTheme().colors` in components so styles react to theme changes.
 */
export const colors = lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 24, fontWeight: "700" as const },
  h2: { fontSize: 20, fontWeight: "700" as const },
  h3: { fontSize: 16, fontWeight: "600" as const },
  body: { fontSize: 14, fontWeight: "400" as const },
  caption: { fontSize: 12, fontWeight: "400" as const },
};

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  colors: Colors;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  colors: lightColors,
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { prefs } = useUserPrefs();
  const value = useMemo<ThemeContextValue>(() => {
    const isDark = !!prefs.darkMode;
    return {
      mode: isDark ? "dark" : "light",
      colors: isDark ? darkColors : lightColors,
      isDark,
    };
  }, [prefs.darkMode]);

  return createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme() {
  return useContext(ThemeContext);
}
