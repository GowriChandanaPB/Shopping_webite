import {
  useRef,
  useState,
} from 'react'

import {
  Route,
  Routes,
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategorySection from './components/CategorySection'
import ProductGrid from './components/ProductGrid'

import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

import {
  CartProvider,
} from './context/CartContext'

function Home() {
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState('All')

  const [
    searchQuery,
    setSearchQuery,
  ] = useState('')

  const productSectionRef =
    useRef<HTMLElement | null>(null)

  /* =========================================================
     CATEGORY SELECT
  ========================================================= */

  const handleCategorySelect = (
    category: string
  ) => {
    setSearchQuery('')

    setSelectedCategory(category)

    /*
     * Scroll to Featured Products
     * after category selection.
     */
    setTimeout(() => {
      productSectionRef.current?.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'start',
        }
      )
    }, 100)
  }

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (
    query: string
  ) => {
    setSearchQuery(query)

    /*
     * Search across all categories.
     */
    if (query.trim() !== '') {
      setSelectedCategory('All')

      /*
       * Automatically scroll to
       * Featured Products.
       */
      setTimeout(() => {
        productSectionRef.current?.scrollIntoView(
          {
            behavior: 'smooth',
            block: 'start',
          }
        )
      }, 100)
    }
  }

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />

      <main
        className="
          min-h-screen
          bg-[#f5f5f3]
        "
      >

        {/* =====================================================
            HERO
        ====================================================== */}

        <Hero />

        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <CategorySection
          selectedCategory={
            selectedCategory
          }
          onSelectCategory={
            handleCategorySelect
          }
        />

        {/* =====================================================
            FEATURED PRODUCTS
        ====================================================== */}

        <ProductGrid
          selectedCategory={
            selectedCategory
          }
          searchQuery={searchQuery}
          onSelectCategory={(
            category
          ) => {
            setSearchQuery('')
            setSelectedCategory(
              category
            )
          }}
          sectionRef={
            productSectionRef
          }
        />

        {/* =====================================================
            ABOUT
        ====================================================== */}

        <section
          id="about"
          className="
            scroll-mt-24
            border-t
            border-black/5
            px-6
            py-24
            md:px-10
            lg:px-16
            lg:py-32
          "
        >

          <div
            className="
              mx-auto
              max-w-7xl
            "
          >

            <div
              className="
                max-w-3xl
              "
            >

              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-black/40
                "
              >
                About NEXA
              </p>

              <h2
                className="
                  mt-4
                  text-4xl
                  font-bold
                  tracking-[-0.05em]
                  md:text-5xl
                "
              >
                Technology designed
                for everyday life.
              </h2>

              <p
                className="
                  mt-6
                  max-w-2xl
                  text-base
                  leading-7
                  text-black/45
                "
              >
                NEXA brings together
                thoughtfully selected
                technology, modern design,
                and products built around
                the way you live and work.
              </p>

            </div>

          </div>

        </section>

      </main>
    </>
  )
}

/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <CartProvider>

      <Routes>

        {/* ===================================================
            HOME
        ==================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ===================================================
            PRODUCT DETAILS
        ==================================================== */}

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* ===================================================
            CART
        ==================================================== */}

        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* ===================================================
            CHECKOUT
        ==================================================== */}

        <Route
          path="/checkout"
          element={<Checkout />}
        />

      </Routes>

    </CartProvider>
  )
}

export default App