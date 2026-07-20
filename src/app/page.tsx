import Link from "next/link";
import {
  BadgeCheck,
  BrushCleaning,
  Clock3,
  Globe2,
  Hammer,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  UserPlus,
  Wrench,
  Zap,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  { title: "Electrician", icon: Zap, description: "Switches, wiring and urgent repairs" },
  { title: "Plumber", icon: Wrench, description: "Leak fixes, taps and pipe installations" },
  { title: "Carpenter", icon: Hammer, description: "Furniture work and home fittings" },
  { title: "Painter", icon: BrushCleaning, description: "Wall, ceiling and touch-up painting" },
  { title: "AC Repair", icon: Sparkles, description: "Cooling service and maintenance" },
  { title: "Home Cleaning", icon: BadgeCheck, description: "Deep cleaning and move-in support" },
];

const steps = [
  { title: "Search", description: "Choose the service you need and compare nearby verified workers." },
  { title: "Compare Profiles", description: "Review ratings, experience and pricing before you book." },
  { title: "Book via WhatsApp", description: "Confirm availability instantly and get the job started fast." },
];

const trustBadges = [
  "100% Verified Profiles",
  "Instant Booking via WhatsApp",
  "Best Market Rates",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-slate-900 px-4 py-2 text-center text-sm font-medium text-slate-100">
        Trusted by 10,000+ homes across India 🇮🇳
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-semibold text-white">
              N
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-slate-900">nint.co.in</p>
              <p className="text-xs text-slate-500">Premium local services</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="/services" className="transition hover:text-primary">
              Find Workers
            </Link>
            <a href="#how-it-works" className="transition hover:text-primary">
              How it works
            </a>
            <a href="#about" className="transition hover:text-primary">
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary text-white hover:bg-blue-700">
              <Link href="/auth/register">Join as Worker</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge className="mb-5 border-blue-200 bg-blue-50 text-blue-700">
              <ShieldCheck className="mr-2 h-3.5 w-3.5" />
              Trusted by 10,000+ homes across India
            </Badge>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find Trusted Local Workers Instantly
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Connecting you with verified daily wage workers and service professionals near you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary px-6 text-white hover:bg-blue-700">
                <Link href="/services">
                  <MessageCircle className="h-4 w-4" />
                  Find a Worker Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6">
                <Link href="/auth/register">
                  <UserPlus className="h-4 w-4" />
                  Join as a Worker
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-3 text-sm font-medium text-slate-600 sm:flex-row sm:flex-wrap">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <span className="text-base">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-shadow relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
              alt="Professional worker in uniform"
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Verified local experts</p>
                  <p className="text-sm text-slate-600">Available today for home and business needs</p>
                </div>
                <div className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-white">
                  4.9/5 Rated
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Popular Services</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Choose the service you need</h2>
            </div>
            <Link href="/services" className="text-sm font-semibold text-primary hover:underline">
              Explore all workers →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-slate-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Three simple steps to book trusted help</h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-xl lg:grid-cols-[1fr_0.7fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">Why customers choose nint</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Premium service, real trust and fast response</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              From urgent repairs to routine maintenance, every worker is verified and ready to support your home or business with transparent pricing.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-6 w-6 text-emerald-400" />
              <div>
                <p className="font-semibold">Verified professionals</p>
                <p className="text-sm text-slate-300">Every profile is reviewed before listing</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Clock3 className="h-6 w-6 text-emerald-400" />
              <div>
                <p className="font-semibold">Same-day availability</p>
                <p className="text-sm text-slate-300">Most jobs are confirmed within minutes</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <MapPin className="h-6 w-6 text-emerald-400" />
              <div>
                <p className="font-semibold">Local coverage</p>
                <p className="text-sm text-slate-300">Find workers close to your neighborhood</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-slate-900">nint.co.in</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">Trusted marketplace for local workers and premium home services across India.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/services" className="hover:text-primary">Find Workers</Link></li>
              <li><a href="#how-it-works" className="hover:text-primary">How it works</a></li>
              <li><a href="#about" className="hover:text-primary">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Services</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Electrician</li>
              <li>Plumber</li>
              <li>Home Cleaning</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Follow</h3>
            <div className="mt-3 flex items-center gap-3 text-slate-600">
              <a href="#" className="rounded-full border border-slate-200 p-2 hover:border-primary hover:text-primary"><Globe2 className="h-4 w-4" /></a>
              <a href="#" className="rounded-full border border-slate-200 p-2 hover:border-primary hover:text-primary"><Send className="h-4 w-4" /></a>
              <a href="#" className="rounded-full border border-slate-200 p-2 hover:border-primary hover:text-primary"><MessageCircle className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} nint.co.in. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" /> Rated 4.9/5</span>
            <span className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-emerald-500" /> WhatsApp booking</span>
          </div>
        </div>
      </footer>
    </main>
  );
}