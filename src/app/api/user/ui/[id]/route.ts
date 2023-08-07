import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/database/db.config";
import { join } from "path";
import { rmSync } from "fs";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { status: 401, message: "Un Auhtorized" },
        { status: 200 }
      );
    }
    const post = await prisma.post.findUnique({
      where: {
        id: Number(params.id),
      },
      select: {
        image: true,
        id: true,
      },
    });

    // * Delete the image from
    const relativeUploadDir = `/uploads`;
    const dir = join(process.cwd(), "public", relativeUploadDir);
    const path: string = dir + "/" + post?.image;
    rmSync(path, { force: true });

    await prisma.post.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(
      { status: 200, message: "Post Deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error?.message },
      { status: 200 }
    );
  }
}
