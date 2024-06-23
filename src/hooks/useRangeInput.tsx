import { useState } from "react";

export const useRangeInput = () => {
  const [config, setConfig] = useState<{
    min: number;
    max: number;
    defaultValue: number;
  }>({
    min: 0,
    max: 0,
    defaultValue: 0,
  });

  return { config, setConfig };
};
