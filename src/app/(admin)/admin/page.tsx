import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  const [userCount, bookingCount, paymentCount, reviewCount] = await Promise.all([
    prisma.user.count(),
    prisma.booking.count(),
    prisma.payment.count(),
    prisma.review.count(),
  ]);

  const revenue = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: "PAID" },
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>All registered accounts</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{userCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
            <CardDescription>All service requests</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{bookingCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Paid through platform</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">₹{revenue._sum.amount ?? 0}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>Customer feedback</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{reviewCount}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform overview</CardTitle>
          <CardDescription>Key summary of marketplace activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Payments captured</p>
              <p className="mt-2 text-2xl font-semibold">{paymentCount}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Operational health</p>
              <p className="mt-2 text-2xl font-semibold">Stable</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
