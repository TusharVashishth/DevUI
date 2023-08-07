import prisma from "@/database/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json({ status: 200, data: post }, { status: 200 });
}
