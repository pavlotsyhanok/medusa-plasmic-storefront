import { ProductCollection, productCollectionMeta } from "../../components/medusa/ProductCollection";
import { ProductBox, productBoxMeta } from "@/components/medusa/ProductBox";
import { CategoryCollection, categoryCollectionMeta } from "@/components/medusa/CategoryCollection";
import { MedusaProvider, medusaProviderMeta } from "@/components/medusa/MedusaProvider";
import { CartProvider, cartProviderMeta } from "@/components/medusa/CartProvider";
import { ProductTextField, productTextFieldMeta } from "@/components/medusa/ProductTextField";
import { ProductMedia, productMediaMeta } from "@/components/medusa/ProductMedia";
import { registerComponent, registerGlobalContext } from "@plasmicapp/react-web/lib/host";

export function registerAll() {
  registerGlobalContext(MedusaProvider, medusaProviderMeta);

  registerComponent(CartProvider, cartProviderMeta);
  registerComponent(CategoryCollection, categoryCollectionMeta);
  registerComponent(ProductBox, productBoxMeta);
  registerComponent(ProductCollection, productCollectionMeta);
  registerComponent(ProductMedia, productMediaMeta);
  registerComponent(ProductTextField, productTextFieldMeta);
}