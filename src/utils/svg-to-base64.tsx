import { renderToString } from "react-dom/server";

export const svgToBase64 = (Component: React.ComponentType) => {
  const svgString = renderToString(<Component />);
  const base64 = btoa(svgString);
  return `data:image/svg+xml;base64,${base64}`;
};
