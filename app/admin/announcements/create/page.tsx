'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function CreateAnnouncementPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        setSaving(true);

        try {
            const res = await fetch('/api/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                    isPinned
                }),
            });

            const data = await res.json();

            if (data.success) {
                alert('공지사항이 등록되었습니다.');
                router.push('/admin/announcements');
            } else {
                alert('등록 실패: ' + data.error);
            }
        } catch (error) {
            console.error('Error creating announcement:', error);
            alert('공지사항 등록 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
                <ArrowLeft className="w-5 h-5" />
                뒤로 가기
            </button>

            <h1 className="text-3xl font-bold text-white mb-8">새 공지사항 작성</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-white font-semibold mb-2">
                        제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="공지사항 제목을 입력하세요"
                        required
                    />
                </div>

                {/* Is Pinned */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="isPinned"
                        checked={isPinned}
                        onChange={(e) => setIsPinned(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                    />
                    <label htmlFor="isPinned" className="text-white font-medium cursor-pointer select-none">
                        상단 고정 공지로 등록
                    </label>
                </div>

                {/* Content */}
                <div>
                    <label className="block text-white font-semibold mb-2">
                        내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors min-h-[400px] resize-y"
                        placeholder="공지사항 내용을 입력하세요"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                저장 중...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                공지사항 등록
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
