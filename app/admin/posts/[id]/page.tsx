'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Pin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EditPostPage() {
    const params = useParams();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (params?.id) {
            fetchPost(params.id as string);
        }
    }, [params?.id]);

    const fetchPost = async (id: string) => {
        try {
            const res = await fetch(`/api/posts/${id}`);
            const data = await res.json();

            if (data.success) {
                setTitle(data.data.title);
                setContent(data.data.content);
                setIsPinned(data.data.isPinned);
            } else {
                alert('게시글을 찾을 수 없습니다.');
                router.push('/admin/posts');
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            alert('게시글 로딩 실패');
            router.push('/admin/posts');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        setSaving(true);

        try {
            const res = await fetch(`/api/posts/${params?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                    isPinned
                }),
            });

            const data = await res.json();

            if (data.success) {
                alert('게시글이 수정되었습니다.');
                router.push('/admin/posts');
            } else {
                alert('수정 실패: ' + data.error);
            }
        } catch (error) {
            console.error('Error updating post:', error);
            alert('게시글 수정 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
                <div className="w-16 h-16 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
                <p className="text-gray-400 font-medium">게시글 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                뒤로 가기
            </motion.button>

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
            >
                게시글 수정
            </motion.h1>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Title */}
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl pointer-events-none"></div>

                    <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                        제목 <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="relative w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="게시글 제목을 입력하세요"
                        required
                    />
                </div>

                {/* Is Pinned */}
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={isPinned}
                            onChange={(e) => setIsPinned(e.target.checked)}
                            className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 transition-all"
                        />
                        <div className="flex items-center gap-2">
                            <Pin className={`w-4 h-4 transition-colors ${isPinned ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
                            <span className={`font-medium transition-colors ${isPinned ? 'text-white' : 'text-gray-300'}`}>
                                상단 고정 게시글로 등록
                            </span>
                        </div>
                    </label>
                </div>

                {/* Content */}
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent blur-2xl pointer-events-none"></div>

                    <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                        내용 <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="relative w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all min-h-[400px] resize-y"
                        placeholder="게시글 내용을 입력하세요"
                        required
                    />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-xl font-semibold transition-all"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B4941F] hover:shadow-lg hover:shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 overflow-hidden group"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="relative">저장 중...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                <span className="relative">수정사항 저장</span>
                            </>
                        )}
                    </button>
                </div>
            </motion.form>
        </div>
    );
}
