import { listCategories } from "@/lib/category";
import { SWR_OPTIONS } from "@/lib/constants";
import { useData } from "@/lib/util/use-data";

const HOOK_KEY = "use-categories";

interface UseCategoriesHook {}

async function fetcher(hookOptions: UseCategoriesHook) {
  const categories = await listCategories();

  return categories;
}

export function useCategories(hookOptions?: UseCategoriesHook) {
  return useData(HOOK_KEY, hookOptions ?? {}, fetcher, SWR_OPTIONS);
}