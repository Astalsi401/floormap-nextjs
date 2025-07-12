import { renderToString } from "react-dom/server";

export const svgToBase64 = ({
  Component,
  props,
}: {
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  props?: React.SVGProps<SVGSVGElement>;
}) => {
  const svgString = renderToString(<Component {...props} />);
  const base64 = btoa(svgString);
  return `data:image/svg+xml;base64,${base64}`;
};
