"use client";

import { Container } from "@floormap/container";
import { Widgets } from "@floormap/widgets";
import { useFloormapRefs } from "@floormap/provider";
import { useDragZoom } from "@/hooks/use-drag-zoom";
import { useAppSelector } from "@/hooks/use-redux";

export const Floormap: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const refs = useFloormapRefs();
  const { userActions, widgetActions } = useDragZoom(refs);
  const realsize = useAppSelector((state) => state.floormap.realsize);
  return (
    <Container ref={refs.graphRef} {...userActions}>
      <Widgets
        floors={realsize.map((r) => r.floor)}
        widgetActions={widgetActions}
      />
      {children}
    </Container>
  );
};
