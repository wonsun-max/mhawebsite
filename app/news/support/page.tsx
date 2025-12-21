'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import { newsSubNav } from '@/lib/subNavConfig';


export default function SupportPage() {
  return (
    <ContentPageLayout
      title="Support MHA"
      subtitle="Help us continue our mission."
      heroImageUrl="/images/campus3.jpg"
      heroImageAlt="Support MHA"
      subNav={newsSubNav}
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Support MHA</h2>
          <p className="text-white/80 mb-4">
            Your support helps us provide quality education to missionary children.
          </p>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Donation Information</h3>
            <p className="text-white/80">Bank Name: XXX Bank</p>
            <p className="text-white/80">Account Number: 123-456-7890</p>
            <p className="text-white/80">Account Holder: Manila Hankuk Academy</p>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
}
