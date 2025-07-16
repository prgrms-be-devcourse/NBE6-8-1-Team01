'use client'

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  
  // 임시 장바구니 데이터
  const cartItems = [
    { 
      id: 1, 
      name: "시그니처 블렌드", 
      price: 18900, 
      quantity: 1,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&q=80"
    },
  ]

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apt: "",
    city: "",
    country: "대한민국",
    state: "",
    postalCode: "",
    phone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("주문 정보:", formData)
    router.push("/order-complete")
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 3000
  const taxes = Math.round(subtotal * 0.1)
  const total = subtotal + shipping + taxes

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <form onSubmit={handleSubmit} className="flex flex-col w-[512px] max-w-[512px] mx-auto py-5">
          {/* Breadcrumb */}
          <div className="flex flex-wrap gap-2 p-4">
            <Link href="/cart" className="text-gray-600 text-base font-medium">
              장바구니
            </Link>
            <span className="text-gray-600 text-base font-medium">/</span>
            <span className="text-gray-900 text-base font-medium">결제</span>
          </div>

          <h2 className="text-gray-900 text-2xl font-bold px-4 pb-3 pt-5">결제</h2>

          {/* Contact */}
          <div className="px-4 py-3">
            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">이메일</p>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
                required
              />
            </label>
          </div>

          {/* Shipping Address */}
          <h2 className="text-gray-900 text-xl font-bold px-4 pb-3 pt-5">배송 주소</h2>

          <div className="grid grid-cols-2 gap-4 px-4 py-3">
            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">이름</p>
              <Input
                name="firstName"
                placeholder="이름"
                value={formData.firstName}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
                required
              />
            </label>

            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">성</p>
              <Input
                name="lastName"
                placeholder="성"
                value={formData.lastName}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
                required
              />
            </label>
          </div>

          <div className="px-4 py-3">
            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">회사 (선택사항)</p>
              <Input
                name="company"
                placeholder="회사명"
                value={formData.company}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
              />
            </label>
          </div>

          <div className="px-4 py-3">
            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">주소</p>
              <Input
                name="address"
                placeholder="주소"
                value={formData.address}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
                required
              />
            </label>
          </div>

          <div className="px-4 py-3">
            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">상세주소 (선택사항)</p>
              <Input
                name="apt"
                placeholder="동, 호수 등"
                value={formData.apt}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 px-4 py-3">
            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">시/구</p>
              <Input
                name="city"
                placeholder="시/구"
                value={formData.city}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
                required
              />
            </label>

            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">국가</p>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4 text-base"
              >
                <option value="대한민국">대한민국</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 px-4 py-3">
            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">도/광역시</p>
              <Input
                name="state"
                placeholder="도/광역시"
                value={formData.state}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
                required
              />
            </label>

            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">우편번호</p>
              <Input
                name="postalCode"
                placeholder="우편번호"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
                required
              />
            </label>
          </div>

          <div className="px-4 py-3">
            <label className="flex flex-col">
              <p className="text-gray-900 text-base font-medium pb-2">전화번호</p>
              <Input
                name="phone"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={handleInputChange}
                className="h-14 bg-white border border-gray-300 rounded-xl px-4"
                required
              />
            </label>
          </div>

          {/* Order Summary */}
          <h2 className="text-gray-900 text-xl font-bold px-4 pb-3 pt-5">주문 요약</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-14 h-14"
                style={{ backgroundImage: `url("${item.image}")` }}
              />
              <div className="flex flex-col justify-center flex-1">
                <p className="text-gray-900 text-base font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.quantity}개</p>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
            <p className="text-gray-900 text-base">소계</p>
            <p className="text-gray-900 text-base">₩{subtotal.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
            <p className="text-gray-900 text-base">배송비</p>
            <p className="text-gray-900 text-base">₩{shipping.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
            <p className="text-gray-900 text-base">세금</p>
            <p className="text-gray-900 text-base">₩{taxes.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between">
            <p className="text-gray-900 text-base font-bold">총 금액</p>
            <p className="text-gray-900 text-base font-bold">₩{total.toLocaleString()}</p>
          </div>

          <div className="flex px-4 py-3">
            <Button
              type="submit"
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white h-12 rounded-xl text-base font-medium"
            >
              주문하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}