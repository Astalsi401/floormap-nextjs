export const searchDefault = (
  searchParams: Record<string, string | undefined>,
  defaultValue: Record<string, string>
) => {
  const defaultParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) defaultParams.set(key, value);
  });
  Object.entries(defaultValue).forEach(([key, value]) => {
    if (!defaultParams.has(key)) defaultParams.set(key, value);
  });
  return defaultParams.toString();
};
