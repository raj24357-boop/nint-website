"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BriefcaseBusiness, MapPin, MessageCircle, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type WorkerSummary = {
  id: string;
  bio?: string | null;
  hourlyRate: number;
  whatsappNumber?: string | null;
  isVerified: boolean;
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    price: number;
    category?: {
      name: string;
      slug: string;
    } | null;
  }>;
  skills: Array<{
    name: string;
    level: string;
  }>;
  rating: number;
  reviewCount: number;
  primaryService: string;
};

// 1. Core Logic Moved into Inner Component
function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [workers, setWorkers] = useState<WorkerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const nextCategory = searchParams.get("category") ?? "";
    const nextCity = searchParams.get("city") ?? "";
    setCategory(nextCategory);
    setCity(nextCity);

    const params = new URLSearchParams();
    if (nextCategory) params.set("category", nextCategory);
    if (nextCity) params.set("city", nextCity);

    setLoading(true);
    fetch(`/api/workers?${params.toString()}`, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setWorkers(data.workers ?? []))
      .catch(() => setWorkers([]))
      .finally(() => setLoading(false));
  }, [searchParams]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    router.push(`/services?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Find workers</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Search verified local professionals</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Filter by service and location to discover experienced workers near you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Plumber, Electrician..."
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-0"
            />
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="City or area"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-0"
            />
            <Button type="submit" className="bg-primary text-white hover:bg-blue-700">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </form>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600">
            Loading trusted workers...
          </div>
        ) : workers.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600">
            No verified workers match your filters yet. Try broadening the search.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {workers.map((worker) => (
              <Card key={worker.id} className="border-slate-200 bg-white">
                <CardHeader className="flex-row items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={worker.user.image ?? ""} alt={worker.user.name} />
                      <AvatarFallback>{worker.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{worker.user.name}</CardTitle>
                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {worker.rating.toFixed(1)} · {worker.reviewCount} reviews
                      </div>
                    </div>
                  </div>
                  {worker.isVerified ? <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">Verified</Badge> : null}
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {worker.services.slice(0, 3).map((service) => (
                      <Badge key={service.id} className="border-blue-100 bg-blue-50 text-blue-700">
                        {service.title}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm leading-7 text-slate-600">{worker.bio ?? "Available for home and commercial services with dependable support."}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4 text-primary" /> {worker.primaryService}</span>
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Nearby coverage</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {worker.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill.name} className="border-slate-200 bg-slate-50 text-slate-700">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <div>
                      <p className="text-sm text-slate-500">Starting from</p>
                      <p className="text-lg font-semibold text-slate-900">₹{worker.hourlyRate}/hr</p>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline">
                        <Link href={`/workers/${worker.id}`}>View Profile</Link>
                      </Button>
                      <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                        <a href={`https://wa.me/${(worker.whatsappNumber ?? "919999999999").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${worker.user.name}, I found your profile on nint.co.in. Are you available?`)}`} target="_blank" rel="noreferrer">
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// 2. Wrapped Export Function with Suspense
export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-slate-600">Loading page...</div>}>
      <ServicesContent />
    </Suspense>
  );
}