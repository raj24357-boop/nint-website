// src/app/page.tsx (or app/page.tsx)
import { Zap, ShieldCheck, IndianRupee, MessageCircle, UserPlus, ArrowRight, Star } from 'lucide-react';

// Replace these with your actual links
const WHATSAPP_LINK = "https://wa.me/919999999999?text=Hi%20NINT,%20I%20need%20a%20worker.";
const GOOGLE_FORM_LINK = "https://forms.gle/your-google-form-id";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900 pb-24 sm:pb-0">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white font-bold text-lg">N</div>
            <span className="text-xl font-bold tracking-tight">NINT</span>
          </div>
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Find Worker
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600 ring-1 ring-inset ring-orange-200 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            Trusted by 10,000+ homes across India
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl leading-tight">
            Find Trusted Local <br className="hidden sm:block" />
            <span className="text-orange-500">Workers Instantly</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 sm:text-xl">
            Connect with verified daily wage workers and home service professionals near you. Fast, fair, and reliable.
          </p>

          {/* Primary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-600 active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              Find a Worker Now
            </a>
            <a
              href={GOOGLE_FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 transition hover:bg-slate-50 active:scale-95"
            >
              <UserPlus className="h-5 w-5 text-slate-500" />
              Join as a Worker
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              100% Verified Profiles
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              Instant Booking via WhatsApp
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How NINT Works
            </h2>
            <p className="mt-4 text-lg text-slate-600">Simple, transparent, and designed for your convenience.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Booking</h3>
              <p className="text-slate-600">
                Skip the endless searches. Message us on WhatsApp, and we will connect you with an available worker in your area immediately.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Profiles</h3>
              <p className="text-slate-600">
                Safety first. Every worker on NINT is background-checked and verified, so you can hire with complete peace of mind.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-6">
                <IndianRupee className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fair Prices</h3>
              <p className="text-slate-600">
                No middlemen, no hidden charges. Get transparent, fair pricing for daily wage work and home services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonial Snippet */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-orange-400 text-orange-400" />
            ))}
          </div>
          <blockquote className="text-2xl font-medium leading-relaxed text-slate-800 sm:text-3xl">
            “Found an electrician in 15 minutes. The worker was polite, verified, and did the job perfectly. NINT is a game-changer!”
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">R</div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Rahul Sharma</p>
              <p className="text-sm text-slate-500">Bengaluru</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-6xl px-4 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-xl">
            Join hundreds of households and workers using NINT today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-green-600"
            >
              Find a Worker <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={GOOGLE_FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-8 py-4 text-base font-semibold text-white ring-1 ring-inset ring-slate-700 transition hover:bg-slate-700"
            >
              Join as a Worker
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Bar (High Conversion Hack for India) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <a
            href={GOOGLE_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900 active:scale-95 transition"
          >
            Join as Worker
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[1.5] inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-bold text-white active:scale-95 transition"
          >
            <MessageCircle className="h-4 w-4" />
            Find Worker Now
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 pb-24 sm:pb-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} NINT (nint.co.in). All rights reserved.
        </div>
      </footer>
    </main>
  );
}