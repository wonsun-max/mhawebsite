import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ContentPageLayout from "@/components/ContentPageLayout";
import { User, Mail, Calendar, BookOpen, MessageCircle, Edit, Shield, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProfileInfo from "@/components/profile/ProfileInfo";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            posts: {
                orderBy: { createdAt: "desc" },
                take: 5,
            },
            comments: {
                orderBy: { createdAt: "desc" },
                take: 5,
                include: {
                    post: true,
                },
            },
            reactions: {
                where: {
                    postId: { not: null }, // Only fetch post likes
                    type: 'LIKE'
                },
                orderBy: { createdAt: "desc" },
                take: 6,
                include: {
                    post: {
                        include: {
                            author: {
                                select: { name: true }
                            }
                        }
                    }
                }
            }
        },
    });

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <ContentPageLayout
            title="My Profile"
            subtitle="내 정보 및 활동 내역"
            heroImageUrl="/images/campus2.jpg"
            heroImageAlt="Profile Background"
        >
            <div className="max-w-6xl mx-auto">
                {/* Profile Header Card */}
                <ProfileInfo
                    user={{
                        name: user.name,
                        koreanName: user.koreanName,
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        image: user.image,
                        createdAt: user.createdAt,
                        postsCount: user.posts.length,
                        commentsCount: user.comments.length,
                        reactionsCount: user.reactions.length,
                    }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Posts */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-400" />
                            최근 작성한 글
                        </h3>
                        {user.posts.length > 0 ? (
                            <div className="space-y-4">
                                {user.posts.map((post) => (
                                    <Link
                                        href={`/news/board/${post.id}`}
                                        key={post.id}
                                        className="block bg-gray-700/50 p-4 rounded-xl hover:bg-gray-700 transition-colors group"
                                    >
                                        <h4 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                            <span>조회 {post.views}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">작성한 글이 없습니다.</p>
                        )}
                    </div>

                    {/* Recent Comments */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-purple-400" />
                            최근 작성한 댓글
                        </h3>
                        {user.comments.length > 0 ? (
                            <div className="space-y-4">
                                {user.comments.map((comment) => (
                                    <Link
                                        href={`/news/board/${comment.postId}`}
                                        key={comment.id}
                                        className="block bg-gray-700/50 p-4 rounded-xl hover:bg-gray-700 transition-colors group"
                                    >
                                        <p className="text-gray-300 mb-2 line-clamp-2 group-hover:text-white transition-colors">
                                            "{comment.text}"
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="text-blue-400">
                                                {comment.post.title}
                                            </span>
                                            <span>•</span>
                                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">작성한 댓글이 없습니다.</p>
                        )}
                    </div>

                    {/* Liked Posts */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 lg:col-span-2">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-pink-500" />
                            좋아요한 글
                        </h3>
                        {user.reactions.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.reactions.map((reaction) => (
                                    reaction.post && (
                                        <Link
                                            href={`/news/board/${reaction.post.id}`}
                                            key={reaction.id}
                                            className="block bg-gray-700/50 p-4 rounded-xl hover:bg-gray-700 transition-colors group border border-transparent hover:border-pink-500/30"
                                        >
                                            <h4 className="text-white font-medium mb-1 group-hover:text-pink-400 transition-colors line-clamp-1">
                                                {reaction.post.title}
                                            </h4>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    {reaction.post.author.name}
                                                </span>
                                                <span>{new Date(reaction.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </Link>
                                    )
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">좋아요한 글이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </ContentPageLayout>
    );
}
