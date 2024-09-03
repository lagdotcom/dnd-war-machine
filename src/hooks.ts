import { useCallback, useState } from "react";

export function useClearableState<T>(
  initialValue?: T,
): [
  value: T | undefined,
  setValue: (value?: T) => void,
  clearValue: () => void,
] {
  const [value, setValue] = useState(initialValue);
  const clearValue = useCallback(() => setValue(undefined), []);

  return [value, setValue, clearValue];
}
