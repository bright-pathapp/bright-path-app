import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Role } from "@/app/generated/prisma";

// Only allow this route to be called with POST method in production
export async function POST() {
  // For production, you might want to add authentication or limit this to development mode
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is disabled in production" },
      { status: 403 }
    );
  }

  //   const prisma = new PrismaClient();

  try {
    // Create Admin Users
    const adminPassword = await hash("test1234", 10);

    const admin1 = await prisma.user.create({
      data: {
        email: "mybrightpathapp@gmail.com",
        password: adminPassword,
        role: Role.ADMIN,
        name: "Admin bright",
        admin: {
          create: {},
        },
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
    });
  } catch (error) {
    console.error("Error during seeding:", error);

    await prisma.$disconnect();

    return NextResponse.json(
      { success: false, error: "Failed to seed database", details: error },
      { status: 500 }
    );
  }
}
