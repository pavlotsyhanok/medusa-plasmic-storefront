import { useCart } from "@/lib/hooks/cart/use-cart";
import { CodeComponentMeta, DataProvider } from "@plasmicapp/react-web/lib/host";

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider(props: CartProviderProps) {
  const { data } = useCart();
  return (
    <DataProvider data={data} name="cart">
      {props.children}
    </DataProvider>
  );
}

export const cartProviderMeta: CodeComponentMeta<CartProviderProps> =
  {
    name: "medusa-cart-provider",
    displayName: "Cart Provider",
    description:
      "Use this to create bespoke cart UI. Inside Cart Provider, use dynamic values to access cart data.",
    props: {
      children: "slot",
    },
    providesData: true,
    importPath: "./components/medusa/CartProvider",
    importName: "CartProvider"
  };