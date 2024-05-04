import { DataProvider, useSelector } from "@plasmicapp/react-web/lib/host";
import { defaultProduct } from "./util/default-product";
import { Product } from "@medusajs/product";

const productSelector = "currentProduct";

export function ProductProvider({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  return (
    <DataProvider name={productSelector} data={product} key={product.id}>
      {children}
    </DataProvider>
  );
}

export const useProduct = () => {
  const product = useSelector(productSelector) as Product | undefined;
  return product ?? defaultProduct;
};
