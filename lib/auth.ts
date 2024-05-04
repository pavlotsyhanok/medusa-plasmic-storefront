import { StorePostAuthReq, StorePostCustomersCustomerReq, StorePostCustomersReq } from "@medusajs/medusa"
import { medusaClient } from "./config"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import medusaError from "./medusa-error"
import { COOKIE_OPTIONS } from "./constants"


const getMedusaHeaders = (tags: string[] = []) => {
  const headers = {
    next: {
      tags,
    },
  } as Record<string, any>

  const token = getCookie("_medusa_jwt");

  if (token) {
    headers.authorization = `Bearer ${token}`
  }

  return headers
}

export async function signOut () {
  const headers = getMedusaHeaders(["auth"])

  await medusaClient.auth.deleteSession(headers)
  deleteCookie("_medusa_jwt");
}

// Authentication actions
export async function getToken(credentials: StorePostAuthReq) {
  return medusaClient.auth
    .getToken(credentials, {
      next: {
        tags: ["auth"],
      },
    })
    .then(({ access_token }) => {
      access_token && setCookie("_medusa_jwt", access_token, COOKIE_OPTIONS)
      return access_token
    })
    .catch((err) => {
      throw new Error("Wrong email or password.")
    })
}

export async function authenticate(credentials: StorePostAuthReq) {
  const headers = getMedusaHeaders(["auth"])

  return medusaClient.auth
    .authenticate(credentials, headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err))
}

export const getSession = async () => {
  const headers = getMedusaHeaders(["auth"])

  return medusaClient.auth
    .getSession(headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err))
}

// Customer actions
export async function getCustomer() {
  const headers = getMedusaHeaders(["customer"])

  return medusaClient.customers
    .retrieve(headers)
    .then(({ customer }) => customer)
    .catch((err) => null)
}

export async function createCustomer(data: StorePostCustomersReq) {
  const headers = getMedusaHeaders(["customer"])

  return medusaClient.customers
    .create(data, headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err))
}

export async function updateCustomer(data: StorePostCustomersCustomerReq) {
  const headers = getMedusaHeaders(["customer"])

  return medusaClient.customers
    .update(data, headers)
    .then(({ customer }) => customer)
    .catch((err) => medusaError(err))
}