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
import { authApi } from "@/lib/api/auth"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "입력 오류",
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive"
      })
      return
    }

    if (!agreements.terms || !agreements.privacy) {
      toast({
        title: "입력 오류",
        description: "필수 약관에 동의해주세요.",
        variant: "destructive"
      })
      return
    }

    if (formData.password.length < 4) {
      toast({
        title: "입력 오류",
        description: "비밀번호는 4자 이상이어야 합니다.",
        variant: "destructive"
      })
      return
    }

    try {
      setLoading(true)
      
      const response = await authApi.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        role: 'USER'
      })
      
      if (response.resultCode === 'SUCCESS') {
        toast({
          title: "회원가입 성공",
          description: "환영합니다! 회원가입이 완료되었습니다.",
        })
        // 회원가입 성공 후 로그인 페이지로
        router.push("/login")
      } else {
        throw new Error(response.msg || "회원가입 실패")
      }
    } catch (err: any) {
      toast({
        title: "회원가입 실패",
        description: err.message || "회원가입에 실패했습니다.",
        variant: "destructive"
      })
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
    <div className="min-h-screen bg-gradient-to-br from-mediterranean-sky/20 via-background to-mediterranean-sand/10">
      <Navigation />
      
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-mediterranean-blue/10">
            {/* Logo */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-mediterranean-blue to-mediterranean-terracotta rounded-full flex items-center justify-center shadow-lg">
                <Coffee className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                회원가입
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                프리미엄 커피의 세계로 초대합니다
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-300 rounded-xl focus:border-mediterranean-blue focus:ring-2 focus:ring-mediterranean-blue/20 transition-all"
                    placeholder="example@email.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                  이름
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-300 rounded-xl focus:border-mediterranean-blue focus:ring-2 focus:ring-mediterranean-blue/20 transition-all"
                    placeholder="이름을 입력해주세요"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-300 rounded-xl focus:border-mediterranean-blue focus:ring-2 focus:ring-mediterranean-blue/20 transition-all"
                    placeholder="4자 이상 입력해주세요"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                  비밀번호 확인
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-300 rounded-xl focus:border-mediterranean-blue focus:ring-2 focus:ring-mediterranean-blue/20 transition-all"
                    placeholder="비밀번호를 다시 입력해주세요"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                  주소
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-300 rounded-xl focus:border-mediterranean-blue focus:ring-2 focus:ring-mediterranean-blue/20 transition-all"
                    placeholder="배송 받으실 주소를 입력해주세요"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Agreements */}
              <div className="space-y-3 pt-5 mt-5 border-t border-gray-200">
                <div className="flex items-center p-3 bg-mediterranean-sky/10 rounded-lg hover:bg-mediterranean-sky/20 transition-colors">
                  <Checkbox
                    id="all-agree"
                    checked={agreements.terms && agreements.privacy}
                    onCheckedChange={handleAllAgree}
                    disabled={loading}
                    className="data-[state=checked]:bg-mediterranean-blue data-[state=checked]:border-mediterranean-blue"
                  />
                  <label
                    htmlFor="all-agree"
                    className="ml-3 text-sm font-bold text-gray-900 cursor-pointer flex-1"
                    style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}
                  >
                    전체 약관 동의
                  </label>
                </div>
                
                <div className="space-y-2 ml-2">
                  <div className="flex items-center p-2">
                    <Checkbox
                      id="terms"
                      checked={agreements.terms}
                      onCheckedChange={(checked) =>
                        setAgreements({ ...agreements, terms: checked as boolean })
                      }
                      disabled={loading}
                      className="data-[state=checked]:bg-mediterranean-blue data-[state=checked]:border-mediterranean-blue"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-3 text-sm text-gray-700 cursor-pointer"
                      style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}
                    >
                      <span className="text-mediterranean-terracotta font-medium">[필수]</span> 이용약관 동의
                    </label>
                  </div>

                  <div className="flex items-center p-2">
                    <Checkbox
                      id="privacy"
                      checked={agreements.privacy}
                      onCheckedChange={(checked) =>
                        setAgreements({ ...agreements, privacy: checked as boolean })
                      }
                      disabled={loading}
                      className="data-[state=checked]:bg-mediterranean-blue data-[state=checked]:border-mediterranean-blue"
                    />
                    <label
                      htmlFor="privacy"
                      className="ml-3 text-sm text-gray-700 cursor-pointer"
                      style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}
                    >
                      <span className="text-mediterranean-terracotta font-medium">[필수]</span> 개인정보 처리방침 동의
                    </label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                disabled={loading}
              >
                {loading ? "가입 중..." : "가입하기"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">또는</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 text-sm" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                  이미 회원이신가요?{" "}
                  <Link href="/login" className="text-mediterranean-blue hover:text-mediterranean-blue/80 font-semibold">
                    로그인
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
