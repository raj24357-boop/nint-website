import Link from "next/link";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  { name: "Cleaning", description: "Home, office, and deep cleaning" },
  { name: "Repairs", description: "Plumbers, electricians, and carpenters" },
  { name: "Beauty", description: "Salon at home, makeup, and grooming" },
  { name: "Tutoring", description: "Academic and skill coaching" },
];

const workers = [
  { name: "Riya Sharma", role: "Cleaner", rating: "4.9" },
  { name: "Arjun Patel", role: "Electrician", rating: "4.8" },
  { name: "Meera Das", role: "Beauty Expert", rating: "4.7" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Book trusted help in minutes
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Find skilled professionals for every task in your city.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                From home repairs to beauty services, nint.co.in connects customers with verified workers in a seamless marketplace experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg">
                    How it works
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
                <div><strong className="text-slate-900">10k+</strong> bookings</div>
                <div><strong className="text-slate-900">4.9/5</strong> rating</div>
                <div><strong className="text-slate-900">24/7</strong> support</div>
              </div>
            </div>

            <Card className="p-6 shadow-lg">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">Book your next service</CardTitle>
                <CardDescription>Search, compare, and confirm in a few clicks.</CardDescription>
              </CardHeader>
              <CardContent className="mt-6 p-0">
                <div className="space-y-3">
                  <input className="h-11 w-full rounded-lg border border-slate-200 px-3" placeholder="What do you need?" />
                  <input className="h-11 w-full rounded-lg border border-slate-200 px-3" placeholder="City or locality" />
                  <Button className="w-full">Search Services</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Popular categories</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Browse the most requested services</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Card key={category.name} className="transition-transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Featured workers</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Top-rated professionals near you</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {workers.map((worker) => (
              <Card key={worker.name}>
                <CardHeader>
                  <CardTitle>{worker.name}</CardTitle>
                  <CardDescription>{worker.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>⭐ {worker.rating}</span>
                    <Button size="sm">View Profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900 p-8 text-white sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold">Three simple steps to get your job done</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                ["1", "Tell us what you need"],
                ["2", "Choose a verified worker"],
                ["3", "Book and pay securely"],
              ].map(([step, title]) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/10 p-6">
                  <div className="text-3xl font-semibold text-primary">{step}</div>
                  <p className="mt-3 text-lg font-medium">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary to-secondary text-white">
            <CardContent className="p-10">
              <h2 className="text-3xl font-semibold">Ready to simplify your next service booking?</h2>
              <p className="mt-4 max-w-2xl text-white/90">
                Join thousands of customers and workers building better local service experiences with nint.co.in.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/register">
                  <Button className="bg-white text-primary hover:bg-slate-100">Create account</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                    Sign in
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
