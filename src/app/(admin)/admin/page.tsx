import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VerifyWorkerButton } from "@/components/admin/verify-worker-button";

export default async function AdminDashboardPage() {
  const [userCount, bookingCount, paymentCount, reviewCount, pendingWorkers] = await Promise.all([
    prisma.user.count(),
    prisma.booking.count(),
    prisma.payment.count(),
    prisma.review.count(),
    prisma.worker.findMany({
      where: { isVerified: false },
      include: { user: true, skills: true },
      orderBy: { createdAt: "desc" },
    }),
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
          <CardTitle>Pending worker verification</CardTitle>
          <CardDescription>Review new worker profiles before they appear publicly.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingWorkers.length ? pendingWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>{worker.user.name}</TableCell>
                  <TableCell>{worker.user.email}</TableCell>
                  <TableCell>{worker.city ?? "—"}</TableCell>
                  <TableCell>{worker.skills.map((skill) => skill.name).join(", ") || "—"}</TableCell>
                  <TableCell className="text-right">
                    <VerifyWorkerButton workerId={worker.id} />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-sm text-slate-500">
                    No pending worker profiles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
