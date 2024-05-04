import Medusa from "@medusajs/medusa-js"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
})


// export const getMedusaHeaders = (tags: string[] = []) => {
//   const headers = {
//     next: {
//       tags,
//     },
//   } as Record<string, any>

//   const token = cookies().get("_medusa_jwt")?.value

//   if (token) {
//     headers.authorization = `Bearer ${token}`
//   }

//   return headers
// }