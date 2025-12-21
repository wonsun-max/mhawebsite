'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Calendar, ImageIcon } from 'lucide-react';
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {albums.map((album, idx) => (
                            <Link key={album.id} href={`/school-album/${album.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10"
                                >
                                    {/* Cover Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={album.images[0]}
                                            alt={album.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                        {/* Image Count Badge */}
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                            <ImageIcon className="w-4 h-4 text-white" />
                                            <span className="text-white text-sm font-medium">{album.images.length}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                            {album.title}
                                        </h3>
                                        {album.description && (
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {album.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(album.createdAt).toLocaleDateString('ko-KR')}
                                            </span>
                                            <span>{album.author.koreanName || album.author.name || 'Admin'}</span>
                                        </div>
                                    </div>

                                    {/* Hover Effect Border */}
                                    <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/50 rounded-2xl transition-colors pointer-events-none" />
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </ContentPageLayout>
    );
}
