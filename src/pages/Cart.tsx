import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react'

import { motion } from 'motion/react'

import { Link } from 'react-router-dom'

import { useCart } from '../context/CartContext'

function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
  } = useCart()

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5f5f3]">

        <section
          className="
            flex
            min-h-[calc(100vh-80px)]
            items-center
            justify-center
            px-6
            py-20
          "
        >

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
            }}
            className="
              w-full
              max-w-lg
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-[0_10px_30px_rgba(0,0,0,0.06)]
              "
            >
              <ShoppingBag
                size={30}
                strokeWidth={1.5}
                className="text-black/50"
              />
            </div>

            <p
              className="
                mt-8
                text-xs
                font-medium
                uppercase
                tracking-[0.22em]
                text-black/40
              "
            >
              Shopping Bag
            </p>

            <h1
              className="
                mt-3
                text-4xl
                font-bold
                tracking-[-0.05em]
                md:text-5xl
              "
            >
              Your cart is empty
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-sm
                text-sm
                leading-6
                text-black/45
              "
            >
              Looks like you haven't added
              anything to your cart yet.
            </p>

            <Link
              to="/"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-black
                px-7
                py-3.5
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                active:scale-95
              "
            >
              Continue Shopping

              <ArrowRight size={17} />
            </Link>

          </motion.div>

        </section>

      </main>
    )
  }

  /* =========================================================
     CART
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#f5f5f3]">

      <section
        className="
          px-6
          pb-24
          pt-6
          md:px-10
          md:pt-8
          lg:px-16
          lg:pt-10
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* =================================================
              HEADER
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
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
                text-black/45
                transition-colors
                duration-300
                hover:text-black
              "
            >

              <ArrowLeft
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />

              Continue Shopping

            </Link>

            <div
              className="
                mt-4
                flex
                flex-col
                justify-between
                gap-3
                md:flex-row
                md:items-end
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-black/40
                  "
                >
                  Shopping Bag
                </p>

                <h1
                  className="
                    mt-3
                    text-4xl
                    font-bold
                    tracking-[-0.05em]
                    md:text-5xl
                  "
                >
                  Your Cart
                </h1>

              </div>

              <p
                className="
                  text-sm
                  text-black/40
                "
              >
                {totalItems}{' '}
                {totalItems === 1
                  ? 'item'
                  : 'items'}
              </p>

            </div>

          </motion.div>

          {/* =================================================
              CART CONTENT
          ================================================== */}

          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-8
              lg:grid-cols-[1fr_380px]
              lg:items-start
            "
          >

            {/* =================================================
                ITEMS
            ================================================== */}

            <div className="space-y-4">

              {items.map(
                (item, index) => (

                  <motion.div
                    key={item.product.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay:
                        index * 0.07,
                    }}
                    className="
                      overflow-hidden
                      rounded-[28px]
                      bg-white
                      p-4
                      shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                      sm:p-5
                    "
                  >

                    <div
                      className="
                        flex
                        gap-4
                        sm:gap-6
                      "
                    >

                      {/* IMAGE */}

                      <Link
                        to={`/product/${item.product.id}`}
                        className="
                          h-28
                          w-28
                          shrink-0
                          overflow-hidden
                          rounded-2xl
                          bg-[#f5f5f3]
                          sm:h-36
                          sm:w-36
                        "
                      >

                        <img
                          src={
                            item.product.images[0]
                          }
                          alt={
                            item.product.name
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            hover:scale-105
                          "
                        />

                      </Link>

                      {/* INFO */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-1
                          flex-col
                        "
                      >

                        <p
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-violet-600
                          "
                        >
                          {item.product.category}
                        </p>

                        <Link
                          to={`/product/${item.product.id}`}
                          className="
                            mt-2
                            line-clamp-2
                            text-lg
                            font-bold
                            leading-tight
                            tracking-[-0.03em]
                            transition-opacity
                            hover:opacity-60
                            sm:text-xl
                          "
                        >
                          {item.product.name}
                        </Link>

                        <p
                          className="
                            mt-2
                            hidden
                            text-sm
                            leading-5
                            text-black/40
                            sm:block
                          "
                        >
                          {item.product.shortDescription}
                        </p>

                        {/* BOTTOM ROW */}

                        <div
                          className="
                            mt-auto
                            flex
                            items-end
                            justify-between
                            gap-3
                            pt-5
                          "
                        >

                          {/* Quantity */}

                          <div
                            className="
                              flex
                              h-9
                              items-center
                              rounded-full
                              border
                              border-black/10
                              bg-[#f8f8f6]
                            "
                          >

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.max(
                                    1,
                                    item.quantity -
                                      1
                                  )
                                )
                              }
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                transition-colors
                                hover:bg-black/5
                              "
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>

                            <span
                              className="
                                w-7
                                text-center
                                text-xs
                                font-semibold
                              "
                            >
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity +
                                    1
                                )
                              }
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                transition-colors
                                hover:bg-black/5
                              "
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                          {/* Remove */}

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(
                                item.product.id
                              )
                            }
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              font-medium
                              text-black/35
                              transition-colors
                              hover:text-red-500
                            "
                          >
                            <Trash2
                              size={14}
                            />

                            Remove
                          </button>

                        </div>

                      </div>

                      {/* PRICE */}

                      <div
                        className="
                          hidden
                          shrink-0
                          text-right
                          sm:block
                        "
                      >

                        <p
                          className="
                            text-lg
                            font-bold
                            tracking-[-0.02em]
                          "
                        >
                          {item.product.currency}
                          {(
                            item.product.price *
                            item.quantity
                          ).toLocaleString(
                            'en-IN'
                          )}
                        </p>

                        {item.quantity > 1 && (
                          <p
                            className="
                              mt-1
                              text-xs
                              text-black/35
                            "
                          >
                            {item.product.currency}
                            {item.product.price.toLocaleString(
                              'en-IN'
                            )}{' '}
                            each
                          </p>
                        )}

                      </div>

                    </div>

                    {/* MOBILE PRICE */}

                    <div
                      className="
                        mt-4
                        border-t
                        border-black/5
                        pt-4
                        sm:hidden
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            text-xs
                            text-black/40
                          "
                        >
                          Item total
                        </span>

                        <span
                          className="
                            text-base
                            font-bold
                          "
                        >
                          {item.product.currency}
                          {(
                            item.product.price *
                            item.quantity
                          ).toLocaleString(
                            'en-IN'
                          )}
                        </span>

                      </div>

                    </div>

                  </motion.div>

                )
              )}

            </div>

            {/* =================================================
                ORDER SUMMARY
            ================================================== */}

            <motion.aside
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
                rounded-[28px]
                bg-white
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                lg:sticky
                lg:top-28
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
                Summary
              </p>

              <h2
                className="
                  mt-2
                  text-xl
                  font-bold
                  tracking-[-0.03em]
                "
              >
                Order Summary
              </h2>

              {/* Subtotal */}

              <div
                className="
                  mt-7
                  space-y-4
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                  "
                >

                  <span className="text-black/45">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₹
                    {totalPrice.toLocaleString(
                      'en-IN'
                    )}
                  </span>

                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                  "
                >

                  <span className="text-black/45">
                    Shipping
                  </span>

                  <span className="font-medium">
                    Free
                  </span>

                </div>

                <div
                  className="
                    border-t
                    border-black/5
                    pt-4
                  "
                >

                  <div
                    className="
                      flex
                      items-end
                      justify-between
                    "
                  >

                    <span className="text-sm font-medium">
                      Total
                    </span>

                    <span
                      className="
                        text-2xl
                        font-bold
                        tracking-[-0.04em]
                      "
                    >
                      ₹
                      {totalPrice.toLocaleString(
                        'en-IN'
                      )}
                    </span>

                  </div>

                </div>

              </div>

              {/* Checkout */}

              <Link
                to="/checkout"
                className="
                  mt-7
                  flex
                  h-14
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-black
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                  active:scale-95
                "
              >
                Proceed to Checkout

                <ArrowRight size={17} />
              </Link>

              <p
                className="
                  mt-4
                  text-center
                  text-[11px]
                  leading-5
                  text-black/30
                "
              >
                Secure checkout · Free shipping
              </p>

            </motion.aside>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Cart