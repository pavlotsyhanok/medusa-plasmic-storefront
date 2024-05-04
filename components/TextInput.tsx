import * as React from "react";
import {
  PlasmicTextInput,
  DefaultTextInputProps
} from "./plasmic/style_in_form/PlasmicTextInput";

import { TextInputRef } from "@plasmicapp/react-web";

export interface TextInputProps extends DefaultTextInputProps {
  // Feel free to add any additional props that this component should receive
}
function TextInput_(props: TextInputProps, ref: TextInputRef) {
  const { plasmicProps } = PlasmicTextInput.useBehavior<TextInputProps>(
    props,
    ref
  );
  return <PlasmicTextInput {...plasmicProps} />;
}

const TextInput = React.forwardRef(TextInput_);

export default Object.assign(
  TextInput,

  {
    __plumeType: "text-input"
  }
);
