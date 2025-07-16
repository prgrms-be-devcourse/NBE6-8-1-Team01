'use client'

import { NavBar } from "@/components/NavBar"
import { Home, Coffee, ShoppingCart, User, Search } from "lucide-react"

export default function DemoPage() {
  const navItems = [
    { name: "홈", url: "/", icon: Home },
    { name: "원두", url: "/products", icon: Coffee },
    { name: "장바구니", url: "/cart", icon: ShoppingCart },
    { name: "계정", url: "/login", icon: User },
    { name: "검색", url: "#", icon: Search },
  ]

  return (
    <div className="min-h-screen bg-white">
      <NavBar items={navItems} />
      
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">NavBar 데모 페이지</h1>
          <p className="text-gray-600">상단(데스크톱) 또는 하단(모바일)에 NavBar가 표시됩니다.</p>
        </div>
      </div>
    </div>
  )
}