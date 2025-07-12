import { useCallback, useEffect, useRef } from "react";

export const useAnimationFrame = () => {
  const animationRefs = useRef<Set<number>>(new Set());

  const safeRequestAnimationFrame = useCallback((callback: () => void) => {
    const id = requestAnimationFrame(() => {
      try {
        callback();
      } catch (error) {
        console.error("Animation frame error:", error);
      } finally {
        animationRefs.current.delete(id);
      }
    });
    animationRefs.current.add(id);
    return id;
  }, []);

  useEffect(() => {
    return () => {
      // 清理所有進行中的動畫
      animationRefs.current.forEach((id) => {
        cancelAnimationFrame(id);
      });
      animationRefs.current.clear();
    };
  }, []);
  return { safeRequestAnimationFrame };
};
