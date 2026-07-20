import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, MessageCircle, Star, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";

type WorkerProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkerProfilePage({ params }: WorkerProfilePageProps) {
  const { id } = await params;

  const worker = await prisma.worker.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      services: {
        include: {
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      skills: true,
      reviewsReceived: {
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!worker) {
    notFound();
  }

  const ratings = worker.reviewsReceived.map((review) => review.rating);
  const averageRating = ratings.length
    ? Number((ratings.reduce((sum, value) => sum + value, 0) / ratings.length).toFixed(1))
    : 0;

  const whatsappNumber = worker.whatsappNumber?.replace(/[^0-9]/g, "") || "919999999999";
  const message = `Hi ${worker.user.name}, I found your profile on nint.co.in for ${worker.services[0]?.title ?? "service"}. Are you available?`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={worker.user.image ?? ""} alt={worker.user.name} />
                <AvatarFallback>{worker.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{worker.user.name}</CardTitle>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {averageRating.toFixed(1)}</span>
                  {worker.isVerified ? <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">Verified</Badge> : null}
                </div>
              </div>
            </div>
            <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Book via WhatsApp
              </a>
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">About</p>
              <p className="mt-3 text-sm leading-8 text-slate-600">{worker.bio ?? "Certified professional delivering dependable service with transparent rates and rapid response."}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Hourly rate</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">₹{worker.hourlyRate}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Experience</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{worker.experience} yrs</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {worker.skills.map((skill) => (
                  <Badge key={skill.name} className="border-slate-200 bg-slate-50 text-slate-700">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Services</p>
              <div className="mt-3 space-y-3">
                {worker.services.map((service) => (
                  <div key={service.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{service.title}</p>
                        <p className="text-sm text-slate-600">{service.description}</p>
                      </div>
                      <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        ₹{service.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-slate-200 bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Trusted by customers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <BadgeCheck className="h-5 w-5" />
                Verified profile and transparent pricing
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Wrench className="h-5 w-5" />
                Same-day support for urgent repairs
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl">Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {worker.reviewsReceived.length === 0 ? (
                <p className="text-sm text-slate-600">No reviews yet. Be the first to share a rating.</p>
              ) : (
                worker.reviewsReceived.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.author.image ?? ""} alt={review.author.name} />
                          <AvatarFallback>{review.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{review.author.name}</p>
                          <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {review.rating}/5
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{review.comment}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Button asChild variant="outline" className="w-full">
            <Link href="/services">Back to all workers</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}