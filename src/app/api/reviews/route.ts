import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({ where: { id: parsed.data.bookingId } });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const review = await prisma.review.create({
      data: {
        bookingId: booking.id,
        authorId: session.user.id,
        workerId: booking.workerId,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
      },
    });

    return NextResponse.json({ review });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Review creation failed" }, { status: 500 });
  }
}
