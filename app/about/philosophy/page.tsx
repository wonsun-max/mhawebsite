'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function PhilosophyPage() {
  return (
    <ContentPageLayout
      title="Educational Philosophy & Goals"
      subtitle="Our approach to holistic education."
      heroImageUrl="/images/campus3.jpg"
      heroImageAlt="Educational Philosophy"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <AnimatedOnView>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white">Philosophy</h3>
              <p className="text-white/80 mt-2 text-sm">Education is formation — training intellect, heart, and faith together.</p>
            </div>
          </AnimatedOnView>

          <AnimatedOnView>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white">Student View</h3>
              <ul className="text-white/80 mt-3 text-sm space-y-2">
                <li>• Grow in character</li>
                <li>• Develop critical thinking</li>
                <li>• Serve community</li>
              </ul>
            </div>
          </AnimatedOnView>

          <AnimatedOnView>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white">Teacher View</h3>
              <ul className="text-white/80 mt-3 text-sm space-y-2">
                <li>• Mentor the whole child</li>
                <li>• Model faith-filled leadership</li>
                <li>• Continuous professional growth</li>
              </ul>
            </div>
          </AnimatedOnView>
        </div>

        <AnimatedOnView>
          <section className="mt-10 glass p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-3">Educational Goals</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white/6 rounded-lg">• Korean identity</div>
              <div className="p-4 bg-white/6 rounded-lg">• Christian formation</div>
              <div className="p-4 bg-white/6 rounded-lg">• Global competence</div>
            </div>
          </section>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
