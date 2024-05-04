// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type CashIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function CashIcon(props: CashIconProps) {
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
          "M12.3 8.93L9.88 6.5h5.62V10H17V5H9.88l2.42-2.43-1.06-1.07L7 5.75 11.24 10l1.06-1.07M12 14a3 3 0 103 3 3 3 0 00-3-3m-9-3v12h18V11m-2 8a2 2 0 00-2 2H7a2 2 0 00-2-2v-4a2 2 0 002-2h10a2 2 0 002 2z"
        }
      ></path>
    </svg>
  );
}

export default CashIcon;
/* prettier-ignore-end */
