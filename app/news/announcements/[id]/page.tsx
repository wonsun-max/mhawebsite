'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ContentPageLayout from '@/components/ContentPageLayout';
import { Calendar, User, Eye, ArrowLeft, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { newsSubNav } from '@/lib/subNavConfig';

interface Announcement {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    views: number;
    author: {
        name?: string;
        koreanName?: string;
    };
}

export default function AnnouncementDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.id) {
            fetchAnnouncement(params.id as string);
        }
    }, [params?.id]);

    const fetchAnnouncement = async (id: string) => {
        try {
            const res = await fetch(`/api/announcements/${id}`);
            const data = await res.json();

            if (data.success) {
                setAnnouncement(data.data);
            } else {
                alert('공지사항을 찾을 수 없습니다.');
                router.push('/news/announcements');
            }
        } catch (error) {
            console.error('Error fetching announcement:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!announcement) return null;

    return (
        <ContentPageLayout
            title="공지사항"
            subtitle="학교의 주요 소식과 공지사항을 확인하세요."
            heroImageUrl="/images/event1.jpg"
            heroImageAlt="Announcements"
            subNav={newsSubNav}
        >
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    목록으로 돌아가기
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700"
                >
                    {/* Header */}
                    <div className="p-8 border-b border-gray-700 bg-gray-800/50">
                        <h1 className="text-3xl font-bold text-white mb-6 leading-tight">
                            {announcement.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-400" />
                                <span>{announcement.author.koreanName || announcement.author.name || '관리자'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                <span>{new Date(announcement.createdAt).toLocaleDateString('ko-KR')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span>{new Date(announcement.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="flex items-center gap-2 ml-auto">
                                <Eye className="w-4 h-4" />
                                <span>{announcement.views}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 min-h-[400px] bg-gray-800">
                        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {announcement.content}
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Buttons (Optional - can be added later) */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => router.push('/news/announcements')}
                        className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors border border-gray-700"
                    >
                        목록보기
                    </button>
                </div>
            </div>
        </ContentPageLayout>
    );
}
