import { supabaseAdmin } from './supabase'

export type SupabaseBucket = 'albums' | 'posts' | 'missionaries'

/**
 * Upload a file to Supabase Storage
 * @param file - File to upload
 * @param bucket - Storage bucket name
 * @param folder - Optional folder path within bucket
 * @returns Public URL of uploaded file
 */
export async function uploadToSupabase(
    file: File,
    bucket: SupabaseBucket,
    folder?: string
): Promise<string> {
    try {
        // Generate unique filename
        const timestamp = Date.now()
        const randomSuffix = Math.round(Math.random() * 1e9)
        const sanitizedName = file.name.replace(/\s/g, '-').replace(/[^a-zA-Z0-9.-]/g, '')
        const filename = `${timestamp}-${randomSuffix}-${sanitizedName}`

        // Construct path
        const path = folder ? `${folder}/${filename}` : filename

        // Convert file to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)

        // Upload to Supabase
        const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(path, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('Supabase upload error:', error)
            throw new Error(`Upload failed: ${error.message}`)
        }

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(data.path)

        return urlData.publicUrl
    } catch (error) {
        console.error('Upload error:', error)
        throw error
    }
}

/**
 * Delete a file from Supabase Storage
 * @param path - File path in storage (e.g., "folder/filename.jpg")
 * @param bucket - Storage bucket name
 */
export async function deleteFromSupabase(
    path: string,
    bucket: SupabaseBucket
): Promise<void> {
    try {
        const { error } = await supabaseAdmin.storage
            .from(bucket)
            .remove([path])

        if (error) {
            console.error('Supabase delete error:', error)
            throw new Error(`Delete failed: ${error.message}`)
        }
    } catch (error) {
        console.error('Delete error:', error)
        throw error
    }
}

/**
 * Get public URL for a file in Supabase Storage
 * @param path - File path in storage
 * @param bucket - Storage bucket name
 * @returns Public URL
 */
export function getPublicUrl(
    path: string,
    bucket: SupabaseBucket
): string {
    const { data } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(path)

    return data.publicUrl
}

/**
 * Upload multiple files to Supabase Storage
 * @param files - Array of files to upload
 * @param bucket - Storage bucket name
 * @param folder - Optional folder path within bucket
 * @returns Array of public URLs
 */
export async function uploadMultipleToSupabase(
    files: File[],
    bucket: SupabaseBucket,
    folder?: string
): Promise<string[]> {
    const uploadPromises = files.map(file => uploadToSupabase(file, bucket, folder))
    return Promise.all(uploadPromises)
}

/**
 * Extract path from Supabase public URL
 * @param url - Public URL from Supabase
 * @returns File path in storage
 */
export function extractPathFromUrl(url: string): string | null {
    try {
        const urlObj = new URL(url)
        const pathParts = urlObj.pathname.split('/')
        // URL format: /storage/v1/object/public/{bucket}/{path}
        const bucketIndex = pathParts.indexOf('public')
        if (bucketIndex !== -1 && bucketIndex + 2 < pathParts.length) {
            return pathParts.slice(bucketIndex + 2).join('/')
        }
        return null
    } catch {
        return null
    }
}
