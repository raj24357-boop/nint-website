import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { bookingId } = await req.json();
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true }
    });

    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    if (booking.payment?.status === "PAID") return NextResponse.json({ error: "Already paid" }, { status: 400 });

    // Initialize Razorpay inside the function to prevent Vercel build errors
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(booking.totalAmount * 100),
      currency: "INR",
      receipt: booking.id,
    });

    await prisma.payment.upsert({
      where: { bookingId: booking.id },
      update: { razorpayOrderId: order.id, status: "PENDING" },
      create: {
        bookingId: booking.id,
        userId: session.user.id,
        amount: booking.totalAmount,
        razorpayOrderId: order.id,
        status: "PENDING",
      }
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}