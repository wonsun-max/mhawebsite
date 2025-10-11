// FILE: components/Footer.tsx
'use client'
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold mb-2">MHA School</h4>
          <p className="text-sm text-white/80">Missionary Heritage Academy - faith, learning, service.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-white/80">123 Example Rd, City · 010-1234-5678</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="text-sm text-white/80 space-y-1">
            <li><a href="/admissions" className="hover:underline">Admissions</a></li>
            <li><a href="/news" className="hover:underline">News</a></li>
            <li><a href="/portal/login" className="hover:underline">Portal</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t border-white/6 pt-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} MHA School · All rights reserved.
      </div>
    </footer>
  );
}
