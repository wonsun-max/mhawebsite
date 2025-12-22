"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Calendar,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  School,
  GraduationCap,
  Users,
  ShieldCheck,
  Send
} from "lucide-react";
import Image from "next/image";

type SignupStep = "email" | "verify" | "role" | "account" | "details";
type UserRole = "STUDENT" | "TEACHER" | "PARENT";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<SignupStep>("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form data
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [tempKey, setTempKey] = useState("");
  const [role, setRole] = useState<UserRole>("STUDENT");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [koreanName, setKoreanName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "">("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [studentName, setStudentName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSendCode = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup/send-code", {
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
      const res = await fetch("/api/auth/signup/verify-code", {
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
      setStep("role");
    } catch {
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignup = async () => {
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }

    if (!name || !koreanName || !birthdate || !gender || !age) {
      setError("모든 필수 정보를 입력해주세요");
      return;
    }

    if (role === "STUDENT" && !grade) {
      setError("학년을 선택해주세요");
      return;
    }

    if (role === "PARENT" && !studentName) {
      setError("학생 이름을 입력해주세요");
      return;
    }

    if (!agreedToTerms) {
      setError("개인정보처리방침에 동의해주세요");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tempKey,
          username,
          password,
          role,
          name,
          koreanName,
          birthdate,
          gender,
          age: parseInt(age),
          grade: grade ? parseInt(grade) : null,
          studentName: studentName || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "회원가입에 실패했습니다");
        return;
      }

      // Success - redirect to login with message
      router.push("/auth/login?message=signup_success");
    } catch {
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const steps = ["email", "verify", "role", "account", "details"];
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 font-serif">Join MHA</h1>
            <p className="text-blue-200/80">
              {step === "email" && "학교 이메일로 시작하세요"}
              {step === "verify" && "인증 코드를 확인해주세요"}
              {step === "role" && "어떤 분이신가요?"}
              {step === "account" && "계정을 생성합니다"}
              {step === "details" && "마지막 단계입니다"}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10" />
            {steps.map((s, i) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${i <= currentStepIndex
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
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

                  <div className="space-y-4">
                    <div className="flex justify-center gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <div
                          key={index}
                          className={`w-12 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all duration-300 ${code[index]
                              ? "border-[#D4AF37] bg-white/10 text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                              : "border-white/10 bg-white/5 text-gray-600"
                            }`}
                        >
                          {code[index] || ""}
                        </div>
                      ))}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="000000"
                        maxLength={6}
                        className="absolute inset-0 opacity-0 cursor-default"
                        autoFocus
                      />
                    </div>
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

              {step === "role" && (
                <motion.div
                  key="role"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {[
                    { value: "STUDENT", label: "학생", desc: "MHA 재학생", icon: GraduationCap },
                    { value: "TEACHER", label: "교사", desc: "교직원 및 선생님", icon: School },
                    { value: "PARENT", label: "학부모", desc: "학부모님", icon: Users },
                  ].map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setRole(r.value as UserRole)}
                      className={`w-full p-4 rounded-xl border transition-all text-left flex items-center gap-4 group ${role === r.value
                        ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-900/20"
                        : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                        }`}
                    >
                      <div className={`p-3 rounded-lg ${role === r.value ? "bg-blue-500 text-white" : "bg-white/10 text-gray-400 group-hover:text-white"}`}>
                        <r.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${role === r.value ? "text-white" : "text-gray-300 group-hover:text-white"}`}>{r.label}</div>
                        <div className="text-sm text-gray-500 group-hover:text-gray-400">{r.desc}</div>
                      </div>
                      {role === r.value && <CheckCircle className="w-5 h-5 text-blue-400 ml-auto" />}
                    </button>
                  ))}

                  <button
                    onClick={() => setStep("account")}
                    className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                  >
                    다음 <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === "account" && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 ml-1">아이디</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                          const val = e.target.value;
                          // Only allow English letters, numbers, underscores, and periods
                          if (/^[a-zA-Z0-9._]*$/.test(val)) {
                            setUsername(val);
                          }
                        }}
                        placeholder="영문, 숫자 4-20자 (한글 불가)"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 ml-1">비밀번호</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="8자 이상, 특수문자 포함"
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

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep("role")}
                      className="w-1/3 py-4 bg-white/5 hover:bg-white/10 text-gray-300 font-bold rounded-xl border border-white/10 transition-all"
                    >
                      이전
                    </button>
                    <button
                      onClick={() => setStep("details")}
                      disabled={!username || !password || !confirmPassword}
                      className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                    >
                      다음 <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300 ml-1">이름 (영문)</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Hong Gildong"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300 ml-1">이름 (한글)</label>
                      <input
                        type="text"
                        value={koreanName}
                        onChange={(e) => setKoreanName(e.target.value)}
                        placeholder="홍길동"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300 ml-1">생년월일</label>
                      <input
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300 ml-1">성별</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all [&>option]:bg-gray-800"
                      >
                        <option value="">선택</option>
                        <option value="MALE">남성</option>
                        <option value="FEMALE">여성</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300 ml-1">나이</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="만 나이"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {role === "STUDENT" && (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300 ml-1">학년</label>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all [&>option]:bg-gray-800"
                      >
                        <option value="">선택해주세요</option>
                        {[7, 8, 9, 10, 11, 12].map((g) => (
                          <option key={g} value={g}>
                            {g}학년
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {role === "PARENT" && (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300 ml-1">자녀 이름</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="자녀의 이름을 입력하세요"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-2 pt-2 pb-2">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                      />
                    </div>
                    <label htmlFor="terms" className="text-sm text-gray-300 select-none">
                      <a href="/privacy" target="_blank" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                        개인정보처리방침
                      </a>
                      에 동의합니다. (필수)
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep("account")}
                      className="w-1/3 py-4 bg-white/5 hover:bg-white/10 text-gray-300 font-bold rounded-xl border border-white/10 transition-all"
                    >
                      이전
                    </button>
                    <button
                      onClick={handleCompleteSignup}
                      disabled={loading || !agreedToTerms}
                      className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          가입 완료 <CheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              이미 계정이 있으신가요?{" "}
              <a href="/auth/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                로그인하기
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
