import { useCategories } from "@/lib/hooks/categories/use-categories";
import { CodeComponentMeta, DataProvider } from "@plasmicapp/react-web/lib/host";
import React from "react";

interface CategoryCollectionProps {
  className?: string;
  children?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  loadingMessage?: React.ReactNode;
  noLayout?: boolean;
}

export function CategoryCollection(props: CategoryCollectionProps) {
  const {
    className,
    children,
    emptyMessage,
    loadingMessage,
    noLayout,
  } = props;

  const { data, isLoading, error } = useCategories();

  if (isLoading) {
    return React.isValidElement(loadingMessage) ? loadingMessage : null;
  }

  if (error || !data) {
    return React.isValidElement(emptyMessage) ? emptyMessage : null;
  }

  return (
    <DataProvider name="categories" data={data}>
      {noLayout ? (
        <React.Fragment>{children}</React.Fragment>
      ) : (
        <div className={className}>{children}</div>
      )}
    </DataProvider>
  )
}


export const categoryCollectionMeta: CodeComponentMeta<CategoryCollectionProps> = {
  name: "medusa-category-collection",
  displayName: "Category Collection",
  props: {
    children: {
      type: "slot",
      defaultValue: [
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
    noLayout: {
      type: "boolean",
      displayName: "No layout",
      description: "Do not render a container element.",
    },
  },
  providesData: true,
  importPath: "./components/medusa/CategoryCollection",
  importName: "CategoryCollection"
};