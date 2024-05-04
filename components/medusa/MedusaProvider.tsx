import { createCustomer, getCustomer, getSession, getToken, signOut } from "@/lib/auth";
import { addToCart } from "@/lib/cart";
import { COUNTRY_CODE } from "@/lib/constants";
import { useCart } from "@/lib/hooks/cart/use-cart";
import { DataProvider, GlobalActionDict, GlobalActionsProvider, GlobalContextMeta } from "@plasmicapp/react-web/lib/host";
import React from "react";
import useSWR from "swr";

interface CommerceProviderProps {
  children?: React.ReactNode;
  storeDomain: string;
  accessToken: string;
}

const globalContextName = "medusa-provider";

interface CartActions extends GlobalActionDict {
  addItem: (variantId: string, quantity: number) => void;
  // updateItem: (lineItemId: string, quantity: number) => void;
  // removeItem: (lineItemId: string) => void;
  signIn: (data: { email: string, password: string }) => void;
  signUp: (data: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  }) => void;
  signOut: () => void;
}

export function MedusaProvider(props: CommerceProviderProps) {
  const { children } = props;
  const { mutate } = useCart();

  const { data: customer, mutate: mutateCustomer } = useSWR("customer", getSession);

  const actions: CartActions = React.useMemo(
    () => ({
      async addItem(variantId, quantity) {
        const cart = await addToCart({ variantId, quantity, countryCode: COUNTRY_CODE });
        mutate(cart);
      },
      // updateItem(lineItemId, quantity) {
      //   updateItem({ id: lineItemId, quantity });
      // },
      // removeItem(lineItemId) {
      //   removeItem({ id: lineItemId });
      // },
      async signIn({email, password}) {
        await getToken({email, password});
        mutateCustomer();
      },
      async signUp({ email, password, firstName, lastName }) {
        await createCustomer({email, password, first_name: firstName, last_name: lastName });
        await getToken({ email, password });
        mutateCustomer();
      },
      async signOut() {
        await signOut();
        mutateCustomer();
      }
    }),
    [mutate]
  );
  
  return (
    <GlobalActionsProvider
      contextName={globalContextName}
      actions={actions}
    >
      <DataProvider name="customer" data={customer}>
        {children}
      </DataProvider>
    </GlobalActionsProvider>
  );
}

export const medusaProviderMeta: GlobalContextMeta<CommerceProviderProps> = {
  name: globalContextName,
  displayName: "Medusa Provider",
  props: {},
  globalActions: {
    addItem: {
      displayName: "Add item to cart",
      parameters: [
        {
          name: "variantId",
          displayName: "Variant Id",
          type: "string",
        },
        {
          name: "quantity",
          displayName: "Quantity",
          type: "number",
        },
      ]
    },
    signIn: {
      displayName: "Sign In",
      parameters: [
        {
          name: "data",
          type: "object"
        },
      ]
    },
    signUp: {
      displayName: "Sign Up",
      parameters: [
        {
          name: "data",
          type: "object"
        },
      ]
    },
    signOut: {
      displayName: "Sign Out",
      parameters: []
    }
  },
  providesData: true,
  importPath: "./components/medusa/MedusaProvider",
  importName: "MedusaProvider"
};