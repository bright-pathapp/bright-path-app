"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Textarea } from "../textarea";
import { Label } from "../label";
import toast from "react-hot-toast";
import { MoodType } from "@/app/generated/prisma";
import { createMoodReport, recordStudentMood } from "@/lib/actions/moods";

const MOOD_TYPES = {
  HAPPY: { label: "Happy", emoji: "😊", color: "border-green-500 bg-green-50" },
  NEUTRAL: {
    label: "Neutral",
    emoji: "😐",
    color: "border-gray-500 bg-gray-50",
  },
  SAD: { label: "Sad", emoji: "😢", color: "border-blue-500 bg-blue-50" },
  EXCITED: {
    label: "Excited",
    emoji: "🤩",
    color: "border-yellow-500 bg-yellow-50",
  },
  TIRED: {
    label: "Tired",
    emoji: "😴",
    color: "border-purple-500 bg-purple-50",
  },
  ANGRY: { label: "Angry", emoji: "😠", color: "border-red-500 bg-red-50" },
};

const StudentGridList = ({
  students,
  classId,
}: {
  students: any[];
  classId: string;
}) => {
  const router = useRouter();

  // States for tracking student moods and UI
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [studentMoods, setStudentMoods] = useState<
    Record<string, string | null>
  >({});
  const [loading, setLoading] = useState(false);

  // Initialize studentMoods from existing records
  useEffect(() => {
    const initialMoods: Record<string, string | null> = {};
    students.forEach((student) => {
      // Use existing mood from the database if available
      const hasMoodRecord =
        student.moodRecords && student.moodRecords.length > 0;
      console.log(hasMoodRecord, " hasMoodRecord");
      initialMoods[student.id] = hasMoodRecord
        ? student.moodRecords[0].mood
        : null;
    });
    setStudentMoods(initialMoods);
  }, [students]);

  console.log(studentMoods, " studentMoods");
  console.log(students, " students");
  // Calculate sad students count from current state
  const sadStudentsCount = Object.values(studentMoods).filter(
    (mood) => mood === "SAD" || mood === "ANGRY"
  ).length;

  const handleSelectMood = async () => {
    if (!selectedStudent || !selectedMood) return;
    await saveMood(selectedStudent.id, selectedMood);
  };

  const saveMood = async (studentId: string, mood: string) => {
    setLoading(true);

    try {
      const result = await recordStudentMood(studentId, mood as MoodType);

      if (result.status === true) {
        // Update local state
        setStudentMoods((prev) => ({
          ...prev,
          [studentId]: mood,
        }));

        toast.success(`Mood recorded for ${selectedStudent?.name}`);
      } else {
        toast.error(result.message || "Failed to record mood");
      }
    } catch (error) {
      toast.error("An error occurred while recording the mood");
    } finally {
      setLoading(false);
      setIsMoodModalOpen(false);
      setSelectedMood(null);
      setSelectedStudent(null);
    }
  };

  const handleCreateReport = async () => {
    // Check if all moods are recorded
    const allRecorded = Object.values(studentMoods).every(
      (mood) => mood !== null
    );

    if (!allRecorded) {
      toast.error(
        "Please record moods for all students before creating a report"
      );
      return;
    }

    // Always calculate the current count from state rather than using a tracked variable
    const currentSadCount = Object.values(studentMoods).filter(
      (mood) => mood === "SAD" || mood === "ANGRY"
    ).length;

    if (currentSadCount > 0) {
      // Ask if teacher wants to add context to sad students
      if (
        confirm(
          `${currentSadCount} student(s) are feeling sad or angry. Would you like to add context before creating the report?`
        )
      ) {
        router.push(`/dashboard/teacher/add-context?classId=${classId}`);
        return;
      }
    }
    const result = await createMoodReport(classId);
    // console.log(result, "result");
    if (result.success) {
      router.push(`/dashboard/teacher/mood-report?id=${result.data?.classId}`);
    } else if (result.existingReportId) {
      router.push(
        `/dashboard/teacher/mood-report?id=${result.existingReportId}`
      );

      // router.push(`/dashboard/teacher/mood-report?classId=${classId}`);
    }
  };

  const getMoodStatus = (studentId: string) => {
    const mood = studentMoods[studentId];
    if (!mood) return "Not recorded";

    return MOOD_TYPES[mood as keyof typeof MOOD_TYPES]?.label || "Unknown";
  };

  const getMoodColor = (studentId: string) => {
    const mood = studentMoods[studentId];
    if (!mood) return "";

    return MOOD_TYPES[mood as keyof typeof MOOD_TYPES]?.color || "";
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Record Student Moods</h2>
        <Button
          onClick={handleCreateReport}
          className="bg-[#0089ff] hover:bg-[#0070cc] text-white"
          disabled={!Object.values(studentMoods).every((mood) => mood !== null)}
        >
          Create Class Mood Report
        </Button>
      </div>

      {/* Mood legend */}
      <div className="bg-white p-4 rounded-lg border border-[#e4e4e4] shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Mood Legend</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(MOOD_TYPES).map(([key, { emoji, label, color }]) => (
            <div
              key={key}
              className={`flex items-center p-2 rounded-lg border-2 ${color}`}
            >
              <span className="text-2xl mr-2">{emoji}</span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Student grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all
              ${getMoodColor(student.id)}
              hover:shadow-md  hover:bg-opacity-80 
            `}
            onClick={() => {
              setSelectedStudent(student);
              setIsMoodModalOpen(true);
            }}
          >
            <h3 className=" text-lg mb-2 text-black font-bold">
              {student.name}
            </h3>
            <p className="text-black font-bold text-sm">
              Mood: {getMoodStatus(student.id)}
            </p>
          </div>
        ))}
      </div>

      {/* Mood selection modal */}
      <Dialog open={isMoodModalOpen} onOpenChange={setIsMoodModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              How is {selectedStudent?.name} feeling today?
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {Object.entries(MOOD_TYPES).map(
              ([key, { emoji, label, color }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedMood(key)}
                  className={`
                    flex flex-col items-center p-3 rounded-lg border-2 transition-all
                    ${selectedMood === key ? color : "border-[#e4e4e4]"}
                    hover:bg-gray-50
                  `}
                >
                  <div className="text-3xl mb-2">{emoji}</div>
                  <div className="text-sm font-medium">{label}</div>
                </button>
              )
            )}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsMoodModalOpen(false);
                setSelectedMood(null);
              }}
              className="border-[#e4e4e4]"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSelectMood}
              disabled={!selectedMood || loading}
              className="bg-[#0089ff] hover:bg-[#0070cc] text-white"
            >
              {loading ? "Saving..." : "Confirm Mood"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentGridList;
