import { SWRResponse } from "swr";
import { CommerceError } from "@/types/errors";
import type {
  SWRHookSchemaBase,
} from "@/types/hooks";
import { useMutablePlasmicQueryData } from "@plasmicapp/query";

export type ResponseState<Result> = SWRResponse<Result, CommerceError>;

export type UseData = <H extends SWRHookSchemaBase, T extends {}>(
  query: string,
  input: T,
  fetcher: (options: T) => H["data"] | Promise<H["data"]>,
  swrOptions?: any
) => any;

export const useData: UseData = (query, input, fetcherFn, swrOptions) => {
  const hookInput = Array.isArray(input) ? input : Object.entries(input);
  const fetcher = async (
    url: string,
    query?: string,
    method?: string,
    ...args: any[]
  ) => {
    try {
      return await fetcherFn(input);
    } catch (error) {
      // SWR will not log errors, but any error that's not an instance
      // of CommerceError is not welcomed by this hook
      if (!(error instanceof CommerceError)) {
        console.error(error);
      }
      throw error;
    }
  };
  const response = useMutablePlasmicQueryData(
    () => {
      return [query, ...hookInput.map((e) => e[1])];
    },
    fetcher,
    swrOptions,
  );  
  return response;
};
