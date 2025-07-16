'use client'

import { useState } from "react"
import Link from "next/link"
import { Coffee, ShoppingCart, User, ChevronDown, X, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // 임시 장바구니 데이터
  const cartItems = [
    { id: 1, name: "시그니처 블렌드", price: 18900, quantity: 2 },
    { id: 2, name: "에티오피아 싱글 오리진", price: 24900, quantity: 1 },
    { id: 3, name: "콜드브루 컨센트레이트", price: 16900, quantity: 1 },
  ]
  
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-screen-xl px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Main Nav */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">그리드앤써클스</span>
            </Link>

            <ul className="hidden lg:flex items-center gap-6 md:gap-8">
              <li>
                <Link href="/" className="text-sm font-medium text-gray-900 hover:text-amber-600 dark:text-white dark:hover:text-amber-500">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm font-medium text-gray-900 hover:text-amber-600 dark:text-white dark:hover:text-amber-500">
                  전체 원두
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Nav Items */}
          <div className="flex items-center space-x-2">
            {/* Cart Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline-block ml-1">장바구니</span>
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-600">
                      {cartCount}
                    </Badge>
                  )}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 p-4" align="end">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <Link href="#" className="text-sm font-semibold text-gray-900 hover:underline">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">₩{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">수량: {item.quantity}</span>
                        <button className="text-red-600 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-4" />
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">총 금액</span>
                  <span className="font-semibold">₩{cartTotal.toLocaleString()}</span>
                </div>
                <Link href="/cart">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    장바구니 보기
                  </Button>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline-block ml-1">계정</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">로그인</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signup">회원가입</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/checkout">비회원 주문</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-3">
              <li>
                <Link href="/" className="block text-sm font-medium text-gray-900 hover:text-amber-600 dark:text-white">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/products" className="block text-sm font-medium text-gray-900 hover:text-amber-600 dark:text-white">
                  전체 원두
                </Link>
              </li>
              <li>
                <Link href="/cart" className="block text-sm font-medium text-gray-900 hover:text-amber-600 dark:text-white">
                  장바구니
                </Link>
              </li>
              <li>
                <Link href="/login" className="block text-sm font-medium text-gray-900 hover:text-amber-600 dark:text-white">
                  로그인
                </Link>
              </li>
              <li>
                <Link href="/signup" className="block text-sm font-medium text-gray-900 hover:text-amber-600 dark:text-white">
                  회원가입
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}