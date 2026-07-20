import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function WorkerDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const worker = await prisma.worker.findUnique({
    where: { userId: session.user.id },
    include: {
      skills: true,
      bookings: {
        include: { service: true, customer: { include: { user: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  const totalEarnings = worker?.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0) ?? 0;
  const profileIncomplete = !worker?.bio || !worker?.city || !worker?.hourlyRate || !worker?.whatsappNumber || !worker?.skills.length;

  return (
    <div className="space-y-6">
      {profileIncomplete ? (
        <Card className="border-amber-200 bg-amber-50/70">
          <CardHeader>
            <CardTitle className="text-amber-900">Complete your worker profile</CardTitle>
            <CardDescription className="text-amber-800">
              Add your bio, skills, city, hourly rate, and WhatsApp number so customers can find and book you easily.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-amber-700 text-white hover:bg-amber-800">
              <Link href="/worker/dashboard/profile">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
            <CardDescription>Live service assignments</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{worker?.bookings.filter((booking) => booking.status === "ACCEPTED" || booking.status === "IN_PROGRESS").length ?? 0}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
            <CardDescription>Revenue from completed work</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">₹{totalEarnings}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
            <CardDescription>Current status</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{worker?.isAvailable ? "Available" : "Busy"}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent jobs</CardTitle>
          <CardDescription>Latest booking requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {worker?.bookings.length ? worker.bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">{booking.service.title}</p>
                  <p className="text-sm text-slate-500">{booking.customer.user.name}</p>
                </div>
                <div className="text-right text-sm text-slate-600">
                  <p>₹{booking.totalAmount}</p>
                  <p className="capitalize">{booking.status.toLowerCase()}</p>
                </div>
              </div>
            )) : <p className="text-sm text-slate-500">No jobs yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
