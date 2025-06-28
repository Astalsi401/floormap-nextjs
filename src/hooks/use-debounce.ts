import { useRef, useState } from "react";

export const useDebounce = () => {
  const [isWaiting, setWait] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(null);
  const setWaiting = (ms: number) => {
    setWait(true);
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setWait(false);
      timeout.current = null;
    }, ms);
  };
  return { isWaiting, setWaiting };
};
