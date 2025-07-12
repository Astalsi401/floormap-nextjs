export const getCssVariable = (varName: string) => {
  if (typeof window === "undefined") return undefined;
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(varName).trim();
};
