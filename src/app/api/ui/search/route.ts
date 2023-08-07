import prisma from "@/database/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  console.log("The query is", query);
  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: query ?? "",
      },
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
