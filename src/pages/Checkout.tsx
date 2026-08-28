import { useState } from 'react'

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  MapPin,
  ShoppingBag,
} from 'lucide-react'

import { motion } from 'motion/react'

import { Link } from 'react-router-dom'

import { useCart } from '../context/CartContext'

function Checkout() {

  const {
    items,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pin, setPin] = useState('')

  const [paymentMethod, setPaymentMethod] =
    useState('cod')

  const [submitted, setSubmitted] =
    useState(false)

  const [errors, setErrors] =
    useState<Record<string, string>>({})

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (items.length === 0 && !submitted) {
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
            className="max-w-md text-center"
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
              "
            >
              <ShoppingBag
                size={30}
                className="text-black/40"
              />
            </div>

            <h1
              className="
                mt-7
                text-3xl
                font-bold
                tracking-[-0.04em]
              "
            >
              Your cart is empty
            </h1>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-black/45
              "
            >
              Add a product before proceeding
              to checkout.
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
                font-semibold
                text-white
              "
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Link>

          </motion.div>

        </section>

      </main>
    )
  }

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const newErrors: Record<
      string,
      string
    > = {}

    if (!name.trim()) {
      newErrors.name =
        'Please enter your name.'
    }

    if (!email.trim()) {
      newErrors.email =
        'Please enter your email.'
    } else if (
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      newErrors.email =
        'Please enter a valid email.'
    }

    if (!phone.trim()) {
      newErrors.phone =
        'Please enter your phone number.'
    } else if (
      !/^[0-9]{10}$/.test(phone)
    ) {
      newErrors.phone =
        'Enter a valid 10-digit number.'
    }

    if (!address.trim()) {
      newErrors.address =
        'Please enter your address.'
    }

    if (!city.trim()) {
      newErrors.city =
        'Please enter your city.'
    }

    if (!state.trim()) {
      newErrors.state =
        'Please enter your state.'
    }

    if (!pin.trim()) {
      newErrors.pin =
        'Please enter your PIN code.'
    } else if (
      !/^[0-9]{6}$/.test(pin)
    ) {
      newErrors.pin =
        'Enter a valid 6-digit PIN.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  /* =========================================================
     PLACE ORDER
  ========================================================= */

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitted(true)

    clearCart()
  }

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (submitted) {
    return (
      <main
        className="
          min-h-screen
          bg-[#f5f5f3]
        "
      >

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
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
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

            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                type: 'spring',
                stiffness: 180,
              }}
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-black
                text-white
              "
            >
              <Check
                size={34}
                strokeWidth={2.5}
              />
            </motion.div>

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
              Order Confirmed
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
              Thank you!
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-sm
                leading-6
                text-black/45
              "
            >
              Your order has been placed
              successfully. We've received
              your order and will process it
              shortly.
            </p>

            <div
              className="
                mt-8
                rounded-2xl
                bg-white
                p-5
                text-left
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
                    text-sm
                    text-black/40
                  "
                >
                  Order Total
                </span>

                <span
                  className="
                    text-lg
                    font-bold
                  "
                >
                  ₹
                  {totalPrice.toLocaleString(
                    'en-IN'
                  )}
                </span>

              </div>

            </div>

            <Link
              to="/"
              className="
                mt-7
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
                transition-transform
                duration-300
                hover:scale-105
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
     CHECKOUT PAGE
  ========================================================= */

  return (
    <main
      className="
        min-h-screen
        bg-[#f5f5f3]
      "
    >

      <section
        className="
          px-6
          pb-24
          pt-6
          md:px-10
          md:pt-8
          lg:px-16
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
          >

            <Link
              to="/cart"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-black/45
                transition-colors
                hover:text-black
              "
            >

              <ArrowLeft
                size={17}
                className="
                  transition-transform
                  group-hover:-translate-x-1
                "
              />

              Back to Cart

            </Link>

            <div className="mt-4">

              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-black/40
                "
              >
                Secure Checkout
              </p>

              <h1
                className="
                  mt-2
                  text-4xl
                  font-bold
                  tracking-[-0.05em]
                  md:text-5xl
                "
              >
                Checkout
              </h1>

            </div>

          </motion.div>

          {/* =================================================
              CONTENT
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
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* =================================================
                  CUSTOMER INFORMATION
              ================================================== */}

              <div
                className="
                  rounded-[28px]
                  bg-white
                  p-6
                  md:p-8
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      text-white
                    "
                  >
                    <span className="text-sm font-bold">
                      1
                    </span>
                  </div>

                  <div>

                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.15em]
                        text-black/35
                      "
                    >
                      Step 01
                    </p>

                    <h2
                      className="
                        text-lg
                        font-bold
                      "
                    >
                      Contact Information
                    </h2>

                  </div>

                </div>

                <div
                  className="
                    mt-7
                    grid
                    grid-cols-1
                    gap-5
                    md:grid-cols-2
                  "
                >

                  <Field
                    label="Full Name"
                    value={name}
                    onChange={setName}
                    placeholder="Your name"
                    error={errors.name}
                  />

                  <Field
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    error={errors.email}
                  />

                  <div className="md:col-span-2">

                    <Field
                      label="Phone Number"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                      placeholder="10-digit phone number"
                      error={errors.phone}
                    />

                  </div>

                </div>

              </div>

              {/* =================================================
                  ADDRESS
              ================================================== */}

              <div
                className="
                  rounded-[28px]
                  bg-white
                  p-6
                  md:p-8
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      text-white
                    "
                  >
                    <MapPin size={17} />
                  </div>

                  <div>

                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.15em]
                        text-black/35
                      "
                    >
                      Step 02
                    </p>

                    <h2
                      className="
                        text-lg
                        font-bold
                      "
                    >
                      Shipping Address
                    </h2>

                  </div>

                </div>

                <div className="mt-7 space-y-5">

                  <Field
                    label="Address"
                    value={address}
                    onChange={setAddress}
                    placeholder="House / Flat / Street"
                    error={errors.address}
                  />

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-5
                      sm:grid-cols-2
                    "
                  >

                    <Field
                      label="City"
                      value={city}
                      onChange={setCity}
                      placeholder="Bengaluru"
                      error={errors.city}
                    />

                    <Field
                      label="State"
                      value={state}
                      onChange={setState}
                      placeholder="Karnataka"
                      error={errors.state}
                    />

                  </div>

                  <Field
                    label="PIN Code"
                    value={pin}
                    onChange={setPin}
                    placeholder="560001"
                    inputMode="numeric"
                    error={errors.pin}
                  />

                </div>

              </div>

              {/* =================================================
                  PAYMENT
              ================================================== */}

              <div
                className="
                  rounded-[28px]
                  bg-white
                  p-6
                  md:p-8
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      text-white
                    "
                  >
                    <Lock size={17} />
                  </div>

                  <div>

                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.15em]
                        text-black/35
                      "
                    >
                      Step 03
                    </p>

                    <h2
                      className="
                        text-lg
                        font-bold
                      "
                    >
                      Payment Method
                    </h2>

                  </div>

                </div>

                <div className="mt-7 space-y-3">

                  {/* COD */}

                  <label
                    className={`
                      flex
                      cursor-pointer
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      p-4
                      transition-all
                      duration-300
                      ${
                        paymentMethod ===
                        'cod'
                          ? 'border-black bg-black/[0.02]'
                          : 'border-black/10 hover:border-black/20'
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={
                        paymentMethod ===
                        'cod'
                      }
                      onChange={() =>
                        setPaymentMethod(
                          'cod'
                        )
                      }
                      className="h-4 w-4"
                    />

                    <div>

                      <p className="text-sm font-semibold">
                        Cash on Delivery
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-black/40
                        "
                      >
                        Pay when your order arrives.
                      </p>

                    </div>

                  </label>

                  {/* CARD */}

                  <label
                    className={`
                      flex
                      cursor-pointer
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      p-4
                      transition-all
                      duration-300
                      ${
                        paymentMethod ===
                        'card'
                          ? 'border-black bg-black/[0.02]'
                          : 'border-black/10 hover:border-black/20'
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={
                        paymentMethod ===
                        'card'
                      }
                      onChange={() =>
                        setPaymentMethod(
                          'card'
                        )
                      }
                      className="h-4 w-4"
                    />

                    <div>

                      <p className="text-sm font-semibold">
                        Credit / Debit Card
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-black/40
                        "
                      >
                        Demo payment option.
                      </p>

                    </div>

                  </label>

                </div>

              </div>

              {/* Mobile Submit */}

              <button
                type="submit"
                className="
                  flex
                  h-14
                  w-full
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
                  hover:scale-[1.01]
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                  active:scale-95
                  lg:hidden
                "
              >
                Place Order
                <ArrowRight size={17} />
              </button>

            </form>

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
                delay: 0.1,
              }}
              className="
                rounded-[28px]
                bg-white
                p-6
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
                Your Order
              </p>

              <h2
                className="
                  mt-2
                  text-xl
                  font-bold
                "
              >
                Order Summary
              </h2>

              {/* Products */}

              <div
                className="
                  mt-6
                  max-h-[350px]
                  space-y-4
                  overflow-y-auto
                "
              >

                {items.map((item) => (

                  <div
                    key={item.product.id}
                    className="
                      flex
                      gap-3
                    "
                  >

                    <div
                      className="
                        relative
                        h-16
                        w-16
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        bg-[#f5f5f3]
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
                        "
                      />

                      <span
                        className="
                          absolute
                          right-1
                          top-1
                          flex
                          h-5
                          min-w-5
                          items-center
                          justify-center
                          rounded-full
                          bg-black
                          px-1
                          text-[9px]
                          font-bold
                          text-white
                        "
                      >
                        {item.quantity}
                      </span>

                    </div>

                    <div className="min-w-0 flex-1">

                      <p
                        className="
                          line-clamp-2
                          text-sm
                          font-semibold
                        "
                      >
                        {item.product.name}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-black/40
                        "
                      >
                        {item.product.category}
                      </p>

                    </div>

                    <p
                      className="
                        shrink-0
                        text-sm
                        font-semibold
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

                  </div>

                ))}

              </div>

              {/* Totals */}

              <div
                className="
                  mt-6
                  space-y-3
                  border-t
                  border-black/5
                  pt-5
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                  "
                >

                  <span className="text-black/40">
                    Items
                  </span>

                  <span>
                    {totalItems}
                  </span>

                </div>

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                  "
                >

                  <span className="text-black/40">
                    Shipping
                  </span>

                  <span>
                    Free
                  </span>

                </div>

                <div
                  className="
                    flex
                    items-end
                    justify-between
                    border-t
                    border-black/5
                    pt-4
                  "
                >

                  <span className="font-medium">
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

              {/* Desktop Submit */}

              <button
                type="button"
                onClick={() => {
                  const form =
                    document.querySelector(
                      'form'
                    ) as HTMLFormElement | null

                  form?.requestSubmit()
                }}
                className="
                  mt-7
                  hidden
                  h-14
                  w-full
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
                  lg:flex
                "
              >
                Place Order
                <ArrowRight size={17} />
              </button>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[11px]
                  text-black/30
                "
              >
                <Lock size={12} />
                Secure checkout
              </div>

            </motion.aside>

          </div>

        </div>

      </section>

    </main>
  )
}

/* ===========================================================
   INPUT FIELD
=========================================================== */

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  error?: string
  type?: string
  inputMode?:
    | 'text'
    | 'numeric'
    | 'tel'
    | 'email'
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  inputMode = 'text',
}: FieldProps) {
  return (
    <div>

      <label
        className="
          mb-2
          block
          text-xs
          font-semibold
          text-black/60
        "
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        inputMode={inputMode}
        className={`
          h-12
          w-full
          rounded-xl
          border
          bg-[#fafafa]
          px-4
          text-sm
          outline-none
          transition-all
          duration-200
          placeholder:text-black/25
          focus:bg-white
          focus:ring-2
          ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
              : 'border-black/10 focus:border-black/30 focus:ring-black/5'
          }
        `}
      />

      {error && (
        <p
          className="
            mt-1.5
            text-xs
            text-red-500
          "
        >
          {error}
        </p>
      )}

    </div>
  )
}

export default Checkout