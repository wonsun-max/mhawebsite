'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ContentPageLayout from '@/components/ContentPageLayout';
import { motion } from 'framer-motion';
import { Loader2, Send, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewFreeBoardPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [anonymousNickname, setAnonymousNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === 'loading') {
    return (
      <ContentPageLayout
        title="새 글 작성"
        subtitle="자유게시판에 새로운 글을 작성합니다."
        heroImageUrl="/images/campus3.jpg"
        heroImageAlt="New Post"
      >
        <div className="min-h-[400px] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin mr-2" />
          세션 로딩 중...
        </div>
      </ContentPageLayout>
    );
  }

  if (!session) {
    return (
      <ContentPageLayout
        title="새 글 작성"
        subtitle="자유게시판에 새로운 글을 작성합니다."
        heroImageUrl="/images/campus3.jpg"
        heroImageAlt="New Post"
      >
        <motion.div
          className="bg-red-900 rounded-2xl p-6 mb-8 flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-2 text-white">접근 권한 없음</h3>
            <p className="text-gray-300 mb-3">
              로그인한 사용자만 글을 작성할 수 있습니다.
            </p>
            <Link href="/api/auth/signin">
              <button className="px-6 py-2 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-colors text-white">
                로그인하기
              </button>
            </Link>
          </div>
        </motion.div>
      </ContentPageLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    if (isAnonymous && (!anonymousNickname || anonymousNickname.trim() === '')) {
      setError('익명으로 게시하려면 닉네임을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/posts', { // This will be the new API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, category: 'FREE_BOARD', isAnonymous, anonymousNickname }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '게시글 작성에 실패했습니다.');
      }

      router.push('/news/board'); // Redirect to the board page on success
    } catch (err: any) {
      console.error('Error creating post:', err);
      setError(err.message || '게시글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContentPageLayout
      title="새 글 작성"
      subtitle="자유게시판에 새로운 글을 작성합니다."
      heroImageUrl="/images/campus3.jpg"
      heroImageAlt="New Post"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-300 text-lg font-semibold mb-2">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-300 text-lg font-semibold mb-2">
            내용
          </label>
          <textarea
            id="content"
            rows={10}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="isAnonymous"
            className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            disabled={isSubmitting}
          />
          <label htmlFor="isAnonymous" className="ml-2 text-gray-300">
            익명으로 게시
          </label>
        </div>

        {isAnonymous && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="anonymousNickname" className="block text-gray-300 text-lg font-semibold mb-2">
              익명 닉네임
            </label>
            <input
              type="text"
              id="anonymousNickname"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="익명 닉네임을 입력하세요"
              value={anonymousNickname}
              onChange={(e) => setAnonymousNickname(e.target.value)}
              disabled={isSubmitting}
            />
          </motion.div>
        )}

        {error && (
          <motion.div
            className="bg-red-700 text-white p-4 rounded-lg mb-6 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <XCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        <div className="flex justify-end gap-4">
          <Link href="/news/board">
            <button
              type="button"
              className="px-6 py-3 bg-gray-600 rounded-full font-semibold hover:bg-gray-700 transition-colors text-white"
              disabled={isSubmitting}
            >
              취소
            </button>
          </Link>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                작성 중...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                작성 완료
              </>
            )}
          </button>
        </div>
      </motion.form>
    </ContentPageLayout>
  );
}
