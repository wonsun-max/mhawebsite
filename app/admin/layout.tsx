'use client'
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  UtensilsCrossed,
  Calendar,
  LogOut,
  Home,
  MessageCircle
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    if (session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session?.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#0F2847] to-[#0A1929] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
          <div className="text-white text-xl font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "대시보드", gradient: "from-blue-500 to-cyan-500" },
    { href: "/admin/users", icon: Users, label: "사용자 관리", gradient: "from-purple-500 to-pink-500" },
    { href: "/admin/announcements", icon: FileText, label: "공지사항 관리", gradient: "from-green-500 to-emerald-500" },
    { href: "/admin/posts", icon: FileText, label: "게시글 관리", gradient: "from-yellow-500 to-orange-500" },
    { href: "/admin/albums", icon: Image, label: "앨범 관리", gradient: "from-pink-500 to-rose-500" },
    { href: "/admin/missionaries", icon: Users, label: "MK선교사 관리", gradient: "from-indigo-500 to-purple-500" },
    { href: "/admin/meals", icon: UtensilsCrossed, label: "급식 관리", gradient: "from-orange-500 to-red-500" },
    { href: "/admin/calendar", icon: Calendar, label: "학사일정 관리", gradient: "from-teal-500 to-cyan-500" },
    { href: "/admin/inquiries", icon: MessageCircle, label: "입학 상담 관리", gradient: "from-violet-500 to-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#0F2847] to-[#0A1929] flex pt-20">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col relative">
        {/* Glassmorphic background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-xl border-r border-white/10"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-blue-500/5 opacity-50"></div>

        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B4941F] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Admin Panel</h1>
                <p className="text-xs text-blue-300/70 font-medium">MHA 관리자</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1.5">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                        ? 'bg-white/10 shadow-lg shadow-[#D4AF37]/10'
                        : 'hover:bg-white/5'
                        }`}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#D4AF37] to-[#B4941F] rounded-r-full"></div>
                      )}

                      {/* Icon with gradient background */}
                      <div className={`relative p-2 rounded-lg transition-all duration-300 ${isActive
                        ? `bg-gradient-to-br ${item.gradient}`
                        : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                        <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`} />
                      </div>

                      {/* Label */}
                      <span className={`font-medium text-sm transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                        {item.label}
                      </span>

                      {/* Hover glow */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <div className="p-2 bg-white/5 group-hover:bg-white/10 rounded-lg transition-all">
                <Home className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm">홈으로 돌아가기</span>
            </Link>
            <button
              onClick={() => router.push("/api/auth/signout")}
              className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
            >
              <div className="p-2 bg-red-500/10 group-hover:bg-red-500/20 rounded-lg transition-all">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm">로그아웃</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
