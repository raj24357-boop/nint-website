import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CustomerDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const customer = await prisma.customer.findUnique({
    where: { userId: session.user.id },
    include: {
      bookings: {
        include: { service: true, worker: { include: { user: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  const totalSpent = customer?.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0) ?? 0;
  const savedWorkers = await prisma.savedWorker.count({ where: { customerId: customer?.id ?? "" } });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Bookings</CardTitle>
            <CardDescription>Current service requests</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{customer?.bookings.filter((booking) => booking.status !== "COMPLETED" && booking.status !== "CANCELLED").length ?? 0}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>Across all completed bookings</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">₹{totalSpent}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saved Workers</CardTitle>
            <CardDescription>Shortlisted professionals</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{savedWorkers}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent bookings</CardTitle>
          <CardDescription>Your latest service requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customer?.bookings.length ? customer.bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">{booking.service.title}</p>
                  <p className="text-sm text-slate-500">{booking.worker.user.name}</p>
                </div>
                <div className="text-right text-sm text-slate-600">
                  <p>₹{booking.totalAmount}</p>
                  <p className="capitalize">{booking.status.toLowerCase()}</p>
                </div>
              </div>
            )) : <p className="text-sm text-slate-500">No bookings yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
