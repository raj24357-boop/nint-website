import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "WORKER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const worker = await prisma.worker.findUnique({
    where: { userId: session.user.id },
    include: { skills: true },
  });

  return NextResponse.json({ worker });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "WORKER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const bio = typeof body.bio === "string" ? body.bio.trim() : "";
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const skillsInput = typeof body.skills === "string" ? body.skills : "";
  const whatsappNumber = typeof body.whatsappNumber === "string" ? body.whatsappNumber.trim() : "";
  const hourlyRate = Number(body.hourlyRate);

  if (!Number.isFinite(hourlyRate) || hourlyRate <= 0) {
    return NextResponse.json({ error: "A valid hourly rate is required" }, { status: 400 });
  }

  let worker = await prisma.worker.findUnique({ where: { userId: session.user.id } });

  if (!worker) {
    worker = await prisma.worker.create({
      data: {
        userId: session.user.id,
        hourlyRate,
        bio: bio || null,
        city: city || null,
        whatsappNumber: whatsappNumber || null,
        isAvailable: true,
      },
    });
  } else {
    worker = await prisma.worker.update({
      where: { id: worker.id },
      data: {
        bio: bio || null,
        city: city || null,
        hourlyRate,
        whatsappNumber: whatsappNumber || null,
      },
    });
  }

  const parsedSkills = skillsInput
    .split(",")
    .map((skill: string) => skill.trim())
    .filter(Boolean);

  await prisma.skill.deleteMany({ where: { workerId: worker.id } });

  if (parsedSkills.length) {
    await prisma.skill.createMany({
      data: parsedSkills.map((name: string) => ({
        workerId: worker.id,
        name,
        level: "Intermediate",
      })),
    });
  }

  return NextResponse.json({ success: true, worker });
}