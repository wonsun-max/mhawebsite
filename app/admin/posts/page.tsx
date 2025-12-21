'use client'
import { useState, useEffect, useCallback } from "react";
import { Edit, Trash2, Plus, Pin } from "lucide-react";
import Link from "next/link";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("FREE_BOARD");

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts?category=${category}&limit=50`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchPosts();
  }, [category, fetchPosts]);

  const deletePost = async (id: string) => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
        alert("게시글이 삭제되었습니다.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const togglePin = async (id: string, currentPinned: boolean) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned: !currentPinned }),
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">자유게시판 관리</h1>
        <Link href="/admin/posts/new">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            새 게시글
          </button>
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-gray-400">게시글이 없습니다.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-white">제목</th>
                <th className="px-6 py-3 text-left text-white">작성자</th>
                <th className="px-6 py-3 text-left text-white">작성일</th>
                <th className="px-6 py-3 text-left text-white">조회수</th>
                <th className="px-6 py-3 text-center text-white">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {post.isPinned && (
                        <Pin className="w-4 h-4 text-blue-400" />
                      )}
                      <span className="text-white">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {post.author.name || post.author.koreanName}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{post.views}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => togglePin(post.id, post.isPinned)}
                        className={`p-2 rounded-lg transition-colors ${post.isPinned
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                          }`}
                        title={post.isPinned ? "고정 해제" : "고정하기"}
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                      <Link href={`/admin/posts/${post.id}`}>
                        <button className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
