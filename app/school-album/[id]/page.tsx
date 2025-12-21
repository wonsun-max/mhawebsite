'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react';
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

export default function AlbumDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [album, setAlbum] = useState<Album | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    useEffect(() => {
        if (params?.id) {
            fetchAlbum(params.id as string);
        }
    }, [params?.id]);

    const fetchAlbum = async (id: string) => {
        try {
            const res = await fetch(`/api/albums/${id}`);
            const data = await res.json();
            if (data.success) {
                setAlbum(data.data);
            } else {
                router.push('/school-album');
            }
        } catch (error) {
            console.error('Error fetching album:', error);
            router.push('/school-album');
        } finally {
            setLoading(false);
        }
    };

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
    };

    const goToPrevious = () => {
        if (selectedImageIndex !== null && album) {
            setSelectedImageIndex((selectedImageIndex - 1 + album.images.length) % album.images.length);
        }
    };

    const goToNext = () => {
        if (selectedImageIndex !== null && album) {
            setSelectedImageIndex((selectedImageIndex + 1) % album.images.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex !== null) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') goToPrevious();
                if (e.key === 'ArrowRight') goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);

    if (loading) {
        return (
            <ContentPageLayout
                title="앨범 상세"
                subtitle="Loading..."
                heroImageUrl="/images/campus2.jpg"
                heroImageAlt="Album Detail"
            >
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </ContentPageLayout>
        );
    }

    if (!album) {
        return null;
    }

    return (
        <ContentPageLayout
            title={album.title}
            subtitle={album.description || '학교 앨범'}
            heroImageUrl={album.images[0]}
            heroImageAlt={album.title}
            subNav={newsSubNav}
        >
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/school-album')}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>목록으로 돌아가기</span>
                </button>

                {/* Album Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-2xl p-8 mb-12 border border-white/10"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">{album.title}</h1>
                    {album.description && (
                        <p className="text-gray-300 text-lg mb-6 leading-relaxed">{album.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(album.createdAt).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {album.author.koreanName || album.author.name || 'Admin'}
                        </span>
                        <span className="text-blue-400 font-medium">
                            {album.images.length}장의 사진
                        </span>
                    </div>
                </motion.div>

                {/* Image Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {album.images.map((image, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative aspect-square cursor-pointer group overflow-hidden rounded-xl"
                            onClick={() => openLightbox(idx)}
                        >
                            <Image
                                src={image}
                                alt={`${album.title} - ${idx + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                {idx + 1} / {album.images.length}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedImageIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={closeLightbox}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeLightbox}
                                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute top-6 left-6 z-10 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white font-medium">
                                {selectedImageIndex + 1} / {album.images.length}
                            </div>

                            {/* Main Image */}
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className="relative w-full h-full max-w-6xl max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={album.images[selectedImageIndex]}
                                    alt={`${album.title} - ${selectedImageIndex + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>

                            {/* Navigation Arrows */}
                            {album.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                                        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <ChevronLeft className="w-8 h-8 text-white" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <ChevronRight className="w-8 h-8 text-white" />
                                    </button>
                                </>
                            )}

                            {/* Thumbnails */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4 pb-2 scrollbar-thin scrollbar-thumb-white/20">
                                {album.images.map((image, idx) => (
                                    <motion.button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(idx); }}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${idx === selectedImageIndex ? 'border-blue-500 scale-110' : 'border-white/20 hover:border-white/40'
                                            }`}
                                        whileHover={{ scale: idx === selectedImageIndex ? 1.1 : 1.05 }}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ContentPageLayout>
    );
}
