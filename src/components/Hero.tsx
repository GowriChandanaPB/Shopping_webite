import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-6
        py-8
        md:px-10
        md:py-10
        lg:px-16
        lg:py-12
      "
    >
      <div className="mx-auto max-w-7xl">

        <div
          className="
            grid
            items-center
            gap-8
            lg:grid-cols-2
            lg:gap-10
          "
        >

          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <p
              className="
                mb-5
                text-sm
                font-medium
                uppercase
                tracking-[0.2em]
                text-black/50
              "
            >
              The next generation
            </p>

            <h1
              className="
                text-5xl
                font-semibold
                tracking-[-0.06em]
                md:text-7xl
                lg:text-8xl
              "
            >
              Technology,
              <br />
              refined.
            </h1>

            <p
              className="
                mt-6
                max-w-lg
                text-base
                leading-7
                text-black/55
                md:text-lg
              "
            >
              Discover thoughtfully designed technology
              built for the way you live, work, and create.
            </p>

            <motion.a
              href="#shop"
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-black
                px-7
                py-4
                text-sm
                font-medium
                text-white
              "
            >
              Explore Products

              <span>↗</span>
            </motion.a>

          </motion.div>

          {/* =====================================================
              PRODUCT IMAGE
          ====================================================== */}

          <div className="relative">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="
                relative
                aspect-square
                overflow-hidden
                rounded-[2rem]
                bg-white
              "
            >

              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                alt="MacBook Air M3"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

            </motion.div>

            {/* =================================================
                CLICKABLE FEATURED PRODUCT
            ================================================== */}

            <Link
              to="/product/1"
              className="
                absolute
                -bottom-4
                -left-4
                z-20
                block
                rounded-2xl
                outline-none
                md:-left-6
              "
              aria-label="View MacBook Air M3 product details"
            >

              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                }}
                whileHover={{
                  scale: 1.04,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  cursor-pointer
                  rounded-2xl
                  bg-black
                  px-5
                  py-4
                  text-white
                  shadow-xl
                  transition-shadow
                  duration-300
                  hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]
                "
              >

                <p
                  className="
                    text-xs
                    text-white/50
                  "
                >
                  Featured
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                  "
                >
                  MacBook Air M3
                </p>

              </motion.div>

            </Link>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero