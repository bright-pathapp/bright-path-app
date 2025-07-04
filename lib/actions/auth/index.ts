"use server";

import { Role } from "@/app/generated/prisma";
import prisma from "../../db";
import bcrypt from "bcryptjs";
import { renderError } from "@/lib/utils";

export async function createUser(
  name: string,
  email: string,
  password: string,
  role: Role
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email in use");
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        ...(role === Role.TEACHER && {
          teacher: {
            create: {},
          },
        }),
        //   ...(role === Role.PARENT && {
        //     parent: {
        //       create: {}
        //     }
        //   })
      },
      include: {
        teacher: true,
        //   parent: true
      },
    });

    return {
      status: true,
      message: "User created successfully",
    };
  } catch (error) {
    return renderError(error);
  }
}
