'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Edit, Trash2, Calendar, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Album {
    id: string;
    title: string;
    description?: string | null;
    images: string[];
    createdAt: string;
    author: {
        koreanName?: string | null;
    };
}

export default function AdminAlbumsPage() {
    const router = useRouter();
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

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`"${title}" 앨범을 삭제하시겠습니까?`)) return;

        try {
            const res = await fetch(`/api/albums/${id}`, { method: 'DELETE' });
            const data = await res.json();

            if (data.success) {
                alert('앨범이 삭제되었습니다.');
                fetchAlbums();
            } else {
                alert('삭제 실패: ' + data.error);
            }
        } catch (error) {
            console.error('Error deleting album:', error);
            alert('앨범 삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">앨범 관리</h1>
                    <p className="text-gray-400 mt-2">학교 앨범을 관리합니다</p>
                </div>
                <button
                    onClick={() => router.push('/admin/albums/create')}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    새 앨범 만들기
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : albums.length === 0 ? (
                <div className="text-center py-20 bg-gray-800 rounded-xl">
                    <ImageIcon className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400 text-lg">아직 생성된 앨범이 없습니다</p>
                    <button
                        onClick={() => router.push('/admin/albums/create')}
                        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                        첫 앨범 만들기
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {albums.map((album, idx) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all"
                        >
                            {/* Cover Image */}
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={album.images[0]}
                                    alt={album.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <ImageIcon className="w-4 h-4 text-white" />
                                    <span className="text-white text-sm font-medium">{album.images.length}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{album.title}</h3>
                                {album.description && (
                                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{album.description}</p>
                                )}
                                <div className="flex items-center text-xs text-gray-500 mb-4">
                                    <Calendar className="w-3.5 h-3.5 mr-1" />
                                    {new Date(album.createdAt).toLocaleDateString('ko-KR')}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/albums/${album.id}/edit`)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(album.id, album.title)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
