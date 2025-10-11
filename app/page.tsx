"use client";

import { motion } from "framer-motion";
import Hero from "../components/Hero";
import FeatureGrid from "../components/FeatureGrid";
import GalleryPreview from "../components/GalleryPreview";
import { announcements } from "../lib/sampleData";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 min-h-screen text-white">
      {/* 🌅 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero />
      </motion.div>

      {/* 🪶 Floating Logo (gentle) */}
      <motion.div
        className="absolute top-28 right-16 hidden md:block opacity-80"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/images/logo.png" alt="School Crest" width={90} height={90} />
      </motion.div>

      <main className="max-w-6xl mx-auto px-6 -mt-12 space-y-24 pb-24">
        {/* 📰 Announcements */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-8 tracking-tight">
            Latest Announcements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {announcements.map((a) => (
              <motion.article
                key={a.id}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white/10 hover:bg-white/15 p-6 rounded-xl border border-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{a.title}</h3>
                  <time className="text-sm text-white/60">{a.date}</time>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">{a.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* 💫 Features */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <FeatureGrid />
        </motion.section>

        {/* 🏫 Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <GalleryPreview />
        </motion.section>

        {/* 🎓 CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false }}
          className="text-center pt-8"
        >
          <h2 className="text-4xl font-semibold mb-4 tracking-tight">
            Join Our Learning Community
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Experience a nurturing environment where education and character grow together.
          </p>
          <a
            href="/admissions"
            className="inline-block bg-gradient-to-r from-sky-400 to-indigo-500 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300"
          >
            Apply Now
          </a>
        </motion.section>
      </main>
    </div>
  );
}
