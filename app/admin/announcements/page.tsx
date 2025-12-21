'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Pin, PinOff, Calendar, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface Announcement {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    isPinned: boolean;
    views: number;
    author: {
        koreanName?: string | null;
    };
}

export default function AdminAnnouncementsPage() {
    const router = useRouter();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch('/api/announcements?limit=100');
            const data = await res.json();
            if (data.success) {
                setAnnouncements(data.data);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`"${title}" 공지사항을 삭제하시겠습니까?`)) return;

        try {
            const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
            const data = await res.json();

            if (data.success) {
                alert('공지사항이 삭제되었습니다.');
                fetchAnnouncements();
            } else {
                alert('삭제 실패: ' + data.error);
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
            alert('공지사항 삭제 중 오류가 발생했습니다.');
        }
    };

    const togglePin = async (announcement: Announcement) => {
        try {
            const res = await fetch(`/api/announcements/${announcement.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: announcement.title,
                    content: announcement.content,
                    isPinned: !announcement.isPinned
                })
            });

            const data = await res.json();
            if (data.success) {
                fetchAnnouncements();
            }
        } catch (error) {
            console.error('Error toggling pin:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">공지사항 관리</h1>
                    <p className="text-gray-400 mt-2">학교 공지사항을 관리합니다</p>
                </div>
                <button
                    onClick={() => router.push('/admin/announcements/create')}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    새 공지 작성
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : announcements.length === 0 ? (
                <div className="text-center py-20 bg-gray-800 rounded-xl">
                    <Calendar className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400 text-lg">아직 작성된 공지사항이 없습니다</p>
                    <button
                        onClick={() => router.push('/admin/announcements/create')}
                        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        첫 공지 작성하기
                    </button>
                </div>
            ) : (
                <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                    <table className="w-full">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">상태</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">제목</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">작성일</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">조회수</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {announcements.map((announcement, idx) => (
                                <motion.tr
                                    key={announcement.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-gray-700/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => togglePin(announcement)}
                                            className={`p-2 rounded-lg transition-colors ${announcement.isPinned
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                                }`}
                                            title={announcement.isPinned ? '고정 해제' : '고정'}
                                        >
                                            {announcement.isPinned ? (
                                                <Pin className="w-4 h-4" />
                                            ) : (
                                                <PinOff className="w-4 h-4" />
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {announcement.isPinned && (
                                                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-semibold">고정</span>
                                            )}
                                            <p className="text-white font-medium line-clamp-1">{announcement.title}</p>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-1 line-clamp-1">{announcement.content}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">
                                        {new Date(announcement.createdAt).toLocaleDateString('ko-KR')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <Eye className="w-4 h-4" />
                                            <span className="text-sm">{announcement.views}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => router.push(`/admin/announcements/${announcement.id}/edit`)}
                                                className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                                title="수정"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(announcement.id, announcement.title)}
                                                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                                title="삭제"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
