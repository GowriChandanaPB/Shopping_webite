import {
  Search,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react'

import { useState } from 'react'

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useCart } from '../context/CartContext'

interface NavbarProps {
  searchQuery: string
  onSearch: (query: string) => void
}

function Navbar({
  searchQuery,
  onSearch,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] =
    useState(false)

  const [searchOpen, setSearchOpen] =
    useState(false)

  const { totalItems } = useCart()

  const navigate = useNavigate()
  const location = useLocation()

  /* =========================================================
     SECTION NAVIGATION
  ========================================================= */

  const handleSectionClick = (
    sectionId: string
  ) => {
    setMenuOpen(false)
    setSearchOpen(false)

    /*
     * If already on homepage,
     * scroll directly to the section.
     */
    if (location.pathname === '/') {
      const section =
        document.getElementById(sectionId)

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      return
    }

    /*
     * If on another page,
     * go back to homepage first.
     */
    navigate(`/#${sectionId}`)

    /*
     * Give React Router time to render
     * the homepage before scrolling.
     */
    setTimeout(() => {
      const section =
        document.getElementById(sectionId)

      section?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 300)
  }

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearchChange = (
    query: string
  ) => {
    onSearch(query)

    /*
     * Search results are handled by Home /
     * ProductGrid.
     */
  }

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-black/5
        bg-[#f5f5f3]/95
        backdrop-blur-md
      "
    >

      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
          lg:px-10
        "
      >

        {/* =====================================================
            LOGO
        ====================================================== */}

        <Link
          to="/"
          onClick={() => {
            setMenuOpen(false)
            setSearchOpen(false)
          }}
          className="
            text-2xl
            font-bold
            tracking-[-0.05em]
          "
        >
          NEXA
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-10
            md:flex
          "
        >

          {/* SHOP */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick('shop')
            }
            className="
              text-sm
              font-medium
              text-black/70
              transition-colors
              duration-300
              hover:text-black
            "
          >
            Shop
          </button>

          {/* CATEGORIES */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick(
                'categories'
              )
            }
            className="
              text-sm
              font-medium
              text-black/70
              transition-colors
              duration-300
              hover:text-black
            "
          >
            Categories
          </button>

          {/* ABOUT */}

          <button
            type="button"
            onClick={() =>
              handleSectionClick('about')
            }
            className="
              text-sm
              font-medium
              text-black/70
              transition-colors
              duration-300
              hover:text-black
            "
          >
            About
          </button>

        </nav>

        {/* =====================================================
            DESKTOP ACTIONS
        ====================================================== */}

        <div
          className="
            hidden
            items-center
            gap-3
            md:flex
          "
        >

          {/* SEARCH */}

          {searchOpen ? (

            <div
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-full
                border
                border-black/10
                bg-white
                px-4
              "
            >

              <Search
                size={17}
                className="
                  shrink-0
                  text-black/40
                "
              />

              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                placeholder="Search..."
                className="
                  w-48
                  bg-transparent
                  text-sm
                  outline-none
                "
              />

              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false)
                  onSearch('')
                }}
                className="
                  text-black/40
                  transition-colors
                  hover:text-black
                "
                aria-label="Close search"
              >
                <X size={17} />
              </button>

            </div>

          ) : (

            <button
              type="button"
              onClick={() =>
                setSearchOpen(true)
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition-colors
                hover:bg-black/5
              "
              aria-label="Search"
            >
              <Search
                size={19}
                strokeWidth={1.8}
              />
            </button>

          )}

          {/* CART */}

          <Link
            to="/cart"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              transition-colors
              hover:bg-black/5
            "
            aria-label="Shopping cart"
          >

            <ShoppingBag
              size={19}
              strokeWidth={1.8}
            />

            <span
              className="
                absolute
                right-1
                top-1
                flex
                h-4
                min-w-4
                items-center
                justify-center
                rounded-full
                bg-[#a94b3a]
                px-1
                text-[9px]
                font-semibold
                text-white
              "
            >
              {totalItems}
            </span>

          </Link>

        </div>

        {/* =====================================================
            MOBILE ACTIONS
        ====================================================== */}

        <div
          className="
            flex
            items-center
            gap-1
            md:hidden
          "
        >

          {/* MOBILE SEARCH */}

          <button
            type="button"
            onClick={() =>
              setSearchOpen(true)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
            "
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* MOBILE CART */}

          <Link
            to="/cart"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
            "
            aria-label="Shopping cart"
          >

            <ShoppingBag size={20} />

            <span
              className="
                absolute
                right-0
                top-0
                flex
                h-4
                min-w-4
                items-center
                justify-center
                rounded-full
                bg-[#a94b3a]
                px-1
                text-[9px]
                font-semibold
                text-white
              "
            >
              {totalItems}
            </span>

          </Link>

          {/* MENU */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
            "
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>

      </div>

      {/* =====================================================
          MOBILE SEARCH
      ====================================================== */}

      {searchOpen && (
        <div
          className="
            border-t
            border-black/5
            px-6
            py-4
            md:hidden
          "
        >

          <div
            className="
              flex
              h-12
              items-center
              gap-3
              rounded-2xl
              border
              border-black/10
              bg-white
              px-4
            "
          >

            <Search
              size={18}
              className="text-black/40"
            />

            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value
                )
              }
              placeholder="Search products..."
              className="
                min-w-0
                flex-1
                bg-transparent
                text-sm
                outline-none
              "
            />

            <button
              type="button"
              onClick={() => {
                setSearchOpen(false)
                onSearch('')
              }}
              aria-label="Close search"
            >
              <X size={18} />
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {menuOpen && !searchOpen && (
        <div
          className="
            border-t
            border-black/5
            md:hidden
          "
        >

          <nav
            className="
              flex
              flex-col
              px-6
              py-6
            "
          >

            {/* SHOP */}

            <button
              type="button"
              onClick={() =>
                handleSectionClick('shop')
              }
              className="
                border-b
                border-black/5
                py-4
                text-left
                text-lg
              "
            >
              Shop
            </button>

            {/* CATEGORIES */}

            <button
              type="button"
              onClick={() =>
                handleSectionClick(
                  'categories'
                )
              }
              className="
                border-b
                border-black/5
                py-4
                text-left
                text-lg
              "
            >
              Categories
            </button>

            {/* ABOUT */}

            <button
              type="button"
              onClick={() =>
                handleSectionClick('about')
              }
              className="
                border-b
                border-black/5
                py-4
                text-left
                text-lg
              "
            >
              About
            </button>

            {/* CART */}

            <Link
              to="/cart"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                flex
                items-center
                justify-between
                py-4
                text-lg
              "
            >

              <span>
                Shopping Cart
              </span>

              <span
                className="
                  flex
                  h-7
                  min-w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-[#a94b3a]
                  px-2
                  text-xs
                  font-semibold
                  text-white
                "
              >
                {totalItems}
              </span>

            </Link>

          </nav>

        </div>
      )}

    </header>
  )
}

export default Navbar