import { COUNTRY_CODE, SWR_OPTIONS } from "@/lib/constants";
import { getProductByHandle, retrievePricedProductById } from "@/lib/product";
import { getRegion } from "@/lib/region";
import { useData } from "@/lib/util/use-data";

interface UseProductHook {
  handle?: string;
}

const HOOK_KEY = "use-product";

async function fetcher(hookOptions: UseProductHook) {
  const { handle } = hookOptions;
  const region = await getRegion(COUNTRY_CODE)
  if (!region || !handle) {
    return null;
  }

  const { product } = await getProductByHandle(handle).then(
    (product) => product
  );

  if (!product || !product.id) {
    return null
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id,
  })

  return pricedProduct
}

export function useProduct(hookOptions: UseProductHook) {
  return useData(HOOK_KEY, hookOptions, fetcher, SWR_OPTIONS);
}