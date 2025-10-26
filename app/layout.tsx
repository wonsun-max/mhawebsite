import "../styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SessionProvider from "@/components/SessionProvider"
import Chatbot from "@/components/Chatbot"

export const metadata = {
  title: "MHA — Manila Hankuk Academy",
  description: "Nurturing minds, inspiring hearts — MHA school website",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white antialiased">
        <SessionProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Chatbot />
        </SessionProvider>
      </body>
    </html>
  )
}
