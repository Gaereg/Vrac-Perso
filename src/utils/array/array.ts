export const updateTabValue = (
  oldTab: unknown[],
  idx: number,
  newValue?: unknown
): unknown[] => [...oldTab.slice(0, idx), ...(newValue ? [newValue] : []), ...oldTab.slice(idx + 1)];