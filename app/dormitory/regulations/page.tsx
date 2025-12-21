'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import { dormitorySubNav } from '@/lib/subNavConfig';


export default function DormitoryRegulationsPage() {
  return (
    <ContentPageLayout
      title="생활 수칙"
      subtitle="Guidelines for a safe and respectful living environment."
      heroImageUrl="/images/dormitory.jpg"
      heroImageAlt="Dormitory Regulations"
      subNav={dormitorySubNav}
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Dormitory Regulations</h2>
          <p className="text-white/80 mb-4">
            To ensure a safe and conducive living environment, all residents must adhere to the following regulations:
          </p>
          <ul className="list-disc list-inside text-white/80">
            <li>Respect for others and their property</li>
            <li>Strict adherence to curfew hours</li>
            <li>Maintenance of cleanliness in rooms and common areas</li>
            <li>Prohibition of unauthorized visitors</li>
            <li>No consumption of alcohol or tobacco</li>
          </ul>
        </div>
      </div>
    </ContentPageLayout>
  );
}
