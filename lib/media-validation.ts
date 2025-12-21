// Media validation utilities for free board uploads
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
];

export const ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/webm',
    'video/quicktime', // .mov
];

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

export function validateImageFile(file: File): ValidationResult {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: '지원하지 않는 이미지 형식입니다. (JPEG, PNG, GIF, WebP만 가능)',
        };
    }

    if (file.size > MAX_IMAGE_SIZE) {
        return {
            valid: false,
            error: `이미지 크기가 너무 큽니다. (최대 ${MAX_IMAGE_SIZE / 1024 / 1024}MB)`,
        };
    }

    return { valid: true };
}

export function validateVideoFile(file: File): ValidationResult {
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: '지원하지 않는 비디오 형식입니다. (MP4, WebM만 가능)',
        };
    }

    if (file.size > MAX_VIDEO_SIZE) {
        return {
            valid: false,
            error: `비디오 크기가 너무 큽니다. (최대 ${MAX_VIDEO_SIZE / 1024 / 1024}MB)`,
        };
    }

    return { valid: true };
}

export function validateMediaFile(file: File): ValidationResult {
    if (file.type.startsWith('image/')) {
        return validateImageFile(file);
    } else if (file.type.startsWith('video/')) {
        return validateVideoFile(file);
    } else {
        return {
            valid: false,
            error: '이미지 또는 비디오 파일만 업로드 가능합니다.',
        };
    }
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
