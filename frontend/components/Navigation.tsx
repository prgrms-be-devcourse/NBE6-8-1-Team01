'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Coffee, 
  ShoppingCart, 
  User, 
  ChevronDown, 
  Menu, 
  Heart,
  LogOut,
  Package
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { authApi } from "@/lib/api"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOnHeroSection, setIsOnHeroSection] = useState(true)
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const { wishlist } = useWishlist()
  

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      setIsOnHeroSection(window.scrollY < window.innerHeight - 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await authApi.logout()
      router.push('/')
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-light shadow-lg' : 'backdrop-blur-md bg-black/30'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-mediterranean-blue to-mediterranean-sky rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-mediterranean-blue to-mediterranean-sky rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif', letterSpacing: '-0.03em' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mediterranean-blue to-mediterranean-terracotta uppercase">GRIDS & CIRCLES</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center gap-8">
              <motion.li whileHover={{ y: -2 }}>
                <Link href="/" className={`text-sm font-medium ${isOnHeroSection && !isScrolled ? 'text-white hover:text-mediterranean-sand' : 'text-gray-700 hover:text-mediterranean-blue'} transition-colors relative group`}>
                  홈
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mediterranean-blue group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.li>
              <motion.li whileHover={{ y: -2 }}>
                <Link href="/products" className={`text-sm font-medium ${isOnHeroSection && !isScrolled ? 'text-white hover:text-mediterranean-sand' : 'text-gray-700 hover:text-mediterranean-blue'} transition-colors relative group`}>
                  전체 원두
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mediterranean-blue group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.li>
              {isAuthenticated && (
                <>
                  <motion.li whileHover={{ y: -2 }}>
                    <Link href="/wishlist" className="text-sm font-medium text-gray-700 hover:text-mediterranean-blue transition-colors relative group">
                      장바구니
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mediterranean-blue group-hover:w-full transition-all duration-300" />
                      {wishlist.length > 0 && (
                        <Badge className="absolute -top-2 -right-4 h-4 w-4 p-0 flex items-center justify-center bg-mediterranean-terracotta text-white text-[10px]">
                          {wishlist.length}
                        </Badge>
                      )}
                    </Link>
                  </motion.li>
                  {user?.role === 'ADMIN' && (
                    <>
                      <motion.li whileHover={{ y: -2 }}>
                        <Link href="/admin/products" className="text-sm font-medium text-gray-700 hover:text-mediterranean-blue transition-colors relative group">
                          상품 관리
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mediterranean-blue group-hover:w-full transition-all duration-300" />
                        </Link>
                      </motion.li>
                      <motion.li whileHover={{ y: -2 }}>
                        <Link href="/admin/orders" className="text-sm font-medium text-gray-700 hover:text-mediterranean-blue transition-colors relative group">
                          주문 관리
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mediterranean-blue group-hover:w-full transition-all duration-300" />
                        </Link>
                      </motion.li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Wishlist Button (Mobile) */}
            {isAuthenticated && (
              <motion.div whileHover={{ scale: 1.05 }} className="lg:hidden">
                <Link href="/wishlist">
                  <Button variant="ghost" size="icon" className="relative text-gray-700 hover:bg-gray-100">
                    <Heart className="w-5 h-5" />
                    {wishlist.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-mediterranean-terracotta text-white text-[10px]">
                        {wishlist.length}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Cart Link */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/wishlist">
                <Button variant="ghost" className="relative text-gray-700 hover:bg-gray-100 group">
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5 group-hover:text-mediterranean-blue transition-colors" />
                    {wishlist.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-mediterranean-terracotta shadow-sm">
                        {wishlist.length}
                      </Badge>
                    )}
                  </div>
                  <span className="hidden sm:inline-block ml-2">장바구니</span>
                </Button>
              </Link>
            </motion.div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 group">
                    <User className="w-5 h-5 text-gray-700 group-hover:text-mediterranean-blue transition-colors" />
                    <span className="hidden sm:inline-block ml-2 text-gray-700 font-medium">
                      {isAuthenticated ? user?.name || '내 계정' : '계정'}
                    </span>
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-700" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 bg-white shadow-xl border border-gray-200" align="end">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-800">{user?.email}</p>
                      <p className="text-xs text-gray-600">{user?.name}</p>
                    </div>
                    <DropdownMenuItem asChild className="hover:bg-gray-100 cursor-pointer">
                      <Link href="/account" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        내 정보
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-gray-100 cursor-pointer">
                      <Link href="/orders" className="flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        주문 내역
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-gray-100 cursor-pointer">
                      <Link href="/wishlist" className="flex items-center">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        장바구니
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="hover:bg-gray-100 cursor-pointer text-red-500"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      로그아웃
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="hover:bg-gray-100 cursor-pointer">
                      <Link href="/login">로그인</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-gray-100 cursor-pointer">
                      <Link href="/signup">회원가입</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <motion.div whileHover={{ scale: 1.05 }} className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="lg:hidden mt-4 py-4 border-t border-gray-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-3">
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link 
                    href="/" 
                    className="block text-sm font-medium text-gray-700 hover:text-mediterranean-blue transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    홈
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    href="/products" 
                    className="block text-sm font-medium text-gray-700 hover:text-mediterranean-blue transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    전체 원두
                  </Link>
                </motion.li>
                {isAuthenticated && (
                  <>
                    <motion.li
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link 
                        href="/wishlist" 
                        className="block text-sm font-medium text-gray-700 hover:text-mediterranean-blue transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        장바구니 ({wishlist.length})
                      </Link>
                    </motion.li>
                    {user?.role === 'ADMIN' && (
                      <>
                        <motion.li
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Link 
                            href="/admin/products" 
                            className="block text-sm font-medium text-gray-700 hover:text-mediterranean-blue transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            상품 관리
                          </Link>
                        </motion.li>
                        <motion.li
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Link 
                            href="/admin/orders" 
                            className="block text-sm font-medium text-gray-700 hover:text-mediterranean-blue transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            주문 관리
                          </Link>
                        </motion.li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}