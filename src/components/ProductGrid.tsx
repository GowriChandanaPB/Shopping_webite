import type { RefObject } from 'react'
import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'

import products from '../data/products.json'
import type { Product } from '../types/product'
import ProductCard from './ProductCard'

interface ProductGridProps {
  selectedCategory: string
  searchQuery: string
  onSelectCategory: (category: string) => void
  sectionRef: RefObject<HTMLElement | null>
}

type SortOption =
  | 'recommended'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'name'

function ProductGrid({
  selectedCategory,
  searchQuery,
  onSelectCategory,
  sectionRef,
}: ProductGridProps) {
  const [sortOption, setSortOption] =
    useState<SortOption>('recommended')

  const [sortOpen, setSortOpen] =
    useState(false)

  const typedProducts =
    products as unknown as Product[]

  /* =========================================================
     FILTER + SORT PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    const searchText =
      searchQuery.trim().toLowerCase()

    const filtered = typedProducts.filter(
      (product) => {
        const matchesCategory =
          selectedCategory === 'All' ||
          product.category === selectedCategory

        const matchesSearch =
          searchText === '' ||
          product.name
            .toLowerCase()
            .includes(searchText) ||
          product.category
            .toLowerCase()
            .includes(searchText) ||
          product.shortDescription
            .toLowerCase()
            .includes(searchText)

        return (
          matchesCategory &&
          matchesSearch
        )
      }
    )

    /* =======================================================
       SORT
    ======================================================== */

    const sorted = [...filtered]

    switch (sortOption) {
      case 'price-low':
        sorted.sort(
          (a, b) => a.price - b.price
        )
        break

      case 'price-high':
        sorted.sort(
          (a, b) => b.price - a.price
        )
        break

      case 'rating':
        sorted.sort(
          (a, b) => b.rating - a.rating
        )
        break

      case 'name':
        sorted.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
        break

      case 'recommended':
      default:
        /*
         * Keep original product order.
         */
        break
    }

    return sorted
  }, [
    selectedCategory,
    searchQuery,
    sortOption,
    typedProducts,
  ])

  /* =========================================================
     SORT LABEL
  ========================================================= */

  const sortLabels: Record<
    SortOption,
    string
  > = {
    recommended: 'Recommended',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    rating: 'Highest Rated',
    name: 'Name: A → Z',
  }

  /* =========================================================
     CHANGE SORT
  ========================================================= */

  const handleSortChange = (
    option: SortOption
  ) => {
    setSortOption(option)
    setSortOpen(false)
  }

  return (
   <section
        id="shop"
        ref={sectionRef}
        className="
            scroll-mt-24
            px-6
            pb-16
            pt-8
            md:px-10
            md:pb-20
            md:pt-10
            lg:px-16
            lg:pb-24
            lg:pt-12
        "
    >
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mb-10
            flex
            flex-col
            gap-7
            md:mb-12
            md:flex-row
            md:items-end
            md:justify-between
          "
        >

          {/* ===================================================
              TITLE
          ==================================================== */}

          <div>

            <p
              className="
                mb-3
                text-xs
                font-medium
                uppercase
                tracking-[0.22em]
                text-black/40
              "
            >
              {searchQuery
                ? 'Search Results'
                : 'Selected for you'}
            </p>

            <h2
              className="
                text-4xl
                font-semibold
                tracking-[-0.05em]
                md:text-5xl
              "
            >
              {searchQuery
                ? `Results for "${searchQuery}"`
                : 'Featured Products'}
            </h2>

            <p
              className="
                mt-3
                text-sm
                text-black/40
              "
            >
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1
                ? 'product'
                : 'products'}
            </p>

            {/* View All */}

            {(selectedCategory !== 'All' ||
              searchQuery) && (
              <button
                type="button"
                onClick={() =>
                  onSelectCategory('All')
                }
                className="
                  group
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-black/60
                  transition-colors
                  duration-300
                  hover:text-black
                "
              >
                View all products

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </button>
            )}

          </div>

          {/* ===================================================
              SORT
          ==================================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setSortOpen(!sortOpen)
              }
              className="
                flex
                h-11
                items-center
                gap-3
                rounded-full
                border
                border-black/10
                bg-white
                px-5
                text-sm
                font-medium
                transition-all
                duration-300
                hover:border-black/20
              "
            >

              <span className="text-black/40">
                Sort:
              </span>

              <span>
                {sortLabels[sortOption]}
              </span>

              <ChevronDown
                size={16}
                className={`
                  transition-transform
                  duration-300
                  ${
                    sortOpen
                      ? 'rotate-180'
                      : ''
                  }
                `}
              />

            </button>

            {/* =================================================
                SORT MENU
            ================================================== */}

            {sortOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -5,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                className="
                  absolute
                  right-0
                  top-14
                  z-30
                  w-56
                  overflow-hidden
                  rounded-2xl
                  border
                  border-black/5
                  bg-white
                  p-2
                  shadow-[0_15px_40px_rgba(0,0,0,0.10)]
                "
              >

                {(
                  Object.entries(
                    sortLabels
                  ) as [
                    SortOption,
                    string
                  ][]
                ).map(
                  ([value, label]) => (

                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        handleSortChange(
                          value
                        )
                      }
                      className={`
                        flex
                        w-full
                        rounded-xl
                        px-4
                        py-3
                        text-left
                        text-sm
                        transition-colors
                        duration-200
                        ${
                          sortOption === value
                            ? 'bg-black text-white'
                            : 'hover:bg-black/5'
                        }
                      `}
                    >
                      {label}
                    </button>

                  )
                )}

              </motion.div>
            )}

          </div>

        </motion.div>

        {/* =====================================================
            PRODUCT GRID
        ====================================================== */}

        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {filteredProducts.map(
              (product, index) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />

              )
            )}

          </div>

        ) : (

          /* =================================================
             NO RESULTS
          ================================================== */

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              flex
              min-h-[300px]
              items-center
              justify-center
              rounded-[28px]
              bg-white
            "
          >

            <div className="text-center">

              <p
                className="
                  text-lg
                  font-semibold
                "
              >
                No products found
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-black/40
                "
              >
                Try searching for another
                product.
              </p>

              <button
                type="button"
                onClick={() =>
                  onSelectCategory('All')
                }
                className="
                  mt-5
                  rounded-full
                  bg-black
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition-transform
                  duration-200
                  hover:scale-105
                  active:scale-95
                "
              >
                View all products
              </button>

            </div>

          </motion.div>

        )}

      </div>
    </section>
  )
}

export default ProductGrid