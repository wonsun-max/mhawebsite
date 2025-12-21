'use client'
import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Search, X, Upload, User, Mail, CheckCircle, XCircle, Filter } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// 부서 카테고리
const DEPARTMENTS = [
  { value: 'all', label: '전체' },
  { value: '학교장', label: '학교장' },
  { value: '교목실', label: '교목실' },
  { value: '초등', label: '초등' },
  { value: '중등', label: '중등' },
  { value: '행정실', label: '행정실' },
  { value: '도서관', label: '도서관' },
  { value: '생활관', label: '생활관' },
  { value: '보건실', label: '보건실' }
];

// 역할 카테고리
const ROLES = [
  '교장',
  '교감',
  '교목',
  '담임교사',
  '교과교사',
  '행정실장',
  '행정직원',
  '사서',
  '사감',
  '보건교사',
  '기타'
];

export default function AdminMissionariesPage() {
  const [missionaries, setMissionaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    koreanName: "",
    role: "교사",
    description: "",
    imageUrl: "",
    email: "",
    isActive: true,
    order: 0
  });

  useEffect(() => {
    fetchMissionaries();
  }, []);

  const fetchMissionaries = async () => {
    try {
      const res = await fetch("/api/missionaries", { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setMissionaries(data.data.missionaries);
      }
    } catch (error) {
      console.error("Error fetching missionaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `/api/missionaries/${editingId}`
        : "/api/missionaries";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchMissionaries();
        setIsModalOpen(false);
        resetForm();
        alert(editingId ? "수정되었습니다." : "추가되었습니다.");
      }
    } catch (error) {
      console.error("Error saving missionary:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const deleteMissionary = async (id: string) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/missionaries/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchMissionaries();
        alert("삭제되었습니다.");
      }
    } catch (error) {
      console.error("Error deleting missionary:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const openEditModal = (missionary: any) => {
    setEditingId(missionary.id);
    setFormData({
      name: missionary.name,
      koreanName: missionary.koreanName || "",
      role: missionary.role,
      description: missionary.description,
      imageUrl: missionary.imageUrl || "",
      email: missionary.email || "",
      isActive: missionary.isActive,
      order: missionary.order
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      koreanName: "",
      role: "교사",
      description: "",
      imageUrl: "",
      email: "",
      isActive: true,
      order: 0
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('JPG, PNG, GIF, WEBP 파일만 업로드 가능합니다.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('bucket', 'missionaries');

      const res = await fetch('/api/missionaries/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (res.ok && data.imageUrl) {
        setFormData({ ...formData, imageUrl: data.imageUrl });
      } else {
        alert('이미지 업로드 실패: ' + (data.error || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };


  const filteredMissionaries = missionaries.filter(m => {
    // Search filter
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.koreanName && m.koreanName.includes(searchTerm)) ||
      m.role.includes(searchTerm);

    // Department filter
    const matchesDepartment = departmentFilter === 'all' || m.description === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">MK선교사 관리</h1>
          <p className="text-gray-400">학교를 섬기시는 선교사님들을 관리합니다.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-105 font-medium"
        >
          <Plus className="w-5 h-5" />
          선교사 추가
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="이름, 역할 등으로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Department Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-gray-400">
          <Filter className="w-5 h-5" />
          <span className="font-medium">부서:</span>
        </div>
        {DEPARTMENTS.map(dept => (
          <button
            key={dept.value}
            onClick={() => setDepartmentFilter(dept.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${departmentFilter === dept.value
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
          >
            {dept.label}
            {dept.value !== 'all' && (
              <span className="ml-2 text-xs opacity-75">
                ({missionaries.filter(m => m.description === dept.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl h-80 animate-pulse" />
          ))}
        </div>
      ) : filteredMissionaries.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-gray-800/50 rounded-2xl border border-gray-700 border-dashed">
          <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">등록된 선교사님이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredMissionaries.map((m) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={m.id}
                className="group bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Image Area */}
                <div className="relative h-64 bg-gray-900 overflow-hidden">
                  {m.imageUrl ? (
                    <Image
                      src={m.imageUrl}
                      alt={m.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                      <User className="w-20 h-20" />
                    </div>
                  )}

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                    <button
                      onClick={() => openEditModal(m)}
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-transform hover:scale-110 shadow-lg"
                      title="수정"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteMissionary(m.id)}
                      className="p-3 bg-red-600 text-white rounded-full hover:bg-red-500 transition-transform hover:scale-110 shadow-lg"
                      title="삭제"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${m.isActive
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                      {m.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{m.koreanName}</h3>
                      <p className="text-sm text-gray-400 font-medium">{m.name}</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-lg font-medium border border-blue-500/20">
                      {m.role}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                    {m.description}
                  </p>

                  <div className="pt-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="truncate max-w-[120px]">{m.email || '-'}</span>
                    </div>
                    <div className="text-xs bg-gray-700 px-2 py-1 rounded">
                      순서: {m.order}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl"
            >
              <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 z-10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {editingId ? <Edit className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-blue-400" />}
                  {editingId ? "선교사 정보 수정" : "새 선교사 추가"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">한글 이름 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formData.koreanName}
                      onChange={(e) => setFormData({ ...formData, koreanName: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">영문 이름 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Hong Gil Dong"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department Select */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">부서 <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                        required
                      >
                        <option value="" disabled>부서를 선택하세요</option>
                        {DEPARTMENTS.filter(d => d.value !== 'all').map(dept => (
                          <option key={dept.value} value={dept.value}>{dept.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Role Select */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">직책/역할 <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                        required
                      >
                        <option value="" disabled>직책을 선택하세요</option>
                        {ROLES.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">이미지</label>

                  {/* Upload Button */}
                  <div className="flex gap-2">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                        <Upload className="w-5 h-5" />
                        <span>{uploading ? '업로드 중...' : '이미지 업로드'}</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* OR Divider */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-800 text-gray-400">또는 URL 입력</span>
                    </div>
                  </div>

                  {/* URL Input */}
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="https://..."
                  />

                  {/* Image Preview */}
                  {formData.imageUrl && (
                    <div className="mt-2 relative w-full h-40 bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
                      <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>


                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">이메일</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="example@mha.edu.ph"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-300">활동 상태</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-300">표시 순서</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-20 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-center focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 font-medium transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                  >
                    {editingId ? "수정 완료" : "추가하기"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
