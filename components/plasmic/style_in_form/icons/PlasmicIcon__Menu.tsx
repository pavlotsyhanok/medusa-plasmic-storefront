// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type MenuIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function MenuIcon(props: MenuIconProps) {
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
        d={"M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"}
      ></path>
    </svg>
  );
}

export default MenuIcon;
/* prettier-ignore-end */
