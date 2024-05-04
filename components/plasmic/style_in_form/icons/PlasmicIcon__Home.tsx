// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type HomeIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function HomeIcon(props: HomeIconProps) {
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
        d={"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"}
      ></path>
    </svg>
  );
}

export default HomeIcon;
/* prettier-ignore-end */
