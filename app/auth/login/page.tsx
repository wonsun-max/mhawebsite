"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "signup_success") {
      setSuccessMessage("회원가입이 완료되었습니다. 관리자 승인 후 로그인하실 수 있습니다.");
    } else if (message === "password_reset_success") {
      setSuccessMessage("비밀번호가 성공적으로 변경되었습니다. 새 비밀번호로 로그인해주세요.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">로그인</h1>
            <p className="text-gray-400">MHA 학교 포털에 오신 것을 환영합니다</p>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm"
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="이메일을 입력하세요 (예: user@mha.ac.kr)"
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 flex justify-between text-sm">
            <a
              href="/auth/forgot-password"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              비밀번호 찾기
            </a>
            <a
              href="/auth/signup"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              회원가입
            </a>
          </div>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800/50 text-gray-400">
                로그인 후 이용 가능
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
            <p className="text-sm text-gray-400 text-center">
              회원가입 후 관리자 승인이 완료되면 로그인하실 수 있습니다.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"><div className="text-white">Loading...</div></div>}>
      <LoginForm />
    </Suspense>
  );
}
