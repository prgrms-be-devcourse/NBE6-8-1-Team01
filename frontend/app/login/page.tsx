'use client'

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("로그인 시도:", { email, password })
    router.push("/")
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
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-900 text-base font-medium pb-1">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-white border border-gray-300 rounded-xl px-4 text-base"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-gray-900 text-base font-medium pb-1">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-white border border-gray-300 rounded-xl px-4 text-base"
                required
              />
            </div>

            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-amber-600 hover:text-amber-700 text-sm underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-base font-medium"
            >
              로그인
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-600 text-sm">또는</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border border-gray-300 hover:bg-gray-50 rounded-xl text-base font-medium"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                구글로 로그인
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border border-gray-300 hover:bg-gray-50 rounded-xl text-base font-medium"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#FEE500">
                  <path d="M12 3c5.8 0 10.5 3.7 10.5 8.3 0 1.8-.7 3.5-2 4.9l.1 4.3c0 .4-.3.7-.7.7-.1 0-.3 0-.4-.1l-3.9-2.1c-1 .2-2.3.3-3.6.3-5.8 0-10.5-3.7-10.5-8.3S6.2 3 12 3z"/>
                </svg>
                카카오로 로그인
              </Button>
            </div>

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