import { medusaClient } from "@/lib/config";
import { COUNTRY_CODE, SWR_OPTIONS } from "@/lib/constants";
import { getRegion } from "@/lib/region";
import { useData } from "@/lib/util/use-data";
import { isPlasmicPrepass } from "@plasmicapp/react-web/lib/query";

interface UseSearchHook {
  limit?: number;
  page?: number;
  search?: string;
}

const HOOK_KEY = "use-search";

async function fetcher(hookOptions: UseSearchHook) {
  if (isPlasmicPrepass()) {
    return null;
  }
  
  const { limit = 12, page = 0, search } = hookOptions;
  const region = await getRegion(COUNTRY_CODE)

  if (!region) {
    return null
  }

  const offset = page * limit;
  return medusaClient.products.search({
    q: search,
    offset,
    limit
  }).then((data) => data.hits);
}

export function useSearch(hookOptions: UseSearchHook) {
  return useData(HOOK_KEY, hookOptions, fetcher, SWR_OPTIONS);
}