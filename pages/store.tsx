import * as React from 'react';
import { getRegion } from '@/lib/region';
import { getProductsListWithSort } from '@/lib/product';
import useSWR from "swr";
import { PaginatedProductsParams } from '@/types/global';
import { COUNTRY_CODE } from '@/lib/constants';

const PRODUCT_LIMIT = 4;

async function useProduct() {
  const region = await getRegion("ca");

  if (!region) {
    return null
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    queryParams,
    countryCode: COUNTRY_CODE,
    page: 1
  });

  return { products, count };
}
export default function PlasmicHost() {
  
  const { data, isLoading, error } = useSWR("products", useProduct);

  if (isLoading) {
    return <>Loading</>
  }
  if (!data || error) {
    return <>Error</>
  }
  const { count, products } = data;
  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {products.map((p) => {
          return (
            <li key={p.id}>
              {JSON.stringify(products)}
            </li>
          )
        })}
      </ul>
      {totalPages}
    </>
  )
}
