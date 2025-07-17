import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap',
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Grids & Circles - Premium Specialty Coffee",
  description: "프리미엄 스페셜티 커피의 진정한 맛을 경험하세요. 전 세계 최고급 원두를 온라인으로 만나보세요.",
  keywords: "스페셜티 커피, 원두, 커피샵, 프리미엄 커피, 싱글 오리진",
  openGraph: {
    title: "Grids & Circles - Premium Specialty Coffee",
    description: "프리미엄 스페셜티 커피의 진정한 맛을 경험하세요",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${notoSansKr.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
