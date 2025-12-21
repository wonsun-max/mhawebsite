"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  email: string;
  name?: string | null;
  koreanName?: string | null;
  role: string;
  status: string;
  grade?: number | null;
  studentName?: string | null;
  gender?: string | null;
  age?: number | null;
  birthdate?: string | null;
  createdAt: string;
  approvedAt?: string | null;
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }
    if (session.user.role !== "ADMIN") {
      router.push("/");
    }
  }, [session, status, router]);

  const fetchUsers = useCallback(async () => {
    if (!session) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (roleFilter !== "all") params.append("role", roleFilter);

      const res = await fetch(`/api/admin/users?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch users");
        return;
      }

      setUsers(data.data || []);
    } catch {
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, roleFilter, session]);

  useEffect(() => {
    if (status !== "loading" && session?.user.role === "ADMIN") {
      fetchUsers();
    }
  }, [status, session, statusFilter, roleFilter, fetchUsers]);

  const handleApprove = async (userId: string, newStatus: string, newRole?: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          role: newRole,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update user");
        return;
      }

      alert(data.data?.message || "사용자 상태가 업데이트되었습니다");
      fetchUsers();
      setShowModal(false);
    } catch {
      alert("네트워크 오류가 발생했습니다");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('정말로 이 사용자를 삭제하시겠습니까? 모든 게시물과 댓글도 함께 삭제됩니다.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "삭제에 실패했습니다");
        return;
      }

      alert("사용자가 삭제되었습니다");
      fetchUsers();
      setShowModal(false);
    } catch {
      alert("네트워크 오류가 발생했습니다");
    }
  };

  if (status === "loading" || !session || session.user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">사용자 관리</h1>
          <p className="text-gray-400">회원 승인 및 관리</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 mb-6 border border-gray-700"
        >
          <div className="flex gap-4 flex-wrap">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                상태
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
              >
                <option value="all">전체</option>
                <option value="PENDING">승인 대기</option>
                <option value="ACTIVE">활성</option>
                <option value="SUSPENDED">정지</option>
                <option value="INACTIVE">비활성</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                역할
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
              >
                <option value="all">전체</option>
                <option value="STUDENT">학생</option>
                <option value="TEACHER">교사</option>
                <option value="PARENT">학부모</option>
                <option value="ADMIN">관리자</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Users Table */}
        {loading ? (
          <div className="text-center text-white text-xl">로딩 중...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-700"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                      아이디
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                      이름
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                      이메일
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                      역할
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                      상태
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                      추가 정보
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                      가입일
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {u.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {u.koreanName || u.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{u.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === "ADMIN"
                            ? "bg-purple-500/20 text-purple-400"
                            : u.role === "TEACHER"
                              ? "bg-blue-500/20 text-blue-400"
                              : u.role === "STUDENT"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${u.status === "ACTIVE"
                            ? "bg-green-500/20 text-green-400"
                            : u.status === "PENDING"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                            }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {u.age && `${u.age}세`}
                        {u.grade && ` / ${u.grade}학년`}
                        {u.studentName && ` / 학생: ${u.studentName}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => {
                            setSelectedUser(u);
                            setShowModal(true);
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          관리
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  사용자가 없습니다
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* User Management Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-white mb-4">사용자 관리</h2>
              <div className="mb-6 space-y-2 text-gray-300">
                <p>
                  <span className="font-semibold">아이디:</span> {selectedUser.username}
                </p>
                <p>
                  <span className="font-semibold">이름:</span>{" "}
                  {selectedUser.koreanName || selectedUser.name}
                </p>
                <p>
                  <span className="font-semibold">이메일:</span> {selectedUser.email}
                </p>
                <p>
                  <span className="font-semibold">현재 역할:</span> {selectedUser.role}
                </p>
                <p>
                  <span className="font-semibold">현재 상태:</span> {selectedUser.status}
                </p>
              </div>

              <div className="space-y-3">
                {selectedUser.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedUser.id, "ACTIVE")}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => handleApprove(selectedUser.id, "INACTIVE")}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      거부
                    </button>
                  </>
                )}
                {selectedUser.status === "ACTIVE" && (
                  <button
                    onClick={() => handleApprove(selectedUser.id, "SUSPENDED")}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    정지
                  </button>
                )}
                {selectedUser.status === "SUSPENDED" && (
                  <button
                    onClick={() => handleApprove(selectedUser.id, "ACTIVE")}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    정지 해제
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedUser.id)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors border-2 border-red-800"
                >
                  🗑️ 사용자 삭제 (복구 불가)
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
