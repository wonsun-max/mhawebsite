'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, MessageCircle } from 'lucide-react';

interface InquiryFormProps {
    category?: 'GENERAL' | 'ADMISSION';
    title?: string;
    subtitle?: string;
}

export default function InquiryForm({ category = 'GENERAL', title = "Send us a Message", subtitle = "입학 관련 문의사항을 남겨주시면 친절히 답변해 드리겠습니다." }: InquiryFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        kakaoId: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, category })
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', kakaoId: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-[400px] text-center"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">문의가 접수되었습니다!</h4>
                <p className="text-gray-600 max-w-xs mx-auto">
                    담당자가 확인 후 기재해주신 연락처로 빠른 시일 내에 연락드리겠습니다.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                >
                    다른 문의하기
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]" />
            <h3 className="text-2xl font-bold text-[#0A1929] mb-2">{title}</h3>
            <p className="text-gray-500 mb-8">{subtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">이름 (Name) *</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                            placeholder="홍길동"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">연락처 (Phone)</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                            placeholder="010-1234-5678"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일 (Email) *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        placeholder="example@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-yellow-900" />
                        카카오톡 ID (KakaoTalk)
                    </label>
                    <input
                        type="text"
                        value={formData.kakaoId}
                        onChange={(e) => setFormData({ ...formData, kakaoId: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-yellow-200 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all bg-yellow-50/50 focus:bg-white"
                        placeholder="카카오톡 아이디를 입력해주세요"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">문의 내용 (Message) *</label>
                    <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                        placeholder="궁금하신 내용을 자유롭게 적어주세요."
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 bg-[#0A1929] text-white rounded-xl font-bold text-lg hover:bg-black transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {status === 'submitting' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            전송 중...
                        </>
                    ) : (
                        <>
                            {category === 'ADMISSION' ? '입학 상담 신청하기' : '문의하기'}
                            <Send className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
