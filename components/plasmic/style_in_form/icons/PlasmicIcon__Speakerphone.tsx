// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type SpeakerphoneIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function SpeakerphoneIcon(props: SpeakerphoneIconProps) {
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
        d={"M14 19a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z"}
        fill={"#3B88C3"}
      ></path>

      <path
        d={
          "M1.783 14.023v.02C.782 14.263 0 15.939 0 18s.782 3.737 1.783 3.956v.021l28.701 7.972V6.064L1.783 14.023z"
        }
        fill={"#55ACEE"}
      ></path>

      <path
        d={
          "M31 30c2.761 0 5-5.373 5-12S33.761 6 31 6s-5 5.373-5 12 2.239 12 5 12z"
        }
        fill={"#269"}
      ></path>
    </svg>
  );
}

export default SpeakerphoneIcon;
/* prettier-ignore-end */
