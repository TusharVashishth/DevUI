import prisma from "@/database/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json({ status: 200, data: posts }, { status: 200 });
}
