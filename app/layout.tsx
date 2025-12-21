import "../styles/globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SessionProvider from "@/components/providers/SessionProvider"
import { AuthProvider } from "@/contexts/AuthContext"
import Chatbot from "@/components/features/Chatbot"
import { Outfit, Cormorant_Garamond, Noto_Sans_KR, Nanum_Myeongjo } from "next/font/google"
import Background from "@/components/layout/Background"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ['system-ui', 'sans-serif'],
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ['Georgia', 'serif'],
})

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
  fallback: ['system-ui', 'sans-serif'],
})

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum-myeongjo",
  display: "swap",
  fallback: ['Georgia', 'serif'],
})

export const metadata = {
  title: "MHA — Manila Hankuk Academy",
  description: "Nurturing minds, inspiring hearts — MHA school website",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${outfit.variable} ${cormorant.variable} ${notoSansKr.variable} ${nanumMyeongjo.variable}`}>
      <body className="min-h-screen flex flex-col text-slate-100 antialiased font-sans">
        <Background />
        <SessionProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Chatbot />
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
