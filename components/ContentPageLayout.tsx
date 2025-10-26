'use client'
import React from 'react';
import HeroSection from './HeroSection'; // Import the HeroSection component

interface ContentPageLayoutProps {
  title: string;
  subtitle?: string;
  heroImageUrl?: string; // Make imageUrl optional
  heroImageAlt: string;
  heroVideoUrl?: string; // New optional prop for video background
  children: React.ReactNode;
  heroHeightClass?: string; // Optional prop to control hero section height
  heroOverlayOpacityClass?: string; // Optional prop to control hero overlay opacity
}

export default function ContentPageLayout({
  title,
  subtitle,
  heroImageUrl,
  heroImageAlt,
  heroVideoUrl,
  children,
  heroHeightClass = 'h-[50vh]',
  heroOverlayOpacityClass = 'bg-black/60',
}: ContentPageLayoutProps) {
  return (
    <main className="text-white">
      <HeroSection
        title={title}
        subtitle={subtitle}
        imageUrl={heroImageUrl}
        imageAlt={heroImageAlt}
        videoUrl={heroVideoUrl}
        heightClass={heroHeightClass}
        overlayOpacityClass={heroOverlayOpacityClass}
      />

      {/* Main Content Area */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6">
          {children}
        </div>
      </section>
    </main>
  );
}
