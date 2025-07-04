"use server";
import prisma from "../../db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { renderError } from "@/lib/utils";
export async function createClass(name: string, description?: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "TEACHER") {
      throw new Error("Unauthorized");
      //   return { error: "Unauthorized" };
    }

    // Get the teacher profile ID
    const userWithTeacher = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { teacher: true },
    });

    if (!userWithTeacher?.teacher) {
      throw new Error("Teacher profile not found");
      //   return { error: "Teacher profile not found" };
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        description,
        teacherId: userWithTeacher.teacher.userId,
      },
    });

    revalidatePath("/dashboard/teacher");
    return { status: true, message: " class created successfully" };
  } catch (error) {
    return renderError(error);
  }
}

export async function getClassesForTeacher() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "TEACHER") {
      throw new Error("Unauthorized");
    }

    // Get the teacher profile ID
    const userWithTeacher = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { teacher: true },
    });

    if (!userWithTeacher?.teacher) {
      throw new Error("Teacher profile not found");
    }

    const classes = await prisma.class.findMany({
      where: {
        teacherId: userWithTeacher.teacher.userId,
      },
      include: {
        teacher: {
          include: {
            user: {
              select: { name: true },
            },
          },
        },
        _count: {
          select: { students: true },
        },
      },
    });

    // Flatten result for frontend
    const result = classes.map((cls) => ({
      ...cls,
      teacherName: cls.teacher?.user?.name ?? "",
      studentCount: cls._count.students,
    }));

    return { success: true, data: result };
  } catch (error) {
    return renderError(error);
  }
}
