export const getCssVariable = (varName: string) => {
  if (typeof window === "undefined") return undefined;
  varName = varName.replace(/var\(|\)/g, "");
  if (!varName.startsWith("--")) return undefined;
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(varName).trim();
};
