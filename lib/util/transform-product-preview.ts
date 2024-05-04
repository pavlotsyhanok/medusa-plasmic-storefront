import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

import { formatAmount } from "@/lib/util/prices"
import { getPercentageDiff } from "@/lib/util/get-precentage-diff"
import { CalculatedVariant } from "@/types/medusa"
import { ProductPreviewType } from "@/types/global"

const transformProductPreview = (
  product: PricedProduct,
  region: Region
): ProductPreviewType => {
  const variants = product.variants as unknown as CalculatedVariant[]

  let cheapestVariant = undefined

  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr
      }
      return acc
    }, variants[0])
  }

  return {
    ...product,
    id: product.id!,
    title: product.title!,
    handle: product.handle!,
    thumbnail: product.thumbnail!,
    description: product.description,
    created_at: product.created_at,
    images: product.images,
    price: cheapestVariant
      ? {
          calculated_price: formatAmount({
            amount: cheapestVariant.calculated_price,
            region: region,
            includeTaxes: false,
          }),
          calculated_price_amount: cheapestVariant.calculated_price,
          original_price: formatAmount({
            amount: cheapestVariant.original_price,
            region: region,
            includeTaxes: false,
          }),
          original_price_amount: cheapestVariant.original_price,
          difference: getPercentageDiff(
            cheapestVariant.original_price,
            cheapestVariant.calculated_price
          ),
          price_type: cheapestVariant.calculated_price_type,
        }
      : undefined,
  }
}

export default transformProductPreview
