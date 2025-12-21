'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "ANNOUNCEMENT",
    isPinned: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("게시글이 작성되었습니다!");
        router.push("/admin/posts");
      } else {
        const data = await res.json();
        alert(data.error || "오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">새 게시글 작성</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-white mb-2">카테고리</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="ANNOUNCEMENT">공지사항</option>
              <option value="FREE_BOARD">자유게시판</option>
              <option value="GALLERY">갤러리</option>
              <option value="RESOURCES">자료실</option>
              <option value="MEAL">급식안내</option>
              <option value="SUPPORT">후원안내</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-white mb-2">제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-white mb-2">내용</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              rows={12}
              placeholder="내용을 입력하세요"
              required
            />
          </div>

          {/* Pin */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPinned"
              checked={formData.isPinned}
              onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="isPinned" className="text-white">
              상단 고정
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-600"
            >
              {loading ? "작성 중..." : "작성하기"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
