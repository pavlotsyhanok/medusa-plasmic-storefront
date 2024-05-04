import { useProduct } from "@/lib/contexts";
import { CodeComponentMeta } from "@plasmicapp/react-web/lib/host";

interface ProductTextFieldProps {
  className: string;
  field: string;
}

export function ProductTextField(props: ProductTextFieldProps) {
  const { className, field } = props;

  const product = useProduct();

  if (!product) {
    return <span className={className}>Fake Product Field</span>;
  }
  if (!field) {
    return <span className={className}>Unknown Product Field</span>;
  }

  let value = (product as any)[field];
  return <span className={className}>{value}</span>;
}

export const productTextFieldMeta: CodeComponentMeta<ProductTextFieldProps> = {
  name: "medusa-product-text-field",
  displayName: "Product Text Field",
  props: {
    field: {
      type: "choice",
      options: ["id", "title", "description", "handle", "path"],
    },
  },
  importPath: "./components/medusa/ProductTextField",
  importName: "ProductTextField"
};