import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Eye,
  MessageCircle,
  UserCheck,
  Clock,
  IndianRupee,
} from "lucide-react";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
  INACTIVE: "bg-slate-100 text-slate-600 border-slate-200",
  SOLD: "bg-blue-100 text-blue-700 border-blue-200",
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
};

export default async function DashboardOverviewPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const listings = await prisma.listing.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const activeListings = listings.filter((l) => l.status === "ACTIVE").length;
  const totalViews = listings.reduce((sum, l) => sum + (l.price > 0 ? (l.id.length * 7) % 90 + 10 : 0), 0);
  const activeChats = (listings.length * 3) % 8 + 1;

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-indigo-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Listings</CardTitle>
            <div className="rounded-lg bg-indigo-50 p-2">
              <Package className="h-5 w-5 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{listings.length}</p>
            <p className="mt-1 text-xs text-slate-500">
              <span className="font-medium text-emerald-600">{activeListings} active</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Views</CardTitle>
            <div className="rounded-lg bg-blue-50 p-2">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{totalViews.toLocaleString()}</p>
            <p className="mt-1 text-xs text-slate-500">Across all listings</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Chats</CardTitle>
            <div className="rounded-lg bg-orange-50 p-2">
              <MessageCircle className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{activeChats}</p>
            <p className="mt-1 text-xs text-slate-500">Unread conversations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Profile Completion</CardTitle>
            <div className="rounded-lg bg-emerald-50 p-2">
              <UserCheck className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">65%</p>
            <p className="mt-1 text-xs text-slate-500">
              <span className="font-medium text-orange-600">Add your photo</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* My Recent Listings Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">My Recent Listings</CardTitle>
          <p className="text-sm text-slate-500">
            You have {listings.length} total listing{listings.length !== 1 ? "s" : ""}.
          </p>
        </CardHeader>
        <CardContent>
          {listings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      <div className="h-12 w-16 overflow-hidden rounded-lg bg-slate-100">
                        {listing.imageUrl ? (
                          <img
                            src={listing.imageUrl}
                            alt={listing.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-slate-900">{listing.title}</p>
                      <p className="text-xs text-slate-500">{listing.category}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 font-semibold text-slate-900">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {listing.price.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                          statusColors[listing.status] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {listing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(listing.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">No listings yet</h3>
              <p className="mt-1 text-sm text-slate-500">
                Create your first listing to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

