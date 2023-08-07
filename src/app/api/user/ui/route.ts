import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { uiSchema } from "@/validators/uiSchema";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { imagevalidator } from "@/validators/imageValidator";
import { writeFile } from "fs/promises";
import { join } from "path";
import { getRandomNumber } from "@/lib/utils";
import prisma from "@/database/db.config";
import { getServerSession } from "next-auth";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "UnAuthorized" });
  }

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
    where: {
      user_id: Number(session.user?.id),
    },
  });

  return NextResponse.json({ status: 200, data: posts }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: 401, message: "UnAuthorized" });
    }
    const formData = await request.formData();
    const file = formData.get("image") as Blob | null;

    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: file?.name,
      user_id: formData.get("user_id"),
    };

    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(uiSchema);
    const validData = await validator.validate(body);
    const isImgValid: string | null = imagevalidator(file?.name, file?.size);
    if (isImgValid) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            image: isImgValid,
          },
        },
        { status: 200 }
      );
    }
    // * Upload image
    const buffer = Buffer.from(await file!.arrayBuffer());
    const relativeUploadDir = `/uploads`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      const uniqueNmae = Date.now() + "_" + getRandomNumber(1, 999999);
      const imgExt = file?.name.split(".");
      const filename = uniqueNmae + "." + imgExt?.[1];
      await writeFile(`${uploadDir}/${filename}`, buffer);

      const newUI = await prisma.post.create({
        data: {
          title: validData.title,
          description: validData.description,
          user_id: Number(validData.user_id),
          image: filename,
        },
      });

      return NextResponse.json({ status: 200, post: newUI }, { status: 200 });
    } catch (error) {
      console.error("Error while trying to upload a file\n", error);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      // array created by SimpleErrorReporter
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}

// * Image validator
