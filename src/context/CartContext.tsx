import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { Product } from '../types/product'

/* =========================================================
   CART ITEM
========================================================= */

export interface CartItem {
  product: Product
  quantity: number
}

/* =========================================================
   CART CONTEXT TYPE
========================================================= */

interface CartContextType {
  items: CartItem[]

  addToCart: (
    product: Product,
    quantity?: number
  ) => void

  removeFromCart: (
    productId: number
  ) => void

  updateQuantity: (
    productId: number,
    quantity: number
  ) => void

  clearCart: () => void

  totalItems: number

  totalPrice: number
}

/* =========================================================
   CREATE CONTEXT
========================================================= */

const CartContext = createContext<
  CartContextType | undefined
>(undefined)

/* =========================================================
   CART PROVIDER
========================================================= */

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(
        'nexa-cart'
      )

      if (!savedCart) {
        return []
      }

      return JSON.parse(savedCart)
    } catch {
      return []
    }
  })

  /* =======================================================
     SAVE CART TO LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      'nexa-cart',
      JSON.stringify(items)
    )
  }, [items])

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = (
    product: Product,
    quantity = 1
  ) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        )
      }

      return [
        ...currentItems,
        {
          product,
          quantity,
        },
      ]
    })
  }

  /* =======================================================
     REMOVE FROM CART
  ======================================================= */

  const removeFromCart = (
    productId: number
  ) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.product.id !== productId
      )
    )
  }

  /* =======================================================
     UPDATE QUANTITY
  ======================================================= */

  const updateQuantity = (
    productId: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    )
  }

  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setItems([])
  }

  /* =======================================================
     TOTAL ITEMS
  ======================================================= */

  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    )
  }, [items])

  /* =======================================================
     TOTAL PRICE
  ======================================================= */

  const totalPrice = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total +
        item.product.price *
          item.quantity,
      0
    )
  }, [items])

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

/* =========================================================
   USE CART HOOK
========================================================= */

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}