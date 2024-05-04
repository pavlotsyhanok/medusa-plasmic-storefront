import * as React from "react";
import {
  PlasmicSelect__OptionGroup,
  DefaultSelect__OptionGroupProps
} from "./plasmic/style_in_form/PlasmicSelect__OptionGroup";

export interface Select__OptionGroupProps
  extends DefaultSelect__OptionGroupProps {
  // Feel free to add any additional props that this component should receive
}
function Select__OptionGroup(props: Select__OptionGroupProps) {
  const { plasmicProps } = PlasmicSelect__OptionGroup.useBehavior(props);
  return <PlasmicSelect__OptionGroup {...plasmicProps} />;
}

export default Object.assign(
  Select__OptionGroup,

  {
    __plumeType: "select-option-group"
  }
);
