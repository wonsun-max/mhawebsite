'use client'
import { useSession } from "next-auth/react";
import { FileText, Image, Users, UtensilsCrossed, MessageCircle, Loader2, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DashboardStats {
  counts: {
    announcements: number;
    albums: number;
    missionaries: number;
    meals: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'ANNOUNCEMENT' | 'POST' | 'ALBUM';
    title: string;
    createdAt: string;
    author: string | null;
  }>;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    {
      label: "공지사항",
      value: stats?.counts.announcements ?? '-',
      icon: FileText,
      href: "/admin/announcements",
      gradient: "from-blue-500 to-cyan-500",
      bg: "from-blue-500/10 to-cyan-500/10"
    },
    {
      label: "앨범 사진",
      value: stats?.counts.albums ?? '-',
      icon: Image,
      href: "/admin/albums",
      gradient: "from-pink-500 to-rose-500",
      bg: "from-pink-500/10 to-rose-500/10"
    },
    {
      label: "MK 선교사",
      value: stats?.counts.missionaries ?? '-',
      icon: Users,
      href: "/admin/missionaries",
      gradient: "from-purple-500 to-violet-500",
      bg: "from-purple-500/10 to-violet-500/10"
    },
    {
      label: "급식 계획",
      value: stats?.counts.meals ?? '-',
      icon: UtensilsCrossed,
      href: "/admin/meals",
      gradient: "from-orange-500 to-amber-500",
      bg: "from-orange-500/10 to-amber-500/10"
    },
  ];

  const quickActions = [
    { label: "새 공지사항", href: "/admin/announcements/create", gradient: "from-blue-500 to-cyan-500" },
    { label: "앨범 만들기", href: "/admin/albums/create", gradient: "from-pink-500 to-rose-500" },
    { label: "선교사 추가", href: "/admin/missionaries?action=new", gradient: "from-purple-500 to-violet-500" },
    { label: "급식 계획", href: "/admin/meals?action=new", gradient: "from-orange-500 to-amber-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
        >
          관리자 대시보드
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 flex items-center gap-2"
        >
          환영합니다, <span className="text-[#D4AF37] font-semibold">{session?.user?.name}</span>님
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statItems.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link href={stat.href}>
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 h-full cursor-pointer">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>

                {/* Animated glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>

                {/* Content */}
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-white">
                      {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : stat.value}
                    </p>
                    <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 mb-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none"></div>

        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-[#D4AF37] to-[#B4941F] rounded-full"></div>
          빠른 작업
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <Link href={action.href}>
                <button className={`group relative w-full px-5 py-4 rounded-xl bg-gradient-to-br ${action.gradient} hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden`}>
                  {/* Animated shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative flex items-center justify-center gap-2 text-white font-semibold">
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    {action.label}
                  </div>
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          최근 활동
        </h2>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-[#D4AF37]" />
              <p className="text-gray-400">활동 내역을 불러오는 중...</p>
            </div>
          ) : stats?.recentActivity.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-500 font-medium">최근 활동 내역이 없습니다.</p>
            </div>
          ) : (
            stats?.recentActivity.map((activity, i) => {
              // Determine the link based on activity type
              const getActivityLink = () => {
                switch (activity.type) {
                  case 'ANNOUNCEMENT':
                    return `/admin/announcements`;
                  case 'ALBUM':
                    return `/admin/albums`;
                  case 'POST':
                    return `/admin/posts`;
                  default:
                    return '/admin';
                }
              };

              return (
                <Link key={`${activity.type}-${activity.id}`} href={getActivityLink()}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    className="group relative flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className={`p-3 rounded-xl ${activity.type === 'ALBUM'
                        ? 'bg-gradient-to-br from-pink-500 to-rose-500'
                        : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      } shadow-lg`}>
                      {activity.type === 'ALBUM' ? (
                        <Image className="w-5 h-5 text-white" />
                      ) : (
                        <FileText className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        <span className="text-gray-400 mr-2">
                          {activity.type === 'ALBUM' ? '새 앨범' : '새 게시글'}:
                        </span>
                        {activity.title}
                      </p>
                      <div className="flex gap-2 text-xs text-gray-500 mt-1">
                        <span className="font-medium">{activity.author}</span>
                        <span>•</span>
                        <span>{new Date(activity.createdAt).toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>

                    {/* Hover arrow */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
