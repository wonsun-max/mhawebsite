'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function ResourcesPage() {
  return (
    <ContentPageLayout
      title="Resources"
      subtitle="Downloadable forms and documents."
      heroImageUrl="/images/campus4.jpg"
      heroImageAlt="Resources"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">School Documents</h2>
            <p className="text-white/80 mb-4">
              Here you can find various school-related documents available for download.
            </p>
            <ul className="list-disc list-inside text-white/80">
              <li><a href="/files/handbook.pdf" download className="underline">School Handbook</a></li>
              <li><a href="/files/application.docx" download className="underline">Application Form</a></li>
              <li><a href="/files/code-of-conduct.pdf" download className="underline">Code of Conduct</a></li>
            </ul>
          </div>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
