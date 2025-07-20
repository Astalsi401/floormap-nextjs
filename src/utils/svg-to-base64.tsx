"use client";

export const svgToBase64 = async ({
  Component,
  props,
}: {
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  props?: React.SVGProps<SVGSVGElement>;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    container.style.visibility = "hidden";
    document.body.appendChild(container);

    import("react-dom/client")
      .then(({ createRoot }) => {
        const root = createRoot(container);
        root.render(<Component {...props} />);

        const checkRender = () => {
          const svgElement = container.querySelector("svg");

          if (svgElement) {
            const svgString = svgElement.outerHTML;
            const base64 = btoa(svgString);
            const dataUrl = `data:image/svg+xml;base64,${base64}`;

            root.unmount();
            document.body.removeChild(container);
            resolve(dataUrl);
          } else {
            setTimeout(checkRender, 10);
          }
        };

        setTimeout(checkRender, 0);
      })
      .catch(reject);
  });
};
