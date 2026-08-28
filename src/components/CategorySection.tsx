import { motion } from 'motion/react'

interface CategorySectionProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categories = [
  {
    name: 'Laptops',
    value: 'Laptops',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Phones',
    value: 'Smartphones',
    image:
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Audio',
    value: 'Headphones',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Watch',
    value: 'Wearables',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Tablets',
    value: 'Tablets',
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Accessories',
    value: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Monitors',
    value: 'Monitors',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'E-readers',
    value: 'E-readers',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
  },
]

function CategorySection({
  selectedCategory,
  onSelectCategory,
}: CategorySectionProps) {
  return (
    <section
      id="categories"
      className="
        scroll-mt-24
        px-6
        py-12
        md:px-8
        lg:px-10
        lg:py-16
      "
    >
      <div className="mx-auto max-w-[1600px]">

        {/* =====================================================
            SECTION HEADING
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
            duration: 0.5,
          }}
          className="
            mb-8
            flex
            items-end
            justify-between
          "
        >
          <div>

            <p
              className="
                mb-2
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                text-black/40
              "
            >
              Explore
            </p>

            <h2
              className="
                text-4xl
                font-semibold
                tracking-[-0.05em]
                md:text-5xl
              "
            >
              Categories
            </h2>

          </div>

          <p
            className="
              hidden
              max-w-md
              text-right
              text-sm
              leading-6
              text-black/45
              md:block
            "
          >
            Explore technology designed around
            the way you live and work.
          </p>

        </motion.div>

        {/* =====================================================
            CATEGORY GRID

            MOBILE  → 2 columns
            TABLET  → 3 columns
            MEDIUM  → 4 columns
            DESKTOP → 8 columns
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-8
            pb-2
          "
        >

          {categories.map(
            (category, index) => {
              const isSelected =
                selectedCategory ===
                category.value

              return (
                <motion.button
                  key={category.value}
                  type="button"
                  onClick={() =>
                    onSelectCategory(
                      category.value
                    )
                  }
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`
                    group
                    relative
                    aspect-square
                    min-w-0
                    overflow-hidden
                    rounded-[22px]
                    bg-white
                    text-left
                    shadow-[0_6px_25px_rgba(0,0,0,0.05)]
                    transition-shadow
                    duration-300
                    hover:shadow-[0_12px_35px_rgba(0,0,0,0.09)]
                    ${
                      isSelected
                        ? 'ring-2 ring-black ring-offset-2'
                        : ''
                    }
                  `}
                >

                  {/* =================================================
                      PRODUCT IMAGE
                  ================================================== */}

                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.05]
                    "
                  />

                  {/* =================================================
                      IMAGE OVERLAY
                  ================================================== */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-b
                      from-white/10
                      via-transparent
                      to-black/35
                    "
                  />

                  {/* =================================================
                      CATEGORY NAME
                  ================================================== */}

                  <div
                    className="
                      absolute
                      left-3
                      top-3
                      z-10
                      max-w-[calc(100%-24px)]
                      rounded-full
                      bg-white/85
                      px-2.5
                      py-1
                      backdrop-blur-sm
                      shadow-sm
                    "
                  >
                    <span
                      className="
                        block
                        truncate
                        text-xs
                        font-semibold
                        tracking-[-0.02em]
                        text-black
                        sm:text-sm
                      "
                    >
                      {category.name}
                    </span>
                  </div>

                  {/* =================================================
                      CATEGORY NUMBER
                  ================================================== */}

                  <span
                    className="
                      absolute
                      bottom-3
                      left-3
                      z-10
                      text-[10px]
                      font-medium
                      text-white
                      drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]
                    "
                  >
                    {String(index + 1).padStart(
                      2,
                      '0'
                    )}
                  </span>

                  {/* =================================================
                      ARROW
                  ================================================== */}

                  <span
                    className="
                      absolute
                      bottom-3
                      right-3
                      z-10
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      text-base
                      font-light
                      text-white
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    ↗
                  </span>

                </motion.button>
              )
            }
          )}

        </div>

      </div>
    </section>
  )
}

export default CategorySection