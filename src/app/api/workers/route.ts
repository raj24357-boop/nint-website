import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.trim();
  const city = searchParams.get("city")?.trim();
  const search = searchParams.get("search")?.trim();

  const conditions: Prisma.WorkerWhereInput[] = [
    {
      isVerified: true,
    },
  ];

  if (category) {
    conditions.push({
      services: {
        some: {
          OR: [
            { category: { slug: { equals: category, mode: "insensitive" } } },
            { category: { name: { contains: category, mode: "insensitive" } } },
            { title: { contains: category, mode: "insensitive" } },
          ],
        },
      },
    });
  }

  if (city) {
    conditions.push({
      OR: [
        { city: { contains: city, mode: "insensitive" } },
        { bio: { contains: city, mode: "insensitive" } },
        { services: { some: { description: { contains: city, mode: "insensitive" } } } },
      ],
    });
  }

  if (search) {
    conditions.push({
      OR: [
        { bio: { contains: search, mode: "insensitive" } },
        { services: { some: { title: { contains: search, mode: "insensitive" } } } },
      ],
    });
  }

  const where: Prisma.WorkerWhereInput = conditions.length > 1 ? { AND: conditions } : conditions[0];

  const workers = await prisma.worker.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      services: {
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      reviewsReceived: {
        select: {
          rating: true,
          comment: true,
          createdAt: true,
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
      skills: {
        select: {
          name: true,
          level: true,
        },
      },
    },
  });

  const payload = workers.map((worker) => {
    const ratings = worker.reviewsReceived.map((review) => review.rating);
    const averageRating = ratings.length
      ? Number((ratings.reduce((sum, value) => sum + value, 0) / ratings.length).toFixed(1))
      : 0;

    return {
      ...worker,
      rating: averageRating,
      reviewCount: worker.reviewsReceived.length,
      primaryService: worker.services[0]?.title ?? "Service professional",
    };
  });

  return NextResponse.json({ workers: payload });
}