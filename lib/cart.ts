import { getCookie, setCookie } from "cookies-next"
import { medusaClient } from "./config"
import { getRegion } from "./region"
import { LineItem, StorePostCartsCartReq } from "@medusajs/medusa"
import medusaError from "./medusa-error"
import { CartWithCheckoutStep } from "@/types/global"
import { getCheckoutStep } from "./util/get-checkout-step"
import { COOKIE_OPTIONS, COUNTRY_CODE } from "./constants"



export async function  getCart(cartId: string) {
  return medusaClient.carts
    .retrieve(cartId)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err)
      return null
    })
}

export async function createCart(data = {}) {
  return medusaClient.carts
    .create(data)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err)
      return null
    })
}

export async function updateCart(cartId: string, data: StorePostCartsCartReq) {
  return medusaClient.carts
    .update(cartId, data)
    .then(({ cart }) => cart)
    .catch((error) => medusaError(error))
}

export async function getOrSetCart(countryCode: string) {
  const cartId = getCookie("_medusa_cart_id");
  let cart

  if (cartId) {
    cart = await getCart(cartId).then((cart) => cart)
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const region_id = region.id

  if (!cart) {
    cart = await createCart({ region_id }).then((res) => res)
    cart && setCookie("_medusa_cart_id", cart.id, COOKIE_OPTIONS);
  }

  if (cart && cart?.region_id !== region_id) {
    await updateCart(cart.id, { region_id })
  }

  return cart
}


export async function addItem({
  cartId,
  variantId,
  quantity,
}: {
  cartId: string
  variantId: string
  quantity: number
}) {
  // const headers = getMedusaHeaders(["cart"])

  return medusaClient.carts.lineItems
    .create(cartId, { variant_id: variantId, quantity })
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err)
      return null
    })
}

export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string
  quantity: number
  countryCode: string
}) {
  const cart = await getOrSetCart(countryCode).then((cart) => cart)

  if (!cart) {
    return cart;
  }

  if (!variantId) {
    return cart;
  }

  try {
    return await addItem({ cartId: cart.id, variantId, quantity })
  } catch (e) {
    return cart;
  }
}

export async function fetchCart() {
  const cart = await getOrSetCart(COUNTRY_CODE)
  if (!cart) {
    return null
  }

  if (!cart) {
    return null
  }

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

// Product actions
export async function getProductsById({
  ids,
  regionId,
}: {
  ids: string[]
  regionId: string
}) {
  return medusaClient.products
    .list({ id: ids, region_id: regionId })
    .then(({ products }) => products)
    .catch((err) => {
      console.log(err)
      return null
    })
}


export function omit<T extends {}>(obj: T, ...keys: (keyof T)[]): Partial<T> {
  if (Object.keys(obj).length === 0) {
    return obj;
  }
  const res: Partial<T> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (!keys.includes(key)) {
      res[key] = obj[key];
    }
  }
  return res;
}

export async function enrichLineItems(
  lineItems: LineItem[],
  regionId: string
): Promise<
  | Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">[]
  | undefined
> {
  // Prepare query parameters
  const queryParams = {
    ids: lineItems.map((lineItem) => lineItem.variant.product_id),
    regionId: regionId,
  }

  // Fetch products by their IDs
  const products = await getProductsById(queryParams)

  // If there are no line items or products, return an empty array
  if (!lineItems?.length || !products) {
    return []
  }

  // Enrich line items with product and variant information

  const enrichedItems = lineItems.map((item) => {
    const product = products.find((p) => p.id === item.variant.product_id)
    const variant = product?.variants.find((v) => v.id === item.variant_id)

    // If product or variant is not found, return the original item
    if (!product || !variant) {
      return item
    }

    // If product and variant are found, enrich the item
    return {
      ...item,
      variant: {
        ...variant,
        product: omit(product, "variants"),
      },
    }
  }) as LineItem[]

  return enrichedItems
}