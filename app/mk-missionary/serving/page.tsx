'use client'
import ContentPageLayout from "@/components/ContentPageLayout";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { mkMissionarySubNav } from '@/lib/subNavConfig';

interface Missionary {
  id: string;
  name: string;
  koreanName: string;
  role: string;
  description: string;
  imageUrl: string;
  email: string;
  isActive: boolean;
  order: number;
}

export default function ServingPage() {
  const [staff, setStaff] = useState<Record<string, Missionary[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("/api/missionaries?active=true");
        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();

        if (data.success) {
          // Group by Description (Department)
          const grouped = data.data.missionaries.reduce((acc: Record<string, Missionary[]>, curr: Missionary) => {
            // Use description as the grouping key (e.g., "초등", "중등", "행정실")
            // Fallback to '기타' or role if description is missing
            const groupKey = curr.description || '기타';

            if (!acc[groupKey]) {
              acc[groupKey] = [];
            }
            acc[groupKey].push(curr);
            return acc;
          }, {});

          setStaff(grouped);
        } else {
          throw new Error(data.error || 'Failed to load data');
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // Define department order for display based on DB descriptions
  const departmentOrder = ["학교장", "교목실", "초등", "중등", "행정실", "도서관", "생활관", "보건실", "식당"];

  // Sort departments based on predefined order, putting others at the end
  const sortedDepartments = Object.keys(staff).sort((a, b) => {
    const indexA = departmentOrder.indexOf(a);
    const indexB = departmentOrder.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <ContentPageLayout
      title="섬기는 분들"
      subtitle="마닐라한국아카데미를 섬기시는 분들을 소개합니다"
      heroImageUrl="/images/mk-bg.jpg"
      heroImageAlt="Serving Staff"
      subNav={mkMissionarySubNav}
    >
      <div className="max-w-7xl mx-auto py-16 px-6">
        {loading ? (
          <div className="text-center text-white py-20">로딩 중...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-20 bg-red-900/20 rounded-xl border border-red-900/50">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-800/50 hover:bg-red-700/50 rounded-lg text-white text-sm transition-colors"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <>
            {/* 부서별로 표시 */}
            {sortedDepartments.map((department, deptIndex) => (
              <motion.div
                key={department}
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: deptIndex * 0.2 }}
              >
                {/* 부서명 */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-nanum-myeongjo)' }}>
                    {department}
                  </h2>
                  <div className="w-20 h-1 bg-[#D4AF37] rounded-full" />
                </div>

                {/* 졸업앨범 스타일 그리드 - 5열로 늘려서 사진 크기 축소 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {staff[department].map((person, index) => (
                    <motion.div
                      key={person.id}
                      className="group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        y: -5,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20">
                        {/* 사진 */}
                        <div className="relative w-full aspect-[3/4] bg-gray-800 overflow-hidden">
                          {person.imageUrl ? (
                            <Image
                              src={person.imageUrl}
                              alt={`${person.koreanName} ${person.description}`}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                              <span className="text-sm">No Image</span>
                            </div>
                          )}
                          {/* 오버레이 효과 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* 이름과 직책 */}
                        <div className="p-4 text-center" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
                          <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'var(--font-nanum-myeongjo)' }}>
                            {person.koreanName || person.name}
                          </h3>
                          <p className="text-xs text-[#D4AF37] font-medium line-clamp-1">
                            {person.role || '-'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </>
        )}

        {/* 하단 안내 */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C158]/10 rounded-2xl p-8 border border-[#D4AF37]/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-nanum-myeongjo)' }}>함께 하고 싶으신가요?</h3>
          <p className="text-slate-300 mb-4" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
            마닐라한국아카데미에서 선교사 자녀들을 섬기는 사역에 동참하고 싶으신 분들은 언제든지 연락 주시기 바랍니다.
          </p>
          <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-noto-sans-kr)' }}>
            <span className="text-slate-400">문의:</span>
            <a href="mailto:hankukac@hanmail.net" className="text-[#D4AF37] hover:text-[#E5C158] transition-colors font-semibold">
              hankukac@hanmail.net
            </a>
          </div>
        </motion.div>
      </div>
    </ContentPageLayout>
  );
}
