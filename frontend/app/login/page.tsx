'use client'

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { Coffee, Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast({
        title: "입력 오류",
        description: "이메일과 비밀번호를 입력해주세요.",
        variant: "destructive"
      })
      return
    }

    try {
      setLoading(true)
      
      await login(formData.email, formData.password)
      
      toast({
        title: "로그인 성공",
        description: "환영합니다!",
      })
      
      router.push("/")
      router.refresh()
    } catch (err: any) {
      toast({
        title: "로그인 실패",
        description: err.message || "이메일 또는 비밀번호를 확인해주세요.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mediterranean-sky/20 via-background to-mediterranean-sand/10">
      <Navigation />
      
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-mediterranean-blue/10">
            {/* 로고 */}
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
                다시 만나서 반가워요!
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'var(--font-noto), Noto Sans KR, sans-serif' }}>
                로그인하여 프리미엄 커피를 만나보세요
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

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
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-mediterranean-blue hover:bg-mediterranean-blue/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "로그인 중..." : "로그인"}
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
                  아직 회원이 아니신가요?{" "}
                  <Link href="/signup" className="text-mediterranean-blue hover:text-mediterranean-blue/80 font-semibold">
                    회원가입
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
