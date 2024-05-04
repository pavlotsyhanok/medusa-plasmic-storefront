// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type MedalIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function MedalIcon(props: MedalIconProps) {
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

      <path d={"M18 8l-7-8H0l14 17 11.521-4.75L18 8z"} fill={"#55ACEE"}></path>

      <path
        d={"M25 0l-7 8 5.39 7.312 1.227-1.489L36 0H25z"}
        fill={"#3B88C3"}
      ></path>

      <path
        d={
          "M23.26 16.026c.08-.217.131-.448.131-.693a2 2 0 00-2-2h-6.667a2 2 0 00-2 2c0 .245.05.476.131.693-3.258 1.826-5.464 5.307-5.464 9.307C7.391 31.224 12.166 36 18.058 36c5.891 0 10.667-4.776 10.667-10.667 0-4-2.206-7.481-5.465-9.307z"
        }
        fill={"#FFAC33"}
      ></path>

      <path
        d={"M18.058 33.333a8 8 0 100-16 8 8 0 000 16z"}
        fill={"#FFD983"}
      ></path>

      <path
        d={
          "M21.278 30.634a.699.699 0 01-.406-.131L18 28.444l-2.871 2.059a.697.697 0 01-1.071-.777l1.071-3.456-2.845-2.005a.698.698 0 01.409-1.259l3.524-.005 1.122-3.37a.697.697 0 011.324 0l1.103 3.37 3.542.005a.697.697 0 01.409 1.259l-2.846 2.005 1.071 3.456a.695.695 0 01-.664.908z"
        }
        fill={"#FFAC33"}
      ></path>
    </svg>
  );
}

export default MedalIcon;
/* prettier-ignore-end */
