import { fetchCart } from "@/lib/cart";
import { listCategories } from "@/lib/category";
import { medusaClient } from "@/lib/config";
import { getProductsListWithSort } from "@/lib/product";
import { getRegion } from "@/lib/region";
import { useData } from "@/lib/util/use-data";
import { PaginatedProductsParams, SortOptions } from "@/types/global";

const HOOK_KEY = "use-cart";

interface UseCartHook {}

async function fetcher(hookOptions: UseCartHook) {
  return fetchCart();
}

export function useCart(hookOptions?: UseCartHook) {
  return useData(HOOK_KEY, hookOptions ?? {}, fetcher);
}