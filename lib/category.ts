import { medusaClient } from "./config"

export async function listCategories() {
  const headers = {
    next: {
      tags: ["collections"],
    },
  } as Record<string, any>

  return medusaClient.productCategories
    .list({ expand: "category_children" }, headers)
    .then(({ product_categories }) => product_categories)
    .catch((err) => {
      throw err
    })
}