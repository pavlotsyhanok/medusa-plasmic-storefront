// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type LockIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function LockIcon(props: LockIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 36 36"}
      height={"1em"}
      width={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M18 3C12.477 3 8 7.477 8 13v10h4V13a6 6 0 0112 0v10h4V13c0-5.523-4.477-10-10-10z"
        }
        fill={"#AAB8C2"}
      ></path>

      <path
        d={
          "M31 32a4 4 0 01-4 4H9a4 4 0 01-4-4V20a4 4 0 014-4h18a4 4 0 014 4v12z"
        }
        fill={"#FFAC33"}
      ></path>
    </svg>
  );
}

export default LockIcon;
/* prettier-ignore-end */
