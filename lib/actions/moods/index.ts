"use server";
"use server";
import prisma from "../../db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { renderError } from "@/lib/utils";
import { MoodType } from "@/app/generated/prisma";
// Mood Recording
// Update the recordStudentMood function
export async function recordStudentMood(
  studentId: string,
  mood: MoodType,
  context?: string
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }

  // Get current date with timezone info
  const now = new Date();
  console.log("Current time:", now.toISOString());

  // Force date to be today in local timezone by adding the timezone offset
  const localDate = new Date();
  // Get local timezone offset in minutes
  const timezoneOffsetMinutes = localDate.getTimezoneOffset();

  // Create today at midnight in LOCAL time, then convert to UTC
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Add the timezone offset (if necessary)
  today.setMinutes(today.getMinutes() - timezoneOffsetMinutes);

  console.log("Today at LOCAL midnight (in UTC):", today.toISOString());
  console.log("Timezone offset in minutes:", timezoneOffsetMinutes);

  // Create tomorrow by adding 24 hours
  const tomorrow = new Date(today);
  tomorrow.setHours(tomorrow.getHours() + 24);

  console.log("Tomorrow at LOCAL midnight (in UTC):", tomorrow.toISOString());

  // Check if record already exists for today using this local date range
  const existingRecord = await prisma.moodRecord.findFirst({
    where: {
      studentId,
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  if (existingRecord) {
    console.log("Found existing record for today:", existingRecord.id);
    // Update existing record
    const updatedRecord = await prisma.moodRecord.update({
      where: {
        id: existingRecord.id,
      },
      data: {
        mood,
        context,
      },
    });

    revalidatePath(`/dashboard/teacher/mood-check`);

    return {
      status: true,
      data: updatedRecord,
      message: "Updated mood record",
    };
  }

  console.log("Creating new record for date:", today.toISOString());

  // Create new record with explicit date
  const newRecord = await prisma.moodRecord.create({
    data: {
      studentId,
      mood,
      context,
      date: today, // Using our adjusted date
    },
  });

  revalidatePath(`/dashboard/teacher/mood-check`);
  return { status: true, data: newRecord, message: "Added mood record" };
}

export async function updateMoodContext(moodRecordId: string, context: string) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }

  const updatedMoodRecord = await prisma.moodRecord.update({
    where: {
      id: moodRecordId,
    },
    data: {
      context,
    },
  });
  revalidatePath(`/dashboard/teacher/add-context`);
  return { success: true, data: updatedMoodRecord };
}

export async function createMoodReport(classId: string, notes?: string) {
  // Verify authentication
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Force date to be today in local timezone by adding the timezone offset
    const localDate = new Date();
    // Get local timezone offset in minutes
    const timezoneOffsetMinutes = localDate.getTimezoneOffset();

    // Create today at midnight in LOCAL time, then convert to UTC
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Add the timezone offset (if necessary)
    today.setMinutes(today.getMinutes() - timezoneOffsetMinutes);

    console.log("Today at LOCAL midnight (in UTC):", today.toISOString());

    // Create tomorrow by adding 24 hours
    const tomorrow = new Date(today);
    tomorrow.setHours(tomorrow.getHours() + 24);

    console.log(
      "Looking for records between:",
      today.toISOString(),
      "to",
      tomorrow.toISOString()
    );

    // Step 1: Check for existing report
    const existingReport = await prisma.moodReport.findFirst({
      where: {
        classId,
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (existingReport) {
      console.log(
        "Report already exists for today with ID:",
        existingReport.id
      );
      return {
        success: false,
        error: "A report already exists for today",
        existingReportId: existingReport.id,
      };
    }

    // Step 2: Get all mood records for today
    const todaysMoodRecords = await prisma.moodRecord.findMany({
      where: {
        student: {
          classId,
        },
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            dateOfBirth: true,
            classId: true,
          },
        },
      },
    });

    console.log(`Found ${todaysMoodRecords.length} mood records for today`);

    if (todaysMoodRecords.length === 0) {
      return {
        success: false,
        error: "No mood records found for today",
      };
    }

    // Step 3: Filter out any records that already have a moodReportId
    const availableRecords = todaysMoodRecords.filter(
      (record) => !record.moodReportId
    );

    console.log(
      `${availableRecords.length} records available to add to report`
    );

    if (availableRecords.length === 0) {
      return {
        success: false,
        error: "All mood records for today are already part of another report",
      };
    }

    // Step 4: Create the report
    const report = await prisma.moodReport.create({
      data: {
        classId,
        notes,
        date: today, // Explicitly set date to beginning of day
        moodRecords: {
          connect: availableRecords.map((record) => ({ id: record.id })),
        },
      },
      include: {
        class: true,
        moodRecords: {
          include: {
            student: true,
          },
        },
      },
    });

    console.log("Report created successfully with ID:", report.id);

    // Revalidate relevant paths
    revalidatePath(`/dashboard/teacher/mood-report`);
    revalidatePath(`/dashboard/teacher/class/${classId}`);

    return {
      success: true,
      data: report,
    };
  } catch (error: any) {
    console.error("Error creating mood report:", error);
    return {
      success: false,
      error: error.message || "Failed to create mood report",
    };
  }
}

