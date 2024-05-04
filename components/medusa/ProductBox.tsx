import { ProductProvider } from "@/lib/contexts";
import { useProduct } from "@/lib/hooks/products/use-product";
import { useSearch } from "@/lib/hooks/products/use-search";
import { Product } from "@medusajs/product";
import { CodeComponentMeta } from "@plasmicapp/react-web/lib/host";
import debounce from "debounce";
import React from "react";

interface ProductBoxProps {
  className?: string;
  children?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  loadingMessage?: React.ReactNode;
  handle?: string;
  noLayout?: boolean;
  setControlContextData?: (data: {
    products: Product[];
    onSearch?: (value: string) => void;
  }) => void;
}


export function ProductBox(props: ProductBoxProps) {
  const {
    className,
    children,
    emptyMessage,
    loadingMessage,
    noLayout,
    handle,
    setControlContextData,
  } = props;

  const [productSearch, setProductSearch] = React.useState("");

  const { data: allProducts } = useSearch({
    search: productSearch,
  });
  const onSearch = React.useCallback(
    debounce((value: string) => setProductSearch(value), 300),
    []
  );
  if (allProducts) {
    setControlContextData?.({
      products: allProducts,
      onSearch,
    });
  }
  const { data, error, isLoading } = useProduct({
    handle,
  });

  if (isLoading) {
    return React.isValidElement(loadingMessage) ? loadingMessage : null;
  }

  if (error || !data) {
    return React.isValidElement(emptyMessage) ? emptyMessage : null;
  }


  const renderedData = (
    <ProductProvider product={data}>{children}</ProductProvider>
  );

  return noLayout ? (
    <React.Fragment>{renderedData}</React.Fragment>
  ) : (
    <div className={className}>{renderedData}</div>
  )
}


export const productBoxMeta: CodeComponentMeta<ProductBoxProps> = {
  name: "medusa-product-box",
  displayName: "Product Box",
  description:
    "Show a single product. [See commerce tutorial video](https://www.youtube.com/watch?v=1OJ_gXmta2Q)",
  props: {
    children: {
      type: "slot",
      defaultValue: [
        {
          type: "vbox",
          children: [
            {
              type: "component",
              name: "medusa-product-text-field",
              props: {
                field: "title",
              },
            },
            {
              type: "component",
              name: "medusa-product-media",
            },
            {
              type: "component",
              name: "medusa-product-text-field",
              props: {
                field: "description",
              },
            },
          ],
          styles: {
            width: "100%",
            minWidth: 0,
          },
        },
      ]
    },
    emptyMessage: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "No product found!",
      },
    },
    loadingMessage: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Loading...",
      },
    },
    noLayout: "boolean",
    handle: {
      type: "cardPicker",
      modalTitle: "Product",
      onSearch: (props, ctx) => ctx?.onSearch,
      showInput: true,
      options: (props, ctx) =>
        ctx?.products.map((product) => ({
          imgUrl: product.thumbnail ?? "",
          value: product.handle ?? product.id,
          label: product.handle ?? product.id,
          footer: (
            <div>
              <div>
                <strong>{product.title}</strong>
              </div>
              <div>{product.handle}</div>
            </div>
          ),
        })) ?? [],
    },
  },
  providesData: true,
  importPath: "./components/medusa/ProductBox",
  importName: "ProductBox"
};