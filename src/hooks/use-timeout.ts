import { useRef } from "react";

export const useTimeout = (pendingRef: React.RefObject<boolean>) => {
  const timeout = useRef<NodeJS.Timeout>(null);
  const setWaiting = (ms: number) => {
    if (pendingRef.current) return;
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      pendingRef.current = false;
    }, ms);
  };
  const clearWaiting = () => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = null;
    pendingRef.current = false;
  };
  return { setWaiting, clearWaiting };
};
