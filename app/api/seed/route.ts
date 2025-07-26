import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Role } from "@/app/generated/prisma";

// export async function POST() {

//   if (process.env.NODE_ENV === "production") {
//     return NextResponse.json(
//       { error: "This endpoint is disabled in production" },
//       { status: 403 }
//     );
//   }

//   try {

//     const adminPassword = await hash("test1234", 10);

//     const admin1 = await prisma.user.create({
//       data: {
//         email: "mybrightpathapp@gmail.com",
//         password: adminPassword,
//         role: Role.ADMIN,
//         name: "Admin bright",
//         admin: {
//           create: {},
//         },
//       },
//     });

//     await prisma.$disconnect();

//     return NextResponse.json({
//       success: true,
//       message: "Database seeded successfully",
//     });
//   } catch (error) {
//     console.error("Error during seeding:", error);

//     await prisma.$disconnect();

//     return NextResponse.json(
//       { success: false, error: "Failed to seed database", details: error },
//       { status: 500 }
//     );
//   }
// }

// Endpoint to update all parent users to have isFirstLogin=true
export async function POST() {
  // For production, you might want to add authentication
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is disabled in production" },
      { status: 403 }
    );
  }

  try {
    // Update all users with PARENT role to have isFirstLogin=true
    const updatedParents = await prisma.user.updateMany({
      where: {
        role: Role.PARENT,
      },
      data: {
        isFirstLogin: true,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: "Parent users updated successfully",
      updated: updatedParents.count,
    });
  } catch (error) {
    console.error("Error updating parent users:", error);

    await prisma.$disconnect();

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update parent users",
        details: error,
      },
      { status: 500 }
    );
  }
}
