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

export const updateUserPassword = async ({
  newPassword,
  confirmPassword,
  userEmail,
}: {
  newPassword: string;
  confirmPassword: string;
  userEmail: string;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Hash the password before saving
    console.log(newPassword);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user with proper Prisma syntax using data object
    const updatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        password: hashedPassword,
        isFirstLogin: user.role === Role.PARENT && false,
      },
    });

    return {
      status: true,
      message: "Password updated successfully",
      updated: true,
    };
  } catch (error) {
    return renderError(error);
  }
};
