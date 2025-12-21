'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, X, ArrowLeft, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateAlbumPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        await uploadFiles(files);
    };

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            await uploadFiles(files);
        }
    };

    const uploadFiles = async (files: File[]) => {
        if (files.length === 0) return;

        setUploading(true);

        try {
            // Convert HEIC files to JPEG
            const convertedFiles: File[] = [];

            for (const file of files) {
                if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
                    try {
                        // Dynamically import heic2any
                        const heic2any = (await import('heic2any')).default;
                        const convertedBlob = await heic2any({
                            blob: file,
                            toType: 'image/jpeg',
                            quality: 0.9
                        });

                        // heic2any can return Blob or Blob[]
                        const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
                        const convertedFile = new File(
                            [blob],
                            file.name.replace(/\.heic$/i, '.jpg').replace(/\.heif$/i, '.jpg'),
                            { type: 'image/jpeg' }
                        );
                        convertedFiles.push(convertedFile);
                    } catch (conversionError) {
                        console.error('HEIC conversion error:', conversionError);
                        alert(`HEIC 변환 실패: ${file.name}`);
                        continue;
                    }
                } else {
                    convertedFiles.push(file);
                }
            }

            if (convertedFiles.length === 0) {
                setUploading(false);
                return;
            }

            const formData = new FormData();
            convertedFiles.forEach(file => formData.append('files', file));

            const res = await fetch('/api/albums/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok && data.imageUrls) {
                setImages(prev => [...prev, ...data.imageUrls]);
            } else {
                alert('이미지 업로드 실패: ' + (data.error || '알 수 없는 오류'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('이미지 업로드 중 오류가 발생했습니다.');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const moveImage = (fromIndex: number, toIndex: number) => {
        const newImages = [...images];
        const [moved] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, moved);
        setImages(newImages);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (images.length === 0) {
            alert('최소 1장의 이미지를 업로드해주세요.');
            return;
        }

        setCreating(true);

        try {
            const res = await fetch('/api/albums', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim() || null,
                    images,
                }),
            });

            const data = await res.json();

            if (data.success) {
                alert('앨범이 생성되었습니다!');
                router.push('/admin/albums');
            } else {
                alert('앨범 생성 실패: ' + data.error);
            }
        } catch (error) {
            console.error('Create error:', error);
            alert('앨범 생성 중 오류가 발생했습니다.');
        } finally {
            setCreating(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
                <ArrowLeft className="w-5 h-5" />
                뒤로 가기
            </button>

            <h1 className="text-3xl font-bold text-white mb-2">새 앨범 만들기</h1>
            <p className="text-gray-400 mb-8">여러 장의 사진으로 앨범을 만들어보세요</p>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                {/* Title */}
                <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">
                        앨범 제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="예: 2024 체육대회"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">앨범 설명</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-y"
                        rows={3}
                        placeholder="앨범에 대한 설명을 입력하세요 (선택사항)"
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">
                        이미지 업로드 <span className="text-red-500">*</span>
                    </label>

                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800'
                            }`}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            multiple
                            accept="image/*"
                            onChange={handleFileInput}
                            className="hidden"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-white font-medium mb-1">이미지를 드래그하거나 클릭하여 업로드</p>
                            <p className="text-gray-500 text-sm">JPG, PNG, GIF, WEBP, HEIC (최대 15MB)</p>
                        </label>
                    </div>

                    {uploading && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-blue-400">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>업로드 중...</span>
                        </div>
                    )}

                    {/* Image Grid */}
                    {images.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <AnimatePresence>
                                {images.map((image, idx) => (
                                    <motion.div
                                        key={image}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="relative aspect-square group"
                                    >
                                        <Image
                                            src={image}
                                            alt={`Image ${idx + 1}`}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors rounded-lg flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="opacity-0 group-hover:opacity-100 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all"
                                            >
                                                <X className="w-5 h-5 text-white" />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold">
                                            {idx + 1}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={creating || uploading || images.length === 0}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                    >
                        {creating ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                생성 중...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                앨범 생성
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
