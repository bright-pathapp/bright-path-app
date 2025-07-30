"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { renderError } from "@/lib/utils";

export async function getSharedReports() {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session || session.user.role !== "PARENT") {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // Get parent profile ID
    const parent = await prisma.parent.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!parent) {
      return {
        success: false,
        message: "Parent profile not found",
      };
    }

    // Get all students associated with this parent
    const studentsIds = await prisma.student.findMany({
      where: {
        parentId: parent.id,
      },
      select: {
        id: true,
      },
    });

    const studentIdArray = studentsIds.map((s) => s.id);

    // Get all report sharings for this parent's students
    const reportSharings = await prisma.reportSharing.findMany({
      where: {
        parentId: parent.id,
      },
      include: {
        moodReport: {
          include: {
            class: {
              include: {
                teacher: {
                  include: {
                    user: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        sharedAt: "desc",
      },
    });

    return {
      success: true,
      data: reportSharings,
    };
  } catch (error) {
    return renderError(error);
  }
}

// export async function getSharedReportDetails(reportId: string) {
//   try {
//     const session = await getServerSession(authOptions);

//     // Check authentication
//     if (!session || session.user.role !== "PARENT") {
//       return {
//         success: false,
//         message: "Unauthorized",
//       };
//     }

//     // Get parent profile ID
//     const parent = await prisma.parent.findFirst({
//       where: {
//         userId: session.user.id,
//       },
//     });

//     if (!parent) {
//       return {
//         success: false,
//         message: "Parent profile not found",
//       };
//     }

//     // Check if this report is shared with the parent
//     const reportSharing = await prisma.reportSharing.findFirst({
//       where: {
//         reportId: reportId,
//         parentId: parent.id,
//       },
//       include: {
//         report: {
//           include: {
//             class: true,
//           },
//         },
//       },
//     });

//     if (!reportSharing) {
//       return {
//         success: false,
//         message: "Report not found or not shared with you",
//       };
//     }

//     // Get student IDs for this parent
//     const students = await prisma.student.findMany({
//       where: {
//         parentId: parent.id,
//       },
//       select: {
//         id: true,
//       },
//     });

//     const studentIds = students.map(s => s.id);

//     // Get mood records for the report that belong to this parent's students
//     const moodRecords = await prisma.moodRecord.findMany({
//       where: {
//         reportId: reportId,
//         studentId: {
//           in: studentIds,
//         },
//       },
//       include: {
//         student: true,
//       },
//     });

//     return {
//       success: true,
//       data: {
//         report: reportSharing.report,
//         moodRecords: moodRecords,
//       },
//     };
//   } catch (error) {
//     return renderError(error);
//   }
// }
