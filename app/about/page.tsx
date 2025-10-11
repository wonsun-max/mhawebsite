'use client'
import { motion } from 'framer-motion';
import Timeline from '../../components/Timeline';

export default function AboutPage() {
  return (
    <main className="text-white">
      {/* Hero Section */}
      <section
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'linear-gradient(180deg, rgba(2,6,23,0.6), rgba(2,6,23,0.9)), url(/images/campus3.jpg)' }}
      >
        <div className="text-center px-6">
          <motion.h1
            className="text-5xl font-extrabold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Our School
          </motion.h1>
          <motion.p
            className="text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Nurturing faith, wisdom, and character — where every student discovers their purpose.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="glass rounded-2xl p-8"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/images/mission.jpg" alt="Mission" className="rounded-lg mb-4 w-full h-52 object-cover" />
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p className="text-white/80 text-sm">
              To educate and inspire students to lead with integrity, compassion, and faith — preparing them to serve the world with excellence.
            </p>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-8"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="/images/vision.jpg" alt="Vision" className="rounded-lg mb-4 w-full h-52 object-cover" />
            <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
            <p className="text-white/80 text-sm">
              To be a beacon of Christian education that transforms young minds into lifelong learners and compassionate leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-center">
          <motion.div
            className="col-span-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img src="/images/principal.jpg" alt="Principal" className="rounded-2xl w-60 h-72 object-cover shadow-lg" />
          </motion.div>
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4">Principal’s Message</h2>
            <p className="text-white/80 mb-3 text-sm sm:text-base">
              “At MHA, we believe education is more than academics — it’s the cultivation of heart and purpose.
              Every student is created for greatness, and we walk with them to discover it.”
            </p>
            <p className="text-white/70 text-sm">– Rev. Daniel Kim, Principal</p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* Gallery */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Campus Moments</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <img src="/images/campus1.jpg" alt="campus" className="rounded-lg hover:scale-105 transition" />
            <img src="/images/campus2.jpg" alt="campus" className="rounded-lg hover:scale-105 transition" />
            <img src="/images/campus3.jpg" alt="campus" className="rounded-lg hover:scale-105 transition" />
            <img src="/images/campus4.jpg" alt="campus" className="rounded-lg hover:scale-105 transition" />
          </div>
        </div>
      </section>
    </main>
  );
}
