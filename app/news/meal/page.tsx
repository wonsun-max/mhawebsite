'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';

export default function MealPage() {
  return (
    <ContentPageLayout
      title="Meal Information"
      subtitle="Healthy and delicious meals for our students."
      heroImageUrl="/images/event2.jpg"
      heroImageAlt="Meal Information"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <AnimatedOnView>
          <div className="glass p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Weekly Menu</h2>
            <p className="text-white/80 mb-4">
              Our school cafeteria provides a balanced and nutritious menu that changes weekly. Please check the menu board at the cafeteria entrance for the latest updates.
            </p>
            <p className="text-white/80">
              We are committed to providing healthy food options and can accommodate special dietary needs with advance notice.
            </p>
          </div>
        </AnimatedOnView>
      </div>
    </ContentPageLayout>
  );
}
