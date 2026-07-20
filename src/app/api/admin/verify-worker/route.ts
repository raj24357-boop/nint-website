import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const workerId = typeof body.workerId === "string" ? body.workerId.trim() : "";

  if (!workerId) {
    return NextResponse.json({ error: "workerId is required" }, { status: 400 });
  }

  const worker = await prisma.worker.update({
    where: { id: workerId },
    data: {
      isVerified: true,
      status: "VERIFIED",
    },
  });

  return NextResponse.json({ success: true, worker });
}