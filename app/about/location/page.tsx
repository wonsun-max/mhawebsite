// FILE: app/about/location/page.tsx
// path: app/about/location/page.tsx
'use client'
import AnimatedOnView from '../../../components/AnimatedOnView'

export default function LocationPage() {
  const address = encodeURIComponent('Missionary Heritage Academy, Manila, Philippines')
  // Replace the query with exact address or embed key if you use maps embed with API key.
  const mapSrc = `https://www.google.com/maps?q=${address}&output=embed`

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <AnimatedOnView>
        <h1 className="text-3xl font-bold text-white mb-6">Location & Directions</h1>
      </AnimatedOnView>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <AnimatedOnView>
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white">Campus Address</h3>
            <p className="text-white/80 mt-2">Missionary Heritage Academy<br/>Manila, Philippines</p>

            <h4 className="mt-4 font-semibold text-white">Contact</h4>
            <p className="text-white/80">Phone: 010-1234-5678<br/>Email: info@example.edu</p>

            <h4 className="mt-4 font-semibold text-white">Visiting</h4>
            <p className="text-white/80 text-sm">Please contact the office to schedule a tour. Parking on campus is limited.</p>
          </div>
        </AnimatedOnView>

        <AnimatedOnView>
          <div className="w-full h-80 rounded-xl overflow-hidden border border-white/8">
            <iframe
              title="campus-map"
              src={mapSrc}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </AnimatedOnView>
      </div>
    </main>
  )
}
