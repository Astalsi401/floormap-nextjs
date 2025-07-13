import dynamic from "next/dynamic";

const options = {
  loading: () => null,
  ssr: false,
};

export const icons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  toilet: dynamic(() => import("./toilet"), { ...options }),
  escalatorUp: dynamic(() => import("./escalator-up"), { ...options }),
  escalatorDown: dynamic(() => import("./escalator-down"), { ...options }),
  escalatorUpDown: dynamic(() => import("./escalator-up-down"), { ...options }),
  elevator: dynamic(() => import("./elevator"), { ...options }),
  arrowUp: dynamic(() => import("./arrow-up"), { ...options }),
  firstAid: dynamic(() => import("./first-aid"), { ...options }),
};
