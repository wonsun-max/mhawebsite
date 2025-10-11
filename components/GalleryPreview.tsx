// FILE: components/GalleryPreview.tsx
'use client'
import { galleryPhotos } from '../lib/sampleData';

export default function GalleryPreview() {
  const preview = galleryPhotos.slice(0, 4);
  return (
    <section className="py-12 bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">School Album</h2>
          <a href="/news" className="text-sm text-white/80 hover:underline">View All</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {preview.map((src, i) => (
            <div key={i} className="rounded-lg overflow-hidden bg-gray-800">
              <img src={src} alt={`gallery-${i}`} className="w-full h-36 object-cover hover:scale-105 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
