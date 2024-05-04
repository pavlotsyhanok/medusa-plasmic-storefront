import { ProductProvider } from "@/lib/contexts";
import { useCategories } from "@/lib/hooks/categories/use-categories";
import { useProductList } from "@/lib/hooks/products/use-product-list";
import { SortOptions } from "@/types/global";
import { Product, ProductCategory } from "@medusajs/product";
import { CodeComponentMeta, DataProvider, repeatedElement } from "@plasmicapp/react-web/lib/host";
import React from "react";

export interface ProductCollectionProps {
  className?: string;
  children?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  loadingMessage?: React.ReactNode;

  noAutoRepeat?: boolean;
  noLayout?: boolean;
  limit?: number;
  page?: number;
  category: string;
  search?: string;
  sort?: SortOptions;
  setControlContextData?: (data: {
    categories: ProductCategory[];
  }) => void;
}

export function ProductCollection(props: ProductCollectionProps) {
  const {
    className,
    children,
    emptyMessage,
    loadingMessage,
    limit,
    noAutoRepeat,
    noLayout,
    category,
    sort,
    page,
    setControlContextData,
  } = props;

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } =
    useCategories();

  const { data, isLoading, error } = useProductList({
    limit,
    sort,
    categoryId: category,
    page,
  });

  if ([isLoading, isCategoriesLoading].includes(true)) {
    return React.isValidElement(loadingMessage) ? loadingMessage : null;
  }

  if (![error, categoriesError].includes(undefined) || !data.count) {
    return React.isValidElement(emptyMessage) ? emptyMessage : null;
  }

  setControlContextData?.({
    categories
  });
  
  const renderedData = noAutoRepeat
    ? children
    : data?.products.map((product: Product, i: number) => (
        <ProductProvider product={product} key={product.id}>
          {repeatedElement(i, children)}
        </ProductProvider>
      ));
      
  return (
    <DataProvider name="products" data={data?.products}>
      {noLayout ? (
        <React.Fragment>{renderedData}</React.Fragment>
      ) : (
        <div className={className}>{renderedData}</div>
      )}
    </DataProvider>
  )
}


export const productCollectionMeta: CodeComponentMeta<ProductCollectionProps> = {
  name: "medusa-product-collection",
  displayName: "Product Collection",
  description:
    "Show a product category. [See commerce tutorial video](https://www.youtube.com/watch?v=1OJ_gXmta2Q)",
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
      ],
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
    limit: "number",
    page: "number",
    category: {
      type: "choice",
      options: (props, ctx) => {
        return (
          ctx?.categories.map((category) => ({
            label: category.name ?? category.id,
            value: category.id,
          })) ?? []
        );
      },
    },
    sort: {
      type: "choice",
      options: [
        {
          label: "New Arrivals",
          value: "created_at",
        },
        {
          label: "Price: Low to High",
          value: "price_asc",
        },
        {
          label: "Price: High to Low",
          value: "price_desc",
        },
      ],
    },
    noAutoRepeat: {
      type: "boolean",
      displayName: "No auto-repeat",
      description: "Do not automatically repeat children for every category.",
    },
    noLayout: {
      type: "boolean",
      displayName: "No layout",
      description: "Do not render a container element.",
    },
  },
  defaultStyles: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridRowGap: "8px",
    gridColumnGap: "8px",
    padding: "8px",
    maxWidth: "100%",
  },
  providesData: true,
  importPath: "./components/medusa/ProductCollection",
  importName: "ProductCollection"
};