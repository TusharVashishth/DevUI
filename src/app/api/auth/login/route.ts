import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { loginSchema } from "@/validators/authSchema";
import { User } from "@prisma/client";
import prisma from "@/database/db.config";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(loginSchema);
    const validData = await validator.validate(body);

    //  * Check if email is exists or not
    const findUser: User | null = await prisma.user.findUnique({
      where: { email: validData.email },
    });
    if (findUser) {
      // * Check password
      const isPasswordMatch: boolean = bcrypt.compareSync(
        validData.password,
        findUser.password!
      );
      if (isPasswordMatch) {
        return NextResponse.json({
          status: 200,
          message: "You logged in successfully!",
        });
      }
      return NextResponse.json({
        status: 400,
        errors: {
          email: "Invalid Credentials",
        },
      });
    }
    return NextResponse.json(
      {
        status: 400,
        errors: { email: "No account found with this email." },
      },
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
