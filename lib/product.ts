import { ProductPreviewType, SortOptions } from "@/types/global";
import { medusaClient } from "@/lib/config";
import {
  ProductCategory,
  ProductCollection,
  Region,
  StoreGetProductsParams,
  StorePostAuthReq,
  StorePostCartsCartReq,
  StorePostCustomersCustomerAddressesAddressReq,
  StorePostCustomersCustomerAddressesReq,
  StorePostCustomersCustomerReq,
  StorePostCustomersReq,
} from "@medusajs/medusa"
import { getRegion } from "@/lib/region";
import transformProductPreview from "@/lib/util/transform-product-preview";
import sortProducts from "./util/sort-products";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";


const emptyResponse = {
  response: { products: [], count: 0 },
  nextPage: null,
}

async function getProductsList({
  queryParams,
  countryCode,
}: {
  pageParam?: number
  queryParams?: StoreGetProductsParams
  countryCode: string
}): Promise<{
  response: { products: ProductPreviewType[]; count: number }
  queryParams?: StoreGetProductsParams
}> {

  // const region = await getRegion(countryCode)
  const region = await getRegion("ca");
  if (!region) {
    return emptyResponse
  }

  const { products, count } = await medusaClient.products
    .list(
      {
        region_id: region.id,
        expand: "categories,variants,variants.prices,images,options,profiles",
        ...queryParams,
      },
      { next: { tags: ["products"] } }
    )
    .then((res) => res)
    .catch((err) => {
      throw err
    });
  
  const transformedProducts = products.map((product) => {
    return transformProductPreview(product, region!)
  })

  return {
    response: { products: transformedProducts, count },
    queryParams,
  }
}

export async function getProductsListWithSort({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: StoreGetProductsParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: ProductPreviewType[]; count: number }
  queryParams?: StoreGetProductsParams
}> {
  const limit = queryParams?.limit || 12
  const offset = page * limit;

  const {
    response: { products, count },
  } = await getProductsList({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      offset,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  return {
    response: {
      products: sortedProducts,
      count,
    },
    queryParams,
  }
}


export async function getProductByHandle (handle: string): Promise<{ product: PricedProduct }> {
  const product = await medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0])
    .catch((err) => {
      throw err
    })

  return { product }
}

export async function retrievePricedProductById({
  id,
  regionId,
}: {
  id: string
  regionId: string
}) {
  return medusaClient.products
    .retrieve(`${id}?region_id=${regionId}`)
    .then(({ product }) => product)
    .catch((err) => {
      console.log(err)
      return null
    })
}