"use server";
import prisma from "../../db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { renderError } from "@/lib/utils";
import { hash } from "bcryptjs";
import { Role } from "@/app/generated/prisma";
import { signupHTMLTemplate } from "@/lib/emails/InviteEmail";
import sendEmail from "@/lib/emails/sendEmail";
import { error } from "console";
// Student Management
export async function createStudent(
  name: string,
  dateOfBirth: Date | null,
  classId: string,
  parentEmail: string
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }

  // Check if parent exists
  let parentUser = await prisma.user.findUnique({
    where: { email: parentEmail },
    include: { parent: true },
  });

  // If no parent user exists, create one
  if (!parentUser) {
    // Auto-generate password (could be sent via email in production)
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(tempPassword, 10);

    parentUser = await prisma.user.create({
      data: {
        email: parentEmail,
        password: hashedPassword,
        name: "Parent", // Default name
        role: Role.PARENT,
        parent: {
          create: {},
        },
      },
      include: { parent: true },
    });
    const link = `${process.env.NEXTAUTH_URL}/auth/login`;
    const message = signupHTMLTemplate(name, parentEmail, tempPassword, link);
    // In production: send email with credentials

    try {
      await sendEmail({
        email: parentEmail,
        subject: "BrightPath App invite",
        message,
      });
    } catch (error) {
      return renderError(error);
    }
  }
  // If user exists but has no parent profile
  else if (!parentUser.parent) {
    await prisma.parent.create({
      data: {
        userId: parentUser.id,
      },
    });

    // Refresh parent data
    parentUser = await prisma.user.findUnique({
      where: { id: parentUser.id },
      include: { parent: true },
    });
  }

  if (!parentUser?.parent?.userId) {
    return {
      status: false,
      message: "Failed to find or create parent profile",
    };
  }

  // Create student and link to parent and class
  const student = await prisma.student.create({
    data: {
      name,
      dateOfBirth,
      classId,
      parentId: parentUser.parent.userId, // Now we know this exists
    },
  });

  revalidatePath(`/dashboard/teacher/students`);
  return { status: true, message: " student created successfully" };
}

export async function getStudentsForClass(classId?: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "TEACHER") {
      throw new Error("Unauthorized");
    }

    // Get teacher profile
    const userWithTeacher = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { teacher: true },
    });

    if (!userWithTeacher?.teacher) {
      throw new Error("Teacher profile not found");
    }

    // Get the teacher's classes
    const teacherClasses = await prisma.class.findMany({
      where: {
        teacherId: userWithTeacher.teacher.userId,
      },
      select: {
        id: true,
      },
    });

    const classIds = teacherClasses.map((c) => c.id);

    // If classId is provided, verify it belongs to teacher
    if (classId) {
      if (!classIds.includes(classId)) {
        return {
          status: false,
          message: "Class not found or unauthorized",
        };
      }

      // Use the specific class
      const students = await prisma.student.findMany({
        where: {
          classId,
        },
        include: {
          class: {
            select: {
              name: true,
            },
          },
          parent: {
            include: {
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });

      // Transform data for simpler frontend usage
      const formattedStudents = students.map((student) => ({
        ...student,
        className: student.class.name,

        parentEmail: student.parent?.user?.email || "Unknown",
      }));

      return { status: true, data: formattedStudents };
    }

    // If no classId provided, get all students from all teacher's classes
    const students = await prisma.student.findMany({
      where: {
        classId: {
          in: classIds,
        },
      },
      include: {
        class: {
          select: {
            name: true,
          },
        },
        parent: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Transform data for simpler frontend usage
    const formattedStudents = students.map((student) => ({
      ...student,
      className: student.class.name,
      parentEmail: student.parent?.user?.email || "Unknown",
    }));

    return { status: true, data: formattedStudents };
  } catch (error) {
    return renderError(error);
  }
}
