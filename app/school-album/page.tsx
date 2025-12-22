'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Calendar, ImageIcon, User } from 'lucide-react';
import ContentPageLayout from '@/components/ContentPageLayout';
import { newsSubNav } from '@/lib/subNavConfig';

interface Album {
    id: string;
    title: string;
    description?: string | null;
    images: string[];
    createdAt: string;
    author: {
        name?: string | null;
        koreanName?: string | null;
    };
}

export default function SchoolAlbumPage() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const res = await fetch('/api/albums');
            const data = await res.json();
            if (data.success) {
                setAlbums(data.data);
            }
        } catch (error) {
            console.error('Error fetching albums:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContentPageLayout
            title="학교 앨범"
            subtitle="MHA 일상의 소중한 순간들"
            heroImageUrl="/images/campus2.jpg"
            heroImageAlt="School Album"
            subNav={newsSubNav}
        >
            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : albums.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <Camera className="w-20 h-20 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-400 text-lg">아직 업로드된 앨범이 없습니다</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {albums.map((album, idx) => (
                            <Link key={album.id} href={`/school-album/${album.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: idx * 0.1,
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{ y: -10 }}
                                    className="group relative bg-[#112240]/50 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-white/5 hover:border-blue-500/30"
                                >
                                    {/* Cover Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={album.images[0]}
                                            alt={album.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-[#0A1929]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                        {/* Image Count Badge */}
                                        <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2 group-hover:bg-blue-600/40 group-hover:border-blue-400/30 transition-all duration-300">
                                            <ImageIcon className="w-4 h-4 text-white" />
                                            <span className="text-white text-sm font-bold tracking-wider">{album.images.length}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors duration-300">
                                            {album.title}
                                        </h3>
                                        {album.description && (
                                            <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-light">
                                                {album.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                            <span className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                                {new Date(album.createdAt).toLocaleDateString('ko-KR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                                <User className="w-3 h-3 text-blue-400" />
                                                <span>{album.author.koreanName || album.author.name || 'Admin'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtle Glow Effect on Hover */}
                                    <div className="absolute -inset-px bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 pointer-events-none transition-all duration-500" />
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </ContentPageLayout>
    );
}
