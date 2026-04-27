import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme, type Colors } from "./index";

/**
 * Build StyleSheet styles that depend on the active theme `colors`.
 * The factory is invoked whenever the palette changes, ensuring components
 * re-render with the correct colors when dark mode is toggled.
 */
export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: (colors: Colors) => T,
): T {
  const { colors } = useTheme();
  // Factory is intentionally not in deps: callers pass an inline closure that
  // depends only on `colors`, so we recompute styles only when the palette changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => StyleSheet.create(factory(colors)), [colors]);
}
