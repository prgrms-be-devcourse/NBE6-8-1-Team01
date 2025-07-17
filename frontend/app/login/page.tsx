'use client'

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 입력해주세요.")
      return
    }

    try {
      setLoading(true)
      setError("")
      
      const response = await authApi.login(formData)
      
      if (response.data) {
        // 로그인 성공 - 쿠키는 서버에서 자동 설정됨
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message || "로그인에 실패했습니다.")
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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <form onSubmit={handleSubmit} className="flex flex-col w-[512px] max-w-[512px] mx-auto py-5">
          <div className="flex flex-col items-center gap-6 p-4">
            <h1 className="text-gray-900 text-4xl font-bold">로그인</h1>
            <p className="text-gray-600 text-base text-center">
              계정이 없으신가요?{" "}
              <Link href="/signup" className="text-amber-600 hover:text-amber-700 underline">
                회원가입
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-8 p-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-900 text-base font-medium pb-1">
                이메일
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-14 bg-white border border-gray-300 rounded-xl px-4 text-base"
                placeholder="이메일을 입력해주세요"
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-gray-900 text-base font-medium pb-1">
                비밀번호
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-14 bg-white border border-gray-300 rounded-xl px-4 text-base"
                placeholder="비밀번호를 입력해주세요"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </Button>

            <div className="text-center">
              <Link href="/checkout" className="text-gray-600 hover:text-gray-800 text-sm underline">
                비회원으로 주문하기
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
