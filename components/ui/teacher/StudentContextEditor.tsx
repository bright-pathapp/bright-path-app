"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/ui/pageHeader/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createMoodReport, updateMoodContext } from "@/lib/actions/moods";
import toast from "react-hot-toast";

const MOOD_TYPES = {
  SAD: { label: "Sad", emoji: "😢", color: "border-blue-500 bg-blue-50" },
  ANGRY: { label: "Angry", emoji: "😠", color: "border-red-500 bg-red-50" },
};

export default function StudentContextEditor({
  students,
  classId,
}: {
  students: any[];
  classId: string;
}) {
  const router = useRouter();

  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const [context, setContext] = useState("");
  const [savingContext, setSavingContext] = useState(false);
  const [localStudents, setLocalStudents] = useState(students);
  const [savingReport, setSavingReport] = useState(false);
  const openContextModal = (student: any) => {
    setSelectedStudent(student);
    // Pre-fill context if it exists
    if (student.moodRecords && student.moodRecords.length > 0) {
      setContext(student.moodRecords[0].context || "");
    } else {
      setContext("");
    }
    setIsContextModalOpen(true);
  };

  const handleSaveContext = async () => {
    if (
      !selectedStudent ||
      !selectedStudent.moodRecords ||
      selectedStudent.moodRecords.length === 0
    ) {
      return;
    }

    setSavingContext(true);

    try {
      const moodRecordId = selectedStudent.moodRecords[0].id;
      const result = await updateMoodContext(moodRecordId, context);

      if (result.success) {
        // Update local state
        setLocalStudents((students) =>
          students.map((s) => {
            if (s.id === selectedStudent.id) {
              return {
                ...s,
                moodRecords: [
                  {
                    ...s.moodRecords[0],
                    context,
                  },
                ],
              };
            }
            return s;
          })
        );

        toast.success("Context saved successfully");
        setIsContextModalOpen(false);
      } else {
        toast.error("Failed to save context");
      }
    } catch (error) {
      toast.error("An error occurred while saving context");
    } finally {
      setSavingContext(false);
    }
  };

  const handleCreateReport = async () => {
    if (localStudents.length === 0) {
      toast.error("No students with context to create a report");
      return;
    }
    setSavingReport(true);
    try {
      const result = await createMoodReport(classId);
      console.log(result, "result");
      if (result.success) {
        router.push(
          `/dashboard/teacher/mood-report?id=${result.data?.classId}`
        );
      } else if (result.existingReportId) {
        router.push(
          `/dashboard/teacher/mood-report?id=${result.existingReportId}`
        );
      } else {
        // setError(result.error);
        setSavingReport(false);
        toast.error(" Failed to create report");
      }
    } catch (err) {
      //   setError("Failed to create report");
      console.error(err);
      toast.error(" Failed to create report");
      setSavingReport(false);
    }
  };

  if (localStudents.length === 0) {
    return (
      <div className="p-8">
        <PageHeader
          title="No Students Requiring Context"
          subtitle="There are no students feeling sad or angry today."
        />
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() =>
              router.push(`/dashboard/teacher/mood-report?id=${classId}`)
            }
            className="bg-[#0089ff] hover:bg-[#0070cc] text-white"
          >
            Continue to Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Add Context for Students"
        subtitle={`${localStudents.length} student(s) feeling sad or angry today`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {localStudents.map((student) => {
          const mood = student.moodRecords[0].mood;
          const moodType = MOOD_TYPES[mood as keyof typeof MOOD_TYPES];
          const hasContext = student.moodRecords[0].context;

          return (
            <div
              key={student.id}
              className={`p-5 rounded-lg border-2 ${
                moodType?.color || "border-gray-200"
              } hover:shadow-md transition-all`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium">{student.name}</h3>
                <span className="text-3xl">{moodType?.emoji}</span>
              </div>

              <p className="mt-2 text-gray-700">
                Feeling: <span className="font-medium">{moodType?.label}</span>
              </p>

              {hasContext && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700">Context:</p>
                  <p className="text-gray-600 text-sm mt-1 bg-white p-2 rounded border border-gray-200">
                    {student.moodRecords[0].context}
                  </p>
                </div>
              )}

              <Button
                onClick={() => openContextModal(student)}
                className="mt-4 w-full bg-white border border-[#0089ff] text-[#0089ff] hover:bg-[#f0f7ff]"
              >
                {hasContext ? "Edit Context" : "Add Context"}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-[#e4e4e4] text-[#727272]"
        >
          Back
        </Button>

        <Button
          onClick={handleCreateReport}
          disabled={savingReport}
          className="bg-[#0089ff] hover:bg-[#0070cc] text-white"
        >
          {savingReport ? "Loading..." : " Create Mood Report"}
        </Button>
      </div>

      {/* Context Modal */}
      <Dialog open={isContextModalOpen} onOpenChange={setIsContextModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Add Context for {selectedStudent?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <div className="mb-4 flex items-center justify-center">
              <div
                className={`
                p-3 rounded-lg border-2 
                ${
                  selectedStudent?.moodRecords[0]?.mood === "SAD"
                    ? MOOD_TYPES.SAD.color
                    : MOOD_TYPES.ANGRY.color
                }
              `}
              >
                <span className="text-3xl">
                  {selectedStudent?.moodRecords[0]?.mood === "SAD"
                    ? MOOD_TYPES.SAD.emoji
                    : MOOD_TYPES.ANGRY.emoji}
                </span>
              </div>
            </div>

            <p className="mb-3">
              What might be causing {selectedStudent?.name} to feel
              {selectedStudent?.moodRecords[0]?.mood === "SAD"
                ? " sad"
                : " angry"}
              ?
            </p>

            <Textarea
              className="h-32 border-[#e4e4e4]"
              placeholder="Add some context about the student's mood..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setIsContextModalOpen(false)}
              className="border-[#e4e4e4]"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSaveContext}
              disabled={savingContext}
              className="bg-[#0089ff] hover:bg-[#0070cc] text-white"
            >
              {savingContext ? "Saving..." : "Save Context"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
