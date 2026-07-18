import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const customer = await prisma.customer.findUnique({ where: { userId: session.user.id } });
    if (!customer) {
      return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });
    }

    const address = await prisma.address.create({
      data: {
        userId: session.user.id,
        line1: parsed.data.address.line1,
        line2: parsed.data.address.line2 ?? null,
        city: parsed.data.address.city,
        state: parsed.data.address.state,
        pincode: parsed.data.address.pincode,
      },
    });

    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        workerId: parsed.data.workerId,
        serviceId: parsed.data.serviceId,
        scheduledAt: new Date(parsed.data.scheduledAt),
        addressId: address.id,
        totalAmount: parsed.data.totalAmount,
      },
    });

    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        userId: session.user.id,
        amount: parsed.data.totalAmount,
        status: "PENDING",
      },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role === "ADMIN") {
      const bookings = await prisma.booking.findMany({ include: { service: true, customer: { include: { user: true } }, worker: { include: { user: true } } }, orderBy: { createdAt: "desc" } });
      return NextResponse.json({ bookings });
    }

    if (session.user.role === "WORKER") {
      const worker = await prisma.worker.findUnique({ where: { userId: session.user.id } });
      if (!worker) {
        return NextResponse.json({ error: "Worker profile not found" }, { status: 404 });
      }
      const bookings = await prisma.booking.findMany({ where: { workerId: worker.id }, include: { service: true, customer: { include: { user: true } } }, orderBy: { createdAt: "desc" } });
      return NextResponse.json({ bookings });
    }

    const customer = await prisma.customer.findUnique({ where: { userId: session.user.id } });
    if (!customer) {
      return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });
    }
    const bookings = await prisma.booking.findMany({ where: { customerId: customer.id }, include: { service: true, worker: { include: { user: true } } }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
