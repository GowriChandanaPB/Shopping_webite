import { useEffect, useState } from 'react'

import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Zap,
} from 'lucide-react'

import {
  motion,
  AnimatePresence,
} from 'motion/react'

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import products from '../data/products.json'
import type { Product } from '../types/product'
import { useCart } from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()

  const navigate = useNavigate()

  const { addToCart } = useCart()

  const [quantity, setQuantity] =
    useState(1)

  const [activeImage, setActiveImage] =
    useState(0)

  const [showCartMessage, setShowCartMessage] =
    useState(false)

  /* =========================================================
     ALWAYS START PRODUCT PAGE FROM TOP
  ========================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [id])

  const typedProducts =
    products as unknown as Product[]

  /* =========================================================
     FIND PRODUCT
  ========================================================= */

  const product = typedProducts.find(
    (item) => item.id === Number(id)
  )

  /* =========================================================
     PRODUCT NOT FOUND
  ========================================================= */

  if (!product) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#f5f5f3]
          px-6
        "
      >
        <div className="text-center">

          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
            "
          >
            Product not found
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-black/45
            "
          >
            The product you are looking for
            does not exist.
          </p>

          <Link
            to="/"
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-black
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition-transform
              duration-300
              hover:scale-105
              active:scale-95
            "
          >
            <ArrowLeft size={17} />

            Back to Products
          </Link>

        </div>
      </main>
    )
  }

  /* =========================================================
     IMAGES
  ========================================================= */

  const images =
    product.images?.length > 0
      ? product.images
      : ['']

  const currentImage =
    images[activeImage]

  /* =========================================================
     NEXT IMAGE
  ========================================================= */

  const handleNextImage = () => {
    setActiveImage(
      (current) =>
        (current + 1) % images.length
    )
  }

  /* =========================================================
     PREVIOUS IMAGE
  ========================================================= */

  const handlePreviousImage = () => {
    setActiveImage(
      (current) =>
        (current - 1 + images.length) %
        images.length
    )
  }

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = () => {
    addToCart(product, quantity)

    setShowCartMessage(true)

    setTimeout(() => {
      setShowCartMessage(false)
    }, 3000)
  }

  /* =========================================================
     BUY NOW
  ========================================================= */

  const handleBuyNow = () => {
    addToCart(product, quantity)

    navigate('/checkout')
  }

  /* =========================================================
     QUANTITY
  ========================================================= */

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    )
  }

  const increaseQuantity = () => {
    setQuantity((current) =>
      current + 1
    )
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#f5f5f3]
      "
    >

      {/* =====================================================
          PRODUCT SECTION
      ====================================================== */}

      <section
        className="
          px-6
          pb-20
          pt-6
          md:px-10
          md:pb-24
          md:pt-8
          lg:px-16
          lg:pb-28
          lg:pt-10
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* =================================================
              BACK
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
            }}
          >

            <Link
              to="/"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-black/50
                transition-colors
                duration-300
                hover:text-black
              "
            >

              <ArrowLeft
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />

              Back to Products

            </Link>

          </motion.div>

          {/* =================================================
              MAIN PRODUCT AREA
          ================================================== */}

          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-10
              lg:grid-cols-[1.05fr_0.95fr]
              lg:gap-16
            "
          >

            {/* =================================================
                IMAGE GALLERY
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              {/* Main Image */}

              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  bg-white
                  shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                "
              >

                <div
                  className="
                    aspect-square
                    overflow-hidden
                  "
                >

                  <AnimatePresence
                    mode="wait"
                  >

                    <motion.img
                      key={currentImage}
                      src={currentImage}
                      alt={product.name}
                      initial={{
                        opacity: 0,
                        scale: 1.02,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                  </AnimatePresence>

                </div>

                {/* Previous */}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={
                      handlePreviousImage
                    }
                    aria-label="Previous image"
                    className="
                      absolute
                      left-4
                      top-1/2
                      flex
                      h-11
                      w-11
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-black
                      opacity-0
                      shadow-lg
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:scale-105
                      group-hover:opacity-100
                      max-md:opacity-100
                    "
                  >
                    <ChevronLeft
                      size={20}
                    />
                  </button>
                )}

                {/* Next */}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={
                      handleNextImage
                    }
                    aria-label="Next image"
                    className="
                      absolute
                      right-4
                      top-1/2
                      flex
                      h-11
                      w-11
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-black
                      opacity-0
                      shadow-lg
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:scale-105
                      group-hover:opacity-100
                      max-md:opacity-100
                    "
                  >
                    <ChevronRight
                      size={20}
                    />
                  </button>
                )}

                {/* Image Counter */}

                {images.length > 1 && (
                  <div
                    className="
                      absolute
                      bottom-4
                      right-4
                      rounded-full
                      bg-black/70
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-white
                      backdrop-blur-md
                    "
                  >
                    {activeImage + 1} /{' '}
                    {images.length}
                  </div>
                )}

              </div>

              {/* =================================================
                  THUMBNAILS
              ================================================== */}

              {images.length > 1 && (
                <div
                  className="
                    mt-4
                    grid
                    grid-cols-4
                    gap-3
                    sm:grid-cols-5
                  "
                >

                  {images.map(
                    (image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() =>
                          setActiveImage(
                            index
                          )
                        }
                        className={`
                          aspect-square
                          overflow-hidden
                          rounded-2xl
                          bg-white
                          transition-all
                          duration-300
                          ${
                            activeImage === index
                              ? 'ring-2 ring-black ring-offset-2'
                              : 'opacity-60 hover:opacity-100'
                          }
                        `}
                        aria-label={`View image ${
                          index + 1
                        }`}
                      >

                        <img
                          src={image}
                          alt={`${product.name} ${
                            index + 1
                          }`}
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />

                      </button>
                    )
                  )}

                </div>
              )}

            </motion.div>

            {/* =================================================
                PRODUCT INFORMATION
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="
                flex
                flex-col
                justify-center
              "
            >

              {/* Category */}

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-violet-600
                "
              >
                {product.category}
              </p>

              {/* Name */}

              <h1
                className="
                  mt-5
                  text-4xl
                  font-bold
                  leading-[1.05]
                  tracking-[-0.05em]
                  text-[#11121a]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {product.name}
              </h1>

              {/* Rating */}

              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                  "
                >

                  <Star
                    size={21}
                    fill="currentColor"
                    strokeWidth={1.5}
                    className="text-violet-600"
                  />

                  <span
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    {product.rating}
                  </span>

                </div>

                <span
                  className="
                    text-lg
                    text-black/35
                  "
                >
                  ({product.reviews} reviews)
                </span>

              </div>

              {/* Price */}

              <p
                className="
                  mt-8
                  text-3xl
                  font-bold
                  tracking-[-0.03em]
                  text-[#11121a]
                "
              >
                {product.currency}
                {product.price.toLocaleString(
                  'en-IN'
                )}
              </p>

              {/* Description */}

              <p
                className="
                  mt-7
                  max-w-xl
                  text-base
                  leading-7
                  text-black/55
                "
              >
                {product.description}
              </p>

              {/* =================================================
                  QUANTITY
              ================================================== */}

              <div className="mt-10">

                <p
                  className="
                    mb-3
                    text-sm
                    font-medium
                  "
                >
                  Quantity
                </p>

                <div
                  className="
                    flex
                    h-12
                    w-fit
                    items-center
                    rounded-full
                    border
                    border-black/10
                    bg-white
                  "
                >

                  <button
                    type="button"
                    onClick={
                      decreaseQuantity
                    }
                    aria-label="Decrease quantity"
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      transition-colors
                      hover:bg-black/5
                      active:scale-90
                    "
                  >
                    <Minus size={17} />
                  </button>

                  <span
                    className="
                      w-8
                      text-center
                      text-sm
                      font-semibold
                    "
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={
                      increaseQuantity
                    }
                    aria-label="Increase quantity"
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      transition-colors
                      hover:bg-black/5
                      active:scale-90
                    "
                  >
                    <Plus size={17} />
                  </button>

                </div>

              </div>

              {/* =================================================
                  ACTION BUTTONS
              ================================================== */}

              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                "
              >

                {/* Add to Cart */}

                <motion.button
                  type="button"
                  onClick={
                    handleAddToCart
                  }
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    flex
                    h-14
                    flex-1
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-black
                    px-7
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-black/85
                    hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]
                  "
                >

                  <ShoppingBag
                    size={19}
                  />

                  Add to Cart

                </motion.button>

                {/* Buy Now */}

                <motion.button
                  type="button"
                  onClick={
                    handleBuyNow
                  }
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    flex
                    h-14
                    flex-1
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    border
                    border-black
                    bg-white
                    px-7
                    text-sm
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:bg-black
                    hover:text-white
                  "
                >

                  <Zap size={18} />

                  Buy Now

                </motion.button>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* =======================================================
          SPECIFICATIONS
      ======================================================== */}

      <section
        className="
          border-t
          border-black/5
          px-6
          py-20
          md:px-10
          md:py-24
          lg:px-16
        "
      >

        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.22em]
                text-black/40
              "
            >
              Product Information
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-semibold
                tracking-[-0.04em]
                md:text-4xl
              "
            >
              Specifications
            </h2>

          </motion.div>

          {/* =================================================
              SPECIFICATION GRID
          ================================================== */}

          <div
            className="
              mt-10
              grid
              grid-cols-1
              overflow-hidden
              rounded-[28px]
              border
              border-black/5
              bg-white
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {Object.entries(
              product.specifications || {}
            )
              .filter(
                ([, value]) =>
                  value !== undefined &&
                  value !== null &&
                  String(value).trim() !== ''
              )
              .map(
                ([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        index * 0.04,
                    }}
                    className="
                      border-b
                      border-black/5
                      p-6
                      sm:nth-[2n]:border-l
                      lg:nth-[3n+2]:border-l
                      lg:nth-[3n]:border-l
                    "
                  >

                    <p
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.16em]
                        text-black/35
                      "
                    >
                      {key
                        .replace(
                          /([A-Z])/g,
                          ' $1'
                        )
                        .replace(
                          /^./,
                          (char) =>
                            char.toUpperCase()
                        )}
                    </p>

                    <p
                      className="
                        mt-2
                        text-sm
                        font-semibold
                        leading-6
                        text-black/80
                      "
                    >
                      {String(value)}
                    </p>

                  </motion.div>
                )
              )}

          </div>

        </div>

      </section>

      {/* =======================================================
          ADD TO CART MESSAGE
      ======================================================== */}

      <AnimatePresence>

        {showCartMessage && (

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              bottom-6
              left-1/2
              z-[100]
              w-[calc(100%-32px)]
              max-w-sm
              -translate-x-1/2
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                bg-[#180b24]
                px-5
                py-4
                text-white
                shadow-[0_15px_40px_rgba(0,0,0,0.25)]
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#180b24]
                "
              >
                <Check
                  size={20}
                  strokeWidth={2.5}
                />
              </div>

              <div className="min-w-0">

                <p
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  Added to cart
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-white/60
                  "
                >
                  Click the shopping bag
                  to view your cart
                </p>

              </div>

              <Link
                to="/cart"
                className="
                  ml-auto
                  shrink-0
                  text-lg
                  text-white/70
                  transition-all
                  duration-300
                  hover:translate-x-1
                  hover:text-white
                "
                aria-label="Go to cart"
              >
                →
              </Link>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  )
}

export default ProductDetails