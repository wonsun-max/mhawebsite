"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Mail,
    Lock,
    CheckCircle,
    ArrowRight,
    ChevronLeft,
    ShieldCheck,
    Send,
    ArrowLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ResetStep = "email" | "verify" | "password";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<ResetStep>("email");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form data
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [tempKey, setTempKey] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSendCode = async () => {
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/password/send-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "코드 전송에 실패했습니다");
                return;
            }

            setStep("verify");
        } catch {
            setError("네트워크 오류가 발생했습니다");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/password/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "코드 인증에 실패했습니다");
                return;
            }

            setTempKey(data.data.tempKey);
            setStep("password");
        } catch {
            setError("네트워크 오류가 발생했습니다");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setError("");

        // Validation
        if (newPassword.length < 8) {
            setError("비밀번호는 최소 8자 이상이어야 합니다");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/password/reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tempKey,
                    newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "비밀번호 변경에 실패했습니다");
                return;
            }

            // Success - redirect to login with message
            router.push("/auth/login?message=password_reset_success");
        } catch {
            setError("네트워크 오류가 발생했습니다");
        } finally {
            setLoading(false);
        }
    };

    const steps = ["email", "verify", "password"];
    const currentStepIndex = steps.indexOf(step);

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-[#0A1929]">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/campus1.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929]/90 via-[#0A1929]/80 to-[#0A1929]" />
            </div>

            <div className="w-full max-w-lg z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
                >
                    {/* Back to Login */}
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        로그인으로 돌아가기
                    </Link>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2 font-serif">비밀번호 찾기</h1>
                        <p className="text-blue-200/80">
                            {step === "email" && "이메일 주소를 입력하세요"}
                            {step === "verify" && "인증 코드를 확인해주세요"}
                            {step === "password" && "새 비밀번호를 입력하세요"}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex justify-between mb-8 relative px-2 sm:px-0">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />
                        {steps.map((s, i) => (
                            <div
                                key={s}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 ${i <= currentStepIndex
                                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/20"
                                    : "bg-gray-800 text-gray-500 border border-white/10"
                                    }`}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center gap-2"
                            >
                                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form Content */}
                    <div className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {step === "email" && (
                                <motion.div
                                    key="email"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300 ml-1">이메일 주소</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="example@mha.ac.kr"
                                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleSendCode}
                                        disabled={loading || !email}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                인증 코드 받기 <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            )}

                            {step === "verify" && (
                                <motion.div
                                    key="verify"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center mb-6">
                                        <p className="text-sm text-gray-400 mb-1">인증 코드를 발송했습니다</p>
                                        <p className="text-white font-medium">{email}</p>
                                    </div>

                                    <div className="relative group overflow-x-auto pb-4">
                                        <div className="flex justify-center gap-1.5 sm:gap-2 min-w-[300px] sm:min-w-0">
                                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                                <div
                                                    key={index}
                                                    className={`w-10 h-14 sm:w-12 sm:h-16 rounded-xl sm:rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-bold transition-all duration-300 ${code[index]
                                                        ? "border-[#D4AF37] bg-white/10 text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                                        : "border-white/10 bg-white/5 text-gray-600"
                                                        }`}
                                                >
                                                    {code[index] || ""}
                                                </div>
                                            ))}
                                        </div>

                                        <input
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                            placeholder="000000"
                                            maxLength={6}
                                            className="absolute inset-0 opacity-0 cursor-text w-full h-full"
                                            autoFocus
                                        />
                                    </div>

                                    <button
                                        onClick={handleVerifyCode}
                                        disabled={loading || code.length !== 6}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                확인 <CheckCircle className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => setStep("email")}
                                        className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        이메일 다시 입력하기
                                    </button>
                                </motion.div>
                            )}

                            {step === "password" && (
                                <motion.div
                                    key="password"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300 ml-1">새 비밀번호</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="8자 이상, 특수문자 포함 권장"
                                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300 ml-1">비밀번호 확인</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="비밀번호 재입력"
                                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() => setStep("verify")}
                                            className="w-1/3 py-4 bg-white/5 hover:bg-white/10 text-gray-300 font-bold rounded-xl border border-white/10 transition-all"
                                        >
                                            이전
                                        </button>
                                        <button
                                            onClick={handleResetPassword}
                                            disabled={loading || !newPassword || !confirmPassword}
                                            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    비밀번호 변경 <CheckCircle className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
