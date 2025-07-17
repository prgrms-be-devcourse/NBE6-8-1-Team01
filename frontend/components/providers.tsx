'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        {children}
        <Toaster />
      </WishlistProvider>
    </AuthProvider>
  )
}