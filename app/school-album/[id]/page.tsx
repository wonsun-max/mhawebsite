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

    // Body scroll lock
    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImageIndex]);

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
                    className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-12 border border-white/10 shadow-2xl"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                                {album.title}
                            </h1>
                            {album.description && (
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-3xl">
                                    {album.description}
                                </p>
                            )}
                            <div className="flex flex-wrap items-center gap-8 text-sm text-gray-400">
                                <span className="flex items-center gap-2.5">
                                    <Calendar className="w-4.5 h-4.5 text-blue-400" />
                                    {new Date(album.createdAt).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                                <span className="flex items-center gap-2.5">
                                    <User className="w-4.5 h-4.5 text-blue-400" />
                                    {album.author.koreanName || album.author.name || 'Admin'}
                                </span>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 font-semibold">
                                총 {album.images.length}장의 사진
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Image Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {album.images.map((image, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="relative aspect-[4/5] cursor-pointer group overflow-hidden rounded-2xl border border-white/5 shadow-lg"
                            onClick={() => openLightbox(idx)}
                        >
                            <Image
                                src={image}
                                alt={`${album.title} - ${idx + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                <span className="text-white font-medium text-sm">자세히 보기</span>
                                <div className="bg-blue-500/80 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-bold">
                                    {idx + 1} / {album.images.length}
                                </div>
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
                            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex items-center justify-center overflow-hidden"
                            onClick={closeLightbox}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeLightbox}
                                className="absolute top-8 right-8 z-[110] w-14 h-14 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-all group scale-90 hover:scale-100"
                            >
                                <X className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute top-8 left-8 z-[110] bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full text-white font-semibold">
                                <span className="text-blue-400">{selectedImageIndex + 1}</span>
                                <span className="mx-2 text-white/30">/</span>
                                <span>{album.images.length}</span>
                            </div>

                            {/* Main Image Container */}
                            <div
                                className="relative w-full h-full flex items-center justify-center p-4 md:p-12 lg:p-24"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImageIndex}
                                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                        className="relative w-full h-full flex items-center justify-center"
                                    >
                                        <div className="relative w-full h-full max-w-7xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                                            <Image
                                                src={album.images[selectedImageIndex]}
                                                alt={`${album.title} - ${selectedImageIndex + 1}`}
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Navigation Arrows */}
                            {album.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                                        className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-all group hidden md:flex"
                                    >
                                        <ChevronLeft className="w-10 h-10 text-white group-hover:-translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-all group hidden md:flex"
                                    >
                                        <ChevronRight className="w-10 h-10 text-white group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </>
                            )}

                            {/* Thumbnails Bar */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8">
                                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 flex gap-3 overflow-x-auto scrollbar-hide snap-x">
                                    {album.images.map((image, idx) => (
                                        <motion.button
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(idx); }}
                                            className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 snap-center ${idx === selectedImageIndex
                                                ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/20'
                                                : 'border-white/10 hover:border-white/30 opacity-50 hover:opacity-100'
                                                }`}
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
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ContentPageLayout>
    );
}
