'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import { dormitorySubNav } from '@/lib/subNavConfig';


export default function DormitoryQualificationPage() {
  return (
    <ContentPageLayout
      title="입사 자격"
      subtitle="Requirements for applying for student housing."
      heroImageUrl="/images/dormitory.jpg"
      heroImageAlt="Dormitory Qualification"
      subNav={dormitorySubNav}
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Qualification for Admission</h2>
          <p className="text-white/80 mb-4">
            Students who wish to reside in the dormitory must meet the following criteria:
          </p>
          <ul className="list-disc list-inside text-white/80">
            <li>Students in Grade 7 or above</li>
            <li>Students whose parents reside outside of Metro Manila</li>
            <li>Students with good behavioral records</li>
            <li>Students who agree to abide by dormitory rules</li>
          </ul>
        </div>
      </div>
    </ContentPageLayout>
  );
}
