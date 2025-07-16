'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

export function AnimatedTitle({ text }: { text: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  useGSAP(() => {
    if (!titleRef.current) return
    
    // 텍스트를 글자별로 나누기
    const chars = titleRef.current.textContent?.split('') || []
    titleRef.current.innerHTML = chars
      .map((char, i) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')
    
    // 각 글자에 애니메이션
    gsap.from(".char", {
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
  }, [])
  
  return (
    <h1 
      ref={titleRef}
      className="text-4xl lg:text-6xl font-bold text-amber-900"
    >
      {text}
    </h1>
  )
}