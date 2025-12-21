'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ContentPageLayout from '@/components/ContentPageLayout';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, User, Eye, Loader2, XCircle, Lock, X, Save, Edit, Trash2, Send, Heart } from 'lucide-react';
import Link from 'next/link';

interface Author {
  id: string;
  name?: string | null;
  koreanName?: string | null;
  image?: string | null;
}

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  author: Author;
  likeCount: number;
  isLiked: boolean;
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  views: number;
  author: Author;
  anonymousNickname?: string | null;
  comments: Comment[];
}

export default function PostDetailPage() {
  const params = useParams();
  const id = params?.id as string; // Get id from params
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Comment state
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  // Like state
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // Fetch likes
  useEffect(() => {
    if (!id) return;
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/posts/${id}/reactions`);
        const data = await res.json();
        if (data.success) {
          setLikeCount(data.count);
          setIsLiked(data.isLiked);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
    fetchLikes();
  }, [id, isLoggedIn]);

  const handleLikeToggle = async () => {
    if (!isLoggedIn) {
      if (confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?')) {
        router.push('/auth/login');
      }
      return;
    }

    // Optimistic update
    const prevIsLiked = isLiked;
    const prevCount = likeCount;

    setIsLiked(!prevIsLiked);
    setLikeCount(prevIsLiked ? prevCount - 1 : prevCount + 1);
    setIsLikeLoading(true);

    try {
      const res = await fetch(`/api/posts/${id}/reactions`, { method: 'POST' });
      const data = await res.json();

      if (!data.success) {
        // Revert on error
        setIsLiked(prevIsLiked);
        setLikeCount(prevCount);
        alert('오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      setIsLiked(prevIsLiked);
      setLikeCount(prevCount);
    } finally {
      setIsLikeLoading(false);
    }
  };

  // Check if user can modify this post
  const userCanModifyPost = post && session?.user && (
    session.user.role === 'ADMIN' || (post.author && session.user.id === post.author.id)
  );

  useEffect(() => {
    if (status === 'loading' || !id) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            setLoading(false);
            return;
          }
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const responseData = await res.json();
        if (responseData.success) {
          setPost(responseData.data);
          setEditedTitle(responseData.data.title);
          setEditedContent(responseData.data.content);
        } else {
          throw new Error(responseData.error || '게시물을 불러오는데 실패했습니다.');
        }
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError(err.message || '게시물을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id, isLoggedIn, status]);

  const handleEditSave = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      setEditError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSaving(true);
    setEditError(null);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '게시글 수정에 실패했습니다.');
      }

      const responseData = await res.json();
      if (!responseData.success) {
        throw new Error(responseData.error || '게시글 수정에 실패했습니다.');
      }

      const updatedPost = responseData.data;
      setPost(updatedPost);
      setIsEditing(false);
      setEditError(null);
    } catch (err: any) {
      console.error('Error updating post:', err);
      setEditError(err.message || '게시글 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '게시글 삭제에 실패했습니다.');
      }

      router.push('/news/board');
    } catch (err: any) {
      console.error('Error deleting post:', err);
      alert(err.message || '게시글 삭제에 실패했습니다.');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCommentText.trim()) {
      setCommentError('댓글 내용을 입력해주세요.');
      return;
    }

    setIsSubmittingComment(true);
    setCommentError(null);

    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newCommentText,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '댓글 등록에 실패했습니다.');
      }

      const responseData = await res.json();

      if (!responseData.success) {
        throw new Error(responseData.error || '댓글 등록에 실패했습니다.');
      }

      const newComment = responseData.data;

      if (post) {
        setPost({
          ...post,
          comments: [newComment, ...post.comments],
        });
      }

      setNewCommentText('');
      setCommentError(null);
    } catch (err: any) {
      console.error('Error submitting comment:', err);
      setCommentError(err.message || '댓글 등록에 실패했습니다.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <ContentPageLayout
        title="게시글 상세"
        subtitle="게시글 내용을 확인합니다."
        heroImageUrl="/images/campus3.jpg"
        heroImageAlt="Post Detail"
      >
        <div className="min-h-[400px] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin mr-2" />
          게시글을 불러오는 중...
        </div>
      </ContentPageLayout>
    );
  }

  if (!isLoggedIn) {
    return (
      <ContentPageLayout
        title="게시글 상세"
        subtitle="게시글 내용을 확인합니다."
        heroImageUrl="/images/campus3.jpg"
        heroImageAlt="Post Detail"
      >
        <motion.div
          className="bg-blue-900 rounded-2xl p-6 mb-8 flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Lock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-2 text-white">로그인이 필요합니다</h3>
            <p className="text-gray-300 mb-3">
              게시글을 보려면 로그인해야 합니다.
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

  if (error) {
    return (
      <ContentPageLayout
        title="게시글 상세"
        subtitle="게시글 내용을 확인합니다."
        heroImageUrl="/images/campus3.jpg"
        heroImageAlt="Post Detail"
      >
        <div className="min-h-[400px] flex items-center justify-center text-red-500">
          <p>오류: {error}</p>
        </div>
      </ContentPageLayout>
    );
  }

  if (!post) {
    return (
      <ContentPageLayout
        title="게시글 상세"
        subtitle="게시글 내용을 확인합니다."
        heroImageUrl="/images/campus3.jpg"
        heroImageAlt="Post Detail"
      >
        <div className="min-h-[400px] flex items-center justify-center text-gray-400">
          <p>게시글을 찾을 수 없습니다.</p>
        </div>
      </ContentPageLayout>
    );
  }

  return (
    <ContentPageLayout
      title="게시글 상세"
      subtitle="게시글 내용을 확인합니다."
      heroImageUrl="/images/campus3.jpg"
      heroImageAlt="Post Detail"
    >
      <div className="bg-gray-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
        {isEditing ? (
          <>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-3xl font-bold mb-4"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              disabled={isSaving}
            />
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author?.koreanName || post.author?.name || '알 수 없음'}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                조회 {post.views}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                댓글 {post.comments.length}
              </div>
            </div>
            <textarea
              rows={15}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y mb-8"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              disabled={isSaving}
            ></textarea>
            {editError && (
              <motion.div
                className="bg-red-700 text-white p-3 rounded-lg mb-4 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <XCircle className="w-4 h-4" />
                {editError}
              </motion.div>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-600 rounded-full font-semibold hover:bg-gray-700 transition-colors text-white"
                disabled={isSaving}
              >
                <X className="w-5 h-5 mr-2" />
                취소
              </button>
              <button
                onClick={handleEditSave}
                className="px-6 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    저장
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-white">{post.title}</h1>
              {userCanModifyPost && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                    title="게시글 수정"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="p-2 rounded-full bg-red-700 hover:bg-red-600 transition-colors text-white"
                    title="게시글 삭제"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.anonymousNickname || post.author?.koreanName || post.author?.name || '알 수 없음'}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                조회 {post.views}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                댓글 {post.comments?.length || 0}
              </div>
            </div>

            {/* Like Button Section */}
            <div className="flex justify-center mb-8">
              <button
                onClick={handleLikeToggle}
                disabled={isLikeLoading || !isLoggedIn}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
                  ${isLiked
                    ? 'bg-pink-500/20 text-pink-500 border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-transparent'}
                `}
              >
                <Heart
                  className={`w-6 h-6 ${isLiked ? 'fill-current animate-heartbeat' : ''}`}
                />
                <span className="font-bold text-lg">{likeCount}</span>
                <span className="text-sm font-medium">{isLiked ? 'Liked' : 'Like'}</span>
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed mb-8 whitespace-pre-wrap">
              {post.content}
            </div>

            <div className="border-t border-gray-700 pt-6 mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">댓글 ({post.comments?.length || 0})</h2>
              {(!post.comments || post.comments.length === 0) ? (
                <p className="text-gray-400">아직 댓글이 없습니다. 첫 댓글을 남겨주세요!</p>
              ) : (
                <div className="space-y-4">
                  {post.comments?.map((comment) => (
                    <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-white">{comment.author?.koreanName || comment.author?.name || '알 수 없음'}</span>
                          <span className="text-sm text-gray-400">{new Date(comment.createdAt).toLocaleDateString('ko-KR')}</span>
                        </div>
                        <button
                          onClick={() => handleCommentLikeToggle(comment.id)}
                          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${comment.isLiked
                            ? 'text-pink-400 bg-pink-400/10 hover:bg-pink-400/20'
                            : 'text-gray-400 hover:text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                          <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                          <span>{comment.likeCount}</span>
                        </button>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {isLoggedIn && (
                <motion.form
                  onSubmit={handleCommentSubmit}
                  className="mt-8 bg-gray-700 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold mb-4 text-white">댓글 작성</h3>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y mb-4"
                    rows={4}
                    placeholder="댓글을 입력하세요..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    disabled={isSubmittingComment}
                  ></textarea>
                  {commentError && (
                    <motion.div
                      className="bg-red-700 text-white p-3 rounded-lg mb-4 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <XCircle className="w-4 h-4" />
                      {commentError}
                    </motion.div>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmittingComment}
                    >
                      {isSubmittingComment ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          등록 중...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          댓글 등록
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <Link href="/news/board">
                <button className="px-6 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-colors text-white">
                  목록으로 돌아가기
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </ContentPageLayout>
  );
}
