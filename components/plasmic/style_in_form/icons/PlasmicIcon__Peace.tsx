// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type PeaceIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function PeaceIcon(props: PeaceIconProps) {
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

      <g clipPath={"url(#cavICxb1za)"}>
        <path
          d={
            "M26.992 19.016a3.523 3.523 0 00-.875-.636l-.4-1.356-8.012-.056-.307 1.091a3.19 3.19 0 00-1.393.718l-3.611-3.954a2.335 2.335 0 00-1.389 2.133v.96l-4 4.166.016 2.188 9.984 10.729s10.518-15.288 10.543-15.258c-.127-.224-.511-.703-.556-.725z"
          }
          fill={"#EF9645"}
        ></path>

        <path
          d={
            "M24.581 18H18c-.208 0-.411.021-.607.061l-.073-.278-3.273-12.464s-.416-1.957 1.54-2.372c1.956-.416 2.372 1.54 2.372 1.54l3.097 11.569a26.6 26.6 0 011.305.107l2.061-10.512s.188-1.991 2.18-1.804c1.991.188 1.803 2.179 1.803 2.179L26.34 17.187l-.221 1.194A3.39 3.39 0 0024.581 18zM8.916 16h.168c1.059 0 1.916.858 1.916 1.917v4.166A1.916 1.916 0 019.084 24h-.168A1.916 1.916 0 017 22.083v-4.166C7 16.858 7.857 16 8.916 16zm6.918 2.96l-.056.062A2.95 2.95 0 0015 21c0 .063.013.123.018.185.044.678.308 1.292.728 1.774a2.041 2.041 0 01-.259.353A1.97 1.97 0 0114 24a2 2 0 01-2-2v-6c0-.441.147-.845.389-1.176A1.993 1.993 0 0114 14a2 2 0 012 2v2.778c-.061.055-.109.123-.166.182z"
          }
          fill={"#FFDC5D"}
        ></path>

        <path
          d={
            "M9.062 25a2.93 2.93 0 002.45-1.322c.123.183.271.346.431.497 1.185 1.115 3.034 1.044 4.167-.086.152-.152.303-.305.419-.488l-.003-.003C16.727 23.713 17 24 18 24h2.537a6.35 6.35 0 00-1.024 1c-1.228 1.467-2.013 3.606-2.013 6a.5.5 0 001 0c0-2.548.956-4.775 2.377-6 .732-.631 1.584-1 2.498-1 .713.079.847-1 .125-1H18a2 2 0 010-4h8c.858 0 1.66.596 1.913 1.415L29 24c.103.335.479 1.871.411 2.191C29.411 31 24.715 36 19 36c-6.537 0-11.844-5.231-11.986-11.734l.014.01a2.909 2.909 0 001.91.724h.124z"
          }
          fill={"#FFDC5D"}
        ></path>
      </g>

      <defs>
        <clipPath id={"cavICxb1za"}>
          <path fill={"#fff"} d={"M0 0h36v36H0z"}></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default PeaceIcon;
/* prettier-ignore-end */
