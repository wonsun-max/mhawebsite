"use client";

import { useState } from "react";
import { User, Mail, Calendar, BookOpen, MessageCircle, Edit, Check, X, Loader2, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProfileInfoProps {
    user: {
        name: string | null;
        koreanName: string | null;
        email: string;
        username: string | null;
        role: string;
        image: string | null;
        createdAt: Date;
        postsCount: number;
        commentsCount: number;
        reactionsCount: number;
    };
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(user.username || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Client-side validation
        if (file.size > 5 * 1024 * 1024) {
            setError("파일 크기는 5MB 이하여야 합니다.");
            return;
        }

        setImageLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/user/upload-image", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "이미지 업로드 실패");
            }

            router.refresh(); // Refresh to show new image
        } catch (err: any) {
            setError(err.message);
        } finally {
            setImageLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (newUsername === user.username) {
            setIsEditing(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/user/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: newUsername }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "업데이트 실패");
            }

            setIsEditing(false);
            router.refresh(); // Refresh server data
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 group">
                <Image
                    src={user.image || "/images/default-avatar.png"}
                    alt={user.name || "User"}
                    fill
                    className={`rounded-full object-cover border-4 border-blue-500/30 shadow-lg transition-opacity ${imageLoading ? 'opacity-50' : ''}`}
                />
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                )}
                <label
                    className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-4 border-[#0A1929] cursor-pointer hover:bg-blue-500 transition-colors z-20"
                    title="프로필 사진 변경"
                >
                    <Edit className="w-4 h-4 text-white" />
                    <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleImageUpload}
                        disabled={imageLoading}
                    />
                </label>
            </div>

            <div className="flex-1 text-center md:text-left w-full">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-2 justify-center md:justify-start">
                    <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                    {user.koreanName && (
                        <span className="text-xl text-gray-400">({user.koreanName})</span>
                    )}
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold border border-blue-500/30">
                        {user.role}
                    </span>
                </div>

                {/* Username Edit Section */}
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="text-gray-400 text-sm">ID:</span>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => {
                                    // Frontend validation: English/numbers only
                                    const val = e.target.value;
                                    if (/^[a-zA-Z0-9._]*$/.test(val)) {
                                        setNewUsername(val);
                                    }
                                }}
                                className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
                                placeholder="영문, 숫자 (4-20자)"
                            />
                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="p-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setNewUsername(user.username || "");
                                    setError("");
                                }}
                                className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 group">
                            <span className="text-white font-medium">{user.username || "설정되지 않음"}</span>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                                title="아이디 변경"
                            >
                                <Edit className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>
                {error && <p className="text-red-400 text-xs mb-2 text-center md:text-left">{error}</p>}

                <p className="text-gray-400 mb-6 flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4" /> {user.email}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-sm text-gray-400 mb-1">가입일</p>
                        <p className="text-white font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-sm text-gray-400 mb-1">작성한 글</p>
                        <p className="text-white font-medium flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-green-400" />
                            {user.postsCount}개
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-sm text-gray-400 mb-1">작성한 댓글</p>
                        <p className="text-white font-medium flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-purple-400" />
                            {user.commentsCount}개
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-sm text-gray-400 mb-1">좋아요한 글</p>
                        <p className="text-white font-medium flex items-center gap-2">
                            <Heart className="w-4 h-4 text-pink-400" />
                            {user.reactionsCount}개
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
