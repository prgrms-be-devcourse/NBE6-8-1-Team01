'use client'

import React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"

export const HeroParallax = ({
  products,
}: {
  products: Product[]
}) => {
  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 0]),
    springConfig
  )

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.productId}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.productId}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.productId}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-6xl md:text-9xl font-bold heading-logo">
        <span className="text-gradient-gold">GRIDS & CIRCLES</span>
      </h1>
      <p className="max-w-2xl text-xl md:text-2xl mt-8 text-muted-foreground">
        프리미엄 스페셜티 커피의 진정한 맛을 경험하세요.
        전 세계 최고급 농장에서 엄선한 원두를 만나보세요.
      </p>
    </div>
  )
}

export const ProductCard = ({
  product,
  translate,
}: {
  product: Product
  translate: any
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.productId}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={`/products/${product.productId}`}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.productImage || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80"}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 rounded-2xl"
          alt={product.productName}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black rounded-2xl pointer-events-none transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 transition-opacity">
        <h2 className="text-white text-xl font-bold">{product.productName}</h2>
        <p className="text-white/80">₩{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  )
}