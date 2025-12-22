'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import ContentPageLayout from '@/components/ContentPageLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MessageCircle,
  User,
  Edit,
  Lock,
  Loader2,
  Search,
  ThumbsUp,
  Pin,
  Eye,
  TrendingUp,
  Filter,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name?: string | null;
    koreanName?: string | null;
    image?: string | null;
  };
  anonymousNickname?: string | null;
  createdAt: string;
  comments: any[];
  views: number;
  isPinned: boolean;
  _count?: {
    reactions: number;
  };
  reactions?: Array<{ userId: string }>;
}

// Community Rules Component
function CommunityRules() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8 bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-2 text-white font-bold">
          <Lock className="w-5 h-5 text-blue-400" />
          <span>자유게시판 이용 규칙</span>
        </div>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <Filter className="w-4 h-4 text-gray-400" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 pt-0 text-gray-300 text-sm space-y-2 border-t border-gray-700/50">
              <p>1. <strong>상호 존중:</strong> 비방, 욕설, 인신공격 등 타인을 불쾌하게 하는 언행은 금지됩니다.</p>
              <p>2. <strong>익명성 보장:</strong> 익명 게시글 작성 시 닉네임을 설정할 수 있으며, 작성자의 신원은 보호됩니다.</p>
              <p>3. <strong>스팸 금지:</strong> 도배, 광고, 불법적인 홍보 게시물은 통보 없이 삭제될 수 있습니다.</p>
              <p>4. <strong>저작권 준수:</strong> 타인의 저작물을 무단으로 게시하거나 배포하지 마십시오.</p>
              <p>5. <strong>신고 기능:</strong> 부적절한 게시물은 관리자에게 신고될 수 있으며, 검토 후 조치됩니다.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BoardPage() {
  return (
    <ContentPageLayout
      title="자유게시판"
      subtitle="학생들이 자유롭게 소통하는 공간입니다"
      heroImageUrl="/images/campus3.jpg"
      heroImageAlt="Free Board"
    >
      <Suspense fallback={<div className="text-center text-white py-20">로딩 중...</div>}>
        <BoardContent />
      </Suspense>
    </ContentPageLayout>
  );
}

function BoardContent() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const limit = 15;

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || '';
    setCurrentPage(page);
    setSearchQuery(search);
    setSearchInput(search);
  }, [searchParams]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: limit.toString(),
        });
        if (searchQuery) {
          queryParams.append('search', searchQuery);
        }

        const res = await fetch(`/api/posts/free-board?${queryParams}`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (err: any) {
        console.error('Failed to fetch posts:', err);
        setError(err.message || '게시물을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('page', '1');
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    }
    router.push(`/news/board?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    router.push(`/news/board?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchInput('');
    router.push('/news/board');
  };

  // Separate pinned and regular posts
  const pinnedPosts = posts.filter((p) => p.isPinned);
  const regularPosts = posts.filter((p) => !p.isPinned);

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-blue-500" />
        <p className="text-lg">게시물을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500 rounded-2xl p-8 text-center">
          <p className="text-red-400 text-lg">오류: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Community Rules */}
      <CommunityRules />

      {/* Search Bar */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="게시글 검색..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 rounded-2xl font-semibold hover:bg-blue-700 transition-all hover:scale-105 text-white shadow-lg shadow-blue-500/20"
          >
            검색
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-6 py-4 bg-gray-700 rounded-2xl font-semibold hover:bg-gray-600 transition-all text-white"
            >
              초기화
            </button>
          )}
        </form>
      </motion.div>

      {/* Login Notice or Write Button */}
      {!isLoggedIn ? (
        <motion.div
          className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm rounded-2xl p-6 mb-8 flex items-start gap-4 border border-blue-500/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Lock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 text-white">로그인하여 참여하세요</h3>
            <p className="text-gray-300 mb-3">
              학교 구성원만 글을 작성하고 댓글을 달 수 있습니다.
            </p>
            <Link href="/auth/login">
              <button className="px-6 py-2 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-all hover:scale-105 text-white shadow-lg shadow-blue-500/20">
                로그인하기
              </button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-3">
            <Link href="/news/board/new">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 flex items-center gap-2 text-white shadow-lg shadow-blue-500/20">
                <Edit className="w-5 h-5" />
                글쓰기
              </button>
            </Link>
          </div>
          {searchQuery && (
            <p className="text-gray-400">
              '<span className="text-white font-semibold">{searchQuery}</span>' 검색 결과
            </p>
          )}
        </div>
      )}

      {isLoggedIn && (
        <>
          {/* Pinned Posts */}
          {pinnedPosts.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Pin className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-bold text-white">공지 및 고정글</h2>
              </div>
              <div className="space-y-3">
                {pinnedPosts.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} isPinned />
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.length > 0 ? (
            <div className="space-y-3">
              {regularPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i + pinnedPosts.length} />
              ))}
            </div>
          ) : (
            <div className="min-h-[200px] flex flex-col items-center justify-center text-gray-400">
              <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">
                {searchQuery ? '검색 결과가 없습니다.' : '게시물이 없습니다.'}
              </p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="mt-4 px-6 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-all text-white"
                >
                  전체보기
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="mt-12 flex justify-center gap-2 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-5 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
              >
                이전
              </button>
              {[...Array(Math.min(totalPages, 10))].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === pageNum
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
              >
                다음
              </button>
            </motion.div>
          )}
        </>
      )}
    </>
  );
}

// Modern Post Card Component (Title Only View)
function PostCard({ post, index, isPinned = false }: { post: Post; index: number; isPinned?: boolean }) {
  const { data: session } = useSession();
  const hasReacted = post.reactions?.some((r) => r.userId === session?.user?.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Link href={`/news/board/${post.id}`}>
        <div
          className={`group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${isPinned
            ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/10'
            : 'border-gray-700/50 hover:border-blue-500/50'
            }`}
        >
          {/* Pin Badge */}
          {isPinned && (
            <div className="absolute top-4 right-4">
              <div className="bg-yellow-500/20 border border-yellow-500 rounded-full px-3 py-1 flex items-center gap-1">
                <Pin className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-semibold text-yellow-500">고정</span>
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2 pr-20">
            {post.title}
          </h3>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{post.anonymousNickname || post.author?.koreanName || post.author?.name || '알 수 없음'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ThumbsUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${hasReacted ? 'fill-blue-500 text-blue-500' : ''}`} />
              <span>{post._count?.reactions || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{post.comments.length}</span>
            </div>
          </div>

          {/* Hover Indicator - Only on desktop */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


