import { Eye, Heart, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  index: number
}

function ProductCard({
  product,
  index,
}: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block h-full"
    >
      <motion.article
        initial={{
          opacity: 0,
          scale: 0.94,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.12,
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          group
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-[0_10px_35px_rgba(0,0,0,0.07)]
          transition-shadow
          duration-500
          hover:shadow-[0_18px_50px_rgba(0,0,0,0.11)]
        "
      >

        {/* =====================================================
            IMAGE
        ====================================================== */}

        <div
          className="
            relative
            aspect-square
            w-full
            shrink-0
            overflow-hidden
            bg-[#f4f4f2]
          "
        >

          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.03]
            "
          />

          {/* =================================================
              WISHLIST
          ================================================== */}

          <button
            type="button"
            aria-label={`Add ${product.name} to wishlist`}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-[0_5px_18px_rgba(0,0,0,0.08)]
              transition-transform
              duration-300
              hover:scale-105
              active:scale-95
            "
          >
            <Heart
              size={20}
              strokeWidth={1.8}
            />
          </button>

          {/* =================================================
              VIEW PRODUCT
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-4
              left-4
              z-20
              translate-y-3
              opacity-0
              transition-all
              duration-300
              ease-out
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >

            <div
              className="
                flex
                h-[44px]
                w-fit
                min-w-[170px]
                items-center
                rounded-full
                border
                border-white/20
                bg-[#180b24]/75
                px-4
                text-white
                shadow-[0_6px_20px_rgba(0,0,0,0.18)]
                backdrop-blur-sm
              "
            >

              {/* Eye */}

              <Eye
                size={19}
                strokeWidth={1.8}
                className="shrink-0"
              />

              {/* Text */}

              <span
                className="
                  ml-2.5
                  whitespace-nowrap
                  text-[14px]
                  font-semibold
                  leading-none
                "
              >
                View Product
              </span>

              {/* Arrow */}

              <span
                className="
                  ml-4
                  shrink-0
                  text-[22px]
                  font-light
                  leading-none
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>

            </div>

          </div>

        </div>

        {/* =====================================================
            PRODUCT INFORMATION
        ====================================================== */}

        <div
          className="
            flex
            min-h-[245px]
            flex-1
            flex-col
            px-6
            pb-7
            pt-6
            sm:min-h-[250px]
            sm:px-7
            sm:pb-8
            sm:pt-7
          "
        >

          {/* Category */}

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-violet-600
            "
          >
            {product.category}
          </p>

          {/* Product Name */}

          <h3
            className="
              mt-3
              min-h-[48px]
              text-[20px]
              font-bold
              leading-[1.1]
              tracking-[-0.035em]
              text-[#11121a]
              sm:text-[21px]
            "
          >
            {product.name}
          </h3>

          {/* Rating */}

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
            "
          >

            <Star
              size={18}
              fill="currentColor"
              strokeWidth={1.5}
              className="text-violet-600"
            />

            <span
              className="
                text-[15px]
                font-semibold
                text-[#11121a]
              "
            >
              {product.rating}
            </span>

            <span
              className="
                text-[14px]
                font-medium
                text-black/30
              "
            >
              ({product.reviews})
            </span>

          </div>

          {/* Price */}

          <p
            className="
              mt-auto
              pt-5
              text-[20px]
              font-bold
              tracking-[-0.025em]
              text-[#11121a]
            "
          >
            {product.currency}
            {product.price.toLocaleString('en-IN')}
          </p>

        </div>

      </motion.article>
    </Link>
  )
}

export default ProductCard