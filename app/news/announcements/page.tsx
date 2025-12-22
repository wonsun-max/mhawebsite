'use client';

import { useEffect, useState, useCallback } from 'react';
import ContentPageLayout from '@/components/ContentPageLayout';
import { motion } from 'framer-motion';
import { Calendar, Pin, User, ArrowRight, Search, Loader2, Megaphone, FileText } from 'lucide-react';
import Link from 'next/link';
import { newsSubNav } from '@/lib/subNavConfig';

interface Announcement {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: {
        id: string;
        name?: string;
        koreanName?: string;
    };
    isPinned: boolean;
    views: number;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function AnnouncementsPage() {
    const [pinned, setPinned] = useState<Announcement[]>([]);
    const [general, setGeneral] = useState<Announcement[]>([]);
    const [loadingPinned, setLoadingPinned] = useState(true);
    const [loadingGeneral, setLoadingGeneral] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 });

    // Simple debounce implementation if hook doesn't exist
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchPinned = useCallback(async () => {
        setLoadingPinned(true);
        try {
            const query = new URLSearchParams({ type: 'pinned' });
            if (debouncedSearch) query.append('search', debouncedSearch);

            const res = await fetch(`/api/announcements?${query.toString()}`);
            const json = await res.json();
            if (json.success) {
                setPinned(json.data);
            }
        } catch (e) {
            console.error('Error fetching pinned announcements', e);
        } finally {
            setLoadingPinned(false);
        }
    }, [debouncedSearch]);

    const fetchGeneral = useCallback(async (page = 1) => {
        setLoadingGeneral(true);
        try {
            const query = new URLSearchParams({
                type: 'general',
                page: page.toString(),
                limit: '10'
            });
            if (debouncedSearch) query.append('search', debouncedSearch);

            const res = await fetch(`/api/announcements?${query.toString()}`);
            const json = await res.json();
            if (json.success) {
                setGeneral(json.data);
                setPagination(json.pagination);
            }
        } catch (e) {
            console.error('Error fetching general announcements', e);
        } finally {
            setLoadingGeneral(false);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        fetchPinned();
        fetchGeneral(1);
    }, [fetchPinned, fetchGeneral]);

    const handlePageChange = (newPage: number) => {
        fetchGeneral(newPage);
        // Scroll to top of general section on mobile
        if (window.innerWidth < 1024) {
            document.getElementById('general-news')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const AnnouncementCard = ({ item, isPinned = false }: { item: Announcement, isPinned?: boolean }) => (
        <Link href={`/news/announcements/${item.id}`} className="block h-full">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className={`h-full group relative overflow-hidden rounded-xl border transition-all duration-300 ${isPinned
                    ? 'bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-500/30 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-900/20'
                    : 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600'
                    }`}
            >
                <div className="p-5 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                        {isPinned ? (
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded flex items-center gap-1">
                                <Pin className="w-3 h-3" /> 중요
                            </span>
                        ) : (
                            <span className="px-2 py-0.5 bg-gray-700/50 text-gray-400 text-xs font-medium rounded">
                                일반
                            </span>
                        )}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                        </span>
                    </div>

                    <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isPinned ? 'text-blue-100 group-hover:text-white' : 'text-gray-200 group-hover:text-white'
                        }`}>
                        {item.title}
                    </h3>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.author.koreanName || item.author.name || '관리자'}
                        </span>
                        <span className="text-xs text-blue-400/0 group-hover:text-blue-400 transition-all transform translate-x-2 group-hover:translate-x-0 flex items-center gap-1">
                            자세히 보기 <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );

    return (
        <ContentPageLayout
            title="공지사항"
            subtitle="학교의 주요 소식과 공지사항을 확인하세요."
            heroImageUrl="/images/event1.jpg"
            heroImageAlt="Announcements"
            subNav={newsSubNav}
        >
            <div className="max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="mb-12 relative max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="제목이나 내용으로 검색하세요..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-11 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-lg backdrop-blur-sm"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Important Notices (Pinned) - 4 cols */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                            <Megaphone className="w-5 h-5 text-blue-400" />
                            <h2 className="text-xl font-bold text-white">중요 공지</h2>
                        </div>

                        {loadingPinned ? (
                            <div className="space-y-4">
                                {[1, 2].map(i => (
                                    <div key={i} className="h-40 bg-gray-800/50 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : pinned.length > 0 ? (
                            <div className="space-y-4">
                                {pinned.map(item => (
                                    <AnnouncementCard key={item.id} item={item} isPinned={true} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50 border-dashed">
                                <p className="text-gray-500 text-sm">중요 공지가 없습니다.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: General News (Unpinned) - 8 cols */}
                    <div className="lg:col-span-8 space-y-6" id="general-news">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <h2 className="text-xl font-bold text-white">일반 소식</h2>
                        </div>

                        {loadingGeneral ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-40 bg-gray-800/50 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : general.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {general.map(item => (
                                        <AnnouncementCard key={item.id} item={item} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <div className="mt-12 flex justify-center gap-2">
                                        <button
                                            className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                            disabled={pagination.page <= 1}
                                            onClick={() => handlePageChange(pagination.page - 1)}
                                        >
                                            이전
                                        </button>
                                        <div className="flex gap-1">
                                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${pagination.page === pageNum
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                            disabled={pagination.page >= pagination.totalPages}
                                            onClick={() => handlePageChange(pagination.page + 1)}
                                        >
                                            다음
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20 bg-gray-800/30 rounded-xl border border-gray-700/50">
                                <p className="text-gray-400">등록된 소식이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ContentPageLayout>
    );
}
