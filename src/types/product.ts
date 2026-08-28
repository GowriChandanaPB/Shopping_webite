export interface Product {
  id: number
  name: string
  category: string
  price: number
  currency: string
  rating: number
  reviews: number
  images: string[]
  shortDescription: string
  description: string
  specifications: Record<string, string | undefined>
}