import { COUNTRY_CODE, SWR_OPTIONS } from "@/lib/constants";
import { getProductsListWithSort } from "@/lib/product";
import { getRegion } from "@/lib/region";
import { useData } from "@/lib/util/use-data";
import { PaginatedProductsParams, SortOptions } from "@/types/global";

interface UseProductListHook {
  limit?: number;
  categoryId?: string;
  sort?: SortOptions;
  page?: number;
}

const HOOK_KEY = "use-product-list";

async function fetcher(hookOptions: UseProductListHook) {
  const { limit, categoryId, page, sort } = hookOptions;

  const region = await getRegion(COUNTRY_CODE)

  if (!region) {
    return null
  }

  const queryParams: PaginatedProductsParams = {
    limit: limit ?? 20,
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }
  
  const {
    response: { products, count },
  } = await getProductsListWithSort({
    queryParams,
    countryCode: COUNTRY_CODE,
    page: page ?? 0,
    sortBy: sort,
  });

  return { products, count };
}

export function useProductList(hookOptions: UseProductListHook) {
  return useData(HOOK_KEY, hookOptions, fetcher, SWR_OPTIONS);
}