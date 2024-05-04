import { useProduct } from "@/lib/contexts";
import { CodeComponentMeta } from "@plasmicapp/react-web/lib/host";
import React from "react";

const placeholderImage =
  "https://static1.plasmic.app/commerce/lightweight-jacket-0.png";

interface ProductMediaProps {
  className: string;
  mediaIndex?: number;
  setControlContextData: (data: { inMediaContext: boolean }) => void;
}

export const ProductMedia = (props: ProductMediaProps) => {
  const { className, mediaIndex = 0, setControlContextData } = props;

  const product = useProduct();
  const image = product?.images?.[mediaIndex];

  return (
    <img
      alt={product?.title || "Product Image"}
      src={product ? image?.url ?? "" : placeholderImage}
      loading={"lazy"}
      className={className}
    />
  );
}

export const productMediaMeta: CodeComponentMeta<ProductMediaProps> = {
  name: "medusa-product-media",
  displayName: "Product Media",
  props: {
    mediaIndex: {
      type: "number",
      min: 0,
      hidden: (_, ctx) => !!ctx?.inMediaContext,
    },
  },
  importPath: "./components/medusa/ProductMedia",
  importName: "ProductMedia"
};
