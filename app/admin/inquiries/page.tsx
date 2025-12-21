'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Search, Mail, Phone, MessageCircle, Calendar, CheckCircle, Trash2, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    kakaoId?: string;
    message: string;
    status: string;
    category?: string;
    createdAt: string;
}

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await fetch('/api/inquiries');
            const data = await res.json();
            if (data.success) {
                setInquiries(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch inquiries', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/inquiries/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();

            if (data.success) {
                // Update local list
                setInquiries(prev => prev.map(inq =>
                    inq.id === id ? { ...inq, status: newStatus } : inq
                ));
                // If the currently selected inquiry is the one being updated, update it too
                if (selectedInquiry && selectedInquiry.id === id) {
                    setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                }
                // Close modal if marking as read/confirmed
                if (newStatus === 'READ') {
                    setSelectedInquiry(null);
                }
            } else {
                alert(data.message || '상태 변경 실패');
            }
        } catch (error) {
            console.error('Failed to update status', error);
            alert('오류가 발생했습니다.');
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">입학 상담 문의</h1>
                    <p className="text-gray-500 mt-2">학부모님들이 남기신 문의 내역입니다.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">구분</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">이름</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">연락처</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">문의 내용</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">날짜</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {inquiries.map((inquiry) => (
                                <tr
                                    key={inquiry.id}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => setSelectedInquiry(inquiry)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${inquiry.status === 'UNREAD' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
                    `}>
                                            {inquiry.status === 'UNREAD' ? '미확인' : '확인됨'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${inquiry.category === 'ADMISSION' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {inquiry.category === 'ADMISSION' ? '입학상담' : '일반문의'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        {inquiry.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {inquiry.email}</span>
                                            {inquiry.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {inquiry.phone}</span>}
                                            {inquiry.kakaoId && <span className="flex items-center gap-1 text-yellow-600"><MessageCircle className="w-3 h-3" /> {inquiry.kakaoId}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                        {inquiry.message}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(inquiry.createdAt), 'yyyy-MM-dd HH:mm')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900">보기</button>
                                    </td>
                                </tr>
                            ))}
                            {inquiries.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        문의 내역이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedInquiry && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="text-xl font-bold text-gray-900">문의 상세 내용</h3>
                                <button
                                    onClick={() => setSelectedInquiry(null)}
                                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">보낸 분</label>
                                        <p className="text-lg font-medium text-gray-900">{selectedInquiry.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">작성일</label>
                                        <p className="text-gray-700">{format(new Date(selectedInquiry.createdAt), 'yyyy년 M월 d일 a h:mm', { locale: ko })}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700">{selectedInquiry.email}</span>
                                    </div>
                                    {selectedInquiry.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 text-gray-400" />
                                            <span className="text-gray-700">{selectedInquiry.phone}</span>
                                        </div>
                                    )}
                                    {selectedInquiry.kakaoId && (
                                        <div className="flex items-center gap-3">
                                            <MessageCircle className="w-5 h-5 text-yellow-500" />
                                            <span className="text-gray-900 font-medium">카카오톡: {selectedInquiry.kakaoId}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">문의 내용</label>
                                    <div className="bg-white border border-gray-200 rounded-xl p-4 min-h-[150px] text-gray-800 leading-relaxed whitespace-pre-wrap">
                                        {selectedInquiry.message}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedInquiry(null)}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                                >
                                    닫기
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(selectedInquiry.id, 'READ')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    확인 완료 처리
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
