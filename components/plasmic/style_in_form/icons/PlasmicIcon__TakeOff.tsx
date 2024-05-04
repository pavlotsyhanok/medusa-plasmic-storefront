// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type TakeOffIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function TakeOffIcon(props: TakeOffIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      width={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M2.5 19h19v2h-19v-2m19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10 8 3.57l-1.91.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.42 5.31-1.43 4.35-1.16L21 11.5c.81-.24 1.28-1.06 1.07-1.86z"
        }
      ></path>
    </svg>
  );
}

export default TakeOffIcon;
/* prettier-ignore-end */
