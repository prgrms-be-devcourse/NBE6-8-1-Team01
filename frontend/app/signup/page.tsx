'use client'

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Coffee, Mail, Lock, User, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    address: "",
  })
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      return
    }

    if (!agreements.terms || !agreements.privacy) {
      setError("필수 약관에 동의해주세요.")
      return
    }

    if (formData.password.length < 4) {
      setError("비밀번호는 4자 이상이어야 합니다.")
      return
    }

    try {
      setLoading(true)
      setError("")
      
      const response = await authApi.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        role: 'USER'
      })
      
      if (response.data) {
        // 회원가입 성공 - 자동 로그인됨
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message || "회원가입에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleAllAgree = () => {
    const newValue = !agreements.terms || !agreements.privacy
    setAgreements({
      terms: newValue,
      privacy: newValue,
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
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                  {error}
                </div>
              )}

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
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <Label htmlFor="username" className="text-gray-700">
                  이름 <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                    disabled={loading}
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
                    placeholder="4자 이상 입력해주세요"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="text-gray-700">
                  주소 <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="주소를 입력해주세요"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Agreements */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center">
                  <Checkbox
                    id="all-agree"
                    checked={agreements.terms && agreements.privacy}
                    onCheckedChange={handleAllAgree}
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                  <label
                    htmlFor="privacy"
                    className="ml-2 text-sm text-gray-600 cursor-pointer"
                  >
                    [필수] 개인정보 처리방침 동의
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "가입 중..." : "가입하기"}
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
