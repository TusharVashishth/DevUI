import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/db.config";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "@/validators/authSchema";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { User } from ".prisma/client";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body: RegisterAPIType = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(registerSchema);
    const validData = await validator.validate(body);

    // * check if email already exist
    const findUser: User | null = await prisma.user.findUnique({
      where: {
        email: validData.email,
      },
    });
    if (findUser) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "Email is already taken please use another email.",
        },
      });
    }

    // * encrypt the password
    const salt = bcrypt.genSaltSync(10);
    validData.password = bcrypt.hashSync(validData.password, salt);

    await prisma.user.create({
      data: {
        name: validData.name,
        email: validData.email!,
        password: validData.password,
      },
    });
    return NextResponse.json(
      { status: 200, message: "User created successfully!" },
      { status: 200 }
    );
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
