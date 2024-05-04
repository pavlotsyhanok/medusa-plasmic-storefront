import * as React from "react";
import {
  PlasmicSelect__Overlay,
  DefaultSelect__OverlayProps
} from "./plasmic/style_in_form/PlasmicSelect__Overlay";

import { TriggeredOverlayRef } from "@plasmicapp/react-web";

export interface Select__OverlayProps extends DefaultSelect__OverlayProps {
  // Feel free to add any additional props that this component should receive
}
function Select__Overlay_(
  props: Select__OverlayProps,
  ref: TriggeredOverlayRef
) {
  const { plasmicProps } = PlasmicSelect__Overlay.useBehavior(props, ref);
  return <PlasmicSelect__Overlay {...plasmicProps} />;
}

const Select__Overlay = React.forwardRef(Select__Overlay_);

export default Object.assign(Select__Overlay, {
  __plumeType: "triggered-overlay"
});