export async function getMoodReports(classId: string) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "TEACHER") {
    return { error: "Unauthorized" };
  }

  const reports = await prisma.moodReport.findMany({
    where: {
      classId,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      class: true,
      _count: {
        select: {
          moodRecords: true,
          reportSharings: true,
        },
      },
    },
  });

  return { success: true, data: reports };
}

export async function getAllMoodReports() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const reports = await prisma.moodReport.findMany({
      where: {
        class: {
          teacher: {
            userId: session.user.id,
          },
        },
      },
      include: {
        class: true,
        _count: {
          select: {
            moodRecords: true,
            reportSharings: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return {
      success: true,
      data: reports,
    };
  } catch (error: any) {
    console.error("Error fetching all mood reports:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch mood reports",
    };
  }
}

export async function getReportDetails(reportId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "Unauthorized" };
  }

  const report = await prisma.moodReport.findUnique({
    where: {
      id: reportId,
    },
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
      moodRecords: {
        include: {
          student: {
            include: {
              parent: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      reportSharings: {
        include: {
          parent: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!report) {
    return { error: "Report not found" };
  }

  // For teachers, check if they own the class
  if (session.user.role === "TEACHER") {
    // Get teacher profile
    const userWithTeacher = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { teacher: true },
    });

    if (
      !userWithTeacher?.teacher ||
      report.class.teacherId !== userWithTeacher.teacher.userId
    ) {
      return { error: "Unauthorized" };
    }

    // Return the report with isTeacher flag
    return {
      success: true,
      data: {
        ...report,
        isTeacher: true, // Explicitly add the flag
        isParent: false,
      },
    };
  }

  // For parents, filter to only show their child's records
  if (session.user.role === "PARENT") {
    // Get parent profile
    const userWithParent = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { parent: true },
    });

    if (!userWithParent?.parent) {
      return { error: "Parent profile not found" };
    }

    const isSharedWithParent = report.reportSharings.some(
      (sharing) =>
        userWithParent.parent &&
        sharing.parentId === userWithParent.parent.userId
    );

    if (!isSharedWithParent) {
      return { error: "Report not shared with you" };
    }

    // Filter records to only show this parent's children
    const filteredRecords = report.moodRecords.filter(
      (record) =>
        userWithParent.parent &&
        record.student.parentId === userWithParent.parent.userId
    );

    if (filteredRecords.length === 0) {
      return { error: "No records found for your child" };
    }

    // Return only class metadata and filtered records with isParent flag
    return {
      success: true,
      data: {
        id: report.id,
        date: report.date,
        class: {
          name: report.class.name,
          teacher: {
            user: {
              name: report.class.teacher.user.name,
            },
          },
        },
        moodRecords: filteredRecords,
        isTeacher: false,
        isParent: true, // Explicitly add the flag
      },
    };
  }

  return { error: "Unauthorized" };
}
