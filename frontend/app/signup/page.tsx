'use client'

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Coffee, Mail, Lock, User, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    address: "",
    detailAddress: "",
  })
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.")
      return
    }

    // TODO: 백엔드 연동 시 실제 회원가입 로직 구현
    console.log("회원가입 시도:", { ...formData, ...agreements })
    
    // 임시로 로그인 페이지로 이동
    router.push("/login")
  }

  const handleAllAgree = () => {
    const newValue = !agreements.terms || !agreements.privacy || !agreements.marketing
    setAgreements({
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />
      
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full mb-4">
              <Coffee className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
            <p className="text-gray-600 mt-2">그리드앤써클스의 회원이 되어주세요</p>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  이메일 <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-gray-700">
                  비밀번호 <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="8자 이상 입력해주세요"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-gray-700">
                  이름 <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  전화번호 <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="text-gray-700">
                  주소 <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2 mt-1">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="기본 주소"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <Input
                    name="detailAddress"
                    type="text"
                    placeholder="상세 주소 (동, 호수 등)"
                    value={formData.detailAddress}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Agreements */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center">
                  <Checkbox
                    id="all-agree"
                    checked={agreements.terms && agreements.privacy && agreements.marketing}
                    onCheckedChange={handleAllAgree}
                  />
                  <label
                    htmlFor="all-agree"
                    className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    전체 동의
                  </label>
                </div>
                
                <div className="flex items-center ml-6">
                  <Checkbox
                    id="terms"
                    checked={agreements.terms}
                    onCheckedChange={(checked) =>
                      setAgreements({ ...agreements, terms: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm text-gray-600 cursor-pointer"
                  >
                    [필수] 이용약관 동의
                  </label>
                </div>

                <div className="flex items-center ml-6">
                  <Checkbox
                    id="privacy"
                    checked={agreements.privacy}
                    onCheckedChange={(checked) =>
                      setAgreements({ ...agreements, privacy: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="privacy"
                    className="ml-2 text-sm text-gray-600 cursor-pointer"
                  >
                    [필수] 개인정보 처리방침 동의
                  </label>
                </div>

                <div className="flex items-center ml-6">
                  <Checkbox
                    id="marketing"
                    checked={agreements.marketing}
                    onCheckedChange={(checked) =>
                      setAgreements({ ...agreements, marketing: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="marketing"
                    className="ml-2 text-sm text-gray-600 cursor-pointer"
                  >
                    [선택] 마케팅 정보 수신 동의
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3"
              >
                가입하기
              </Button>
            </form>

            {/* Login link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                이미 회원이신가요?{" "}
                <Link href="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                  로그인
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}