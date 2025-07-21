"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenericSubmitHandler } from "@/hooks/useGenericSubmitHandler";
import toast from "react-hot-toast";
import { createStudent } from "@/lib/actions/students";
import { getClassesForTeacher } from "@/lib/actions/classes";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AddStudentModal = ({ classes }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError(null);
    return true;
  };
  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    if (!validateEmail(data.parentEmail)) {
      return "Use Valid Email";
    }
    // Convert date to Date object if selected
    const dateOfBirth = date ? new Date(date) : null;

    const res = await createStudent(
      data.name,
      dateOfBirth,
      data.classId,
      data.parentEmail
    );

    if (res?.status === false) {
      return toast.error(res?.message || "Failed to create student");
    }

    if (res?.status === true) {
      setIsModalOpen(false);
      toast.success("Student created successfully");
    }
  });
  // Handle email input change and validate on blur
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateEmail(e.target.value);
  };

  return (
    <div className="">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#0089ff] text-[#ffffff] hover:bg-[#4976f4] px-6">
            Add Student
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-[#000000]">
              Add New Student
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#000000] font-medium">
                Student Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter student name"
                className="border-[#e4e4e4] focus:border-[#0089ff]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="text-[#000000] font-medium">
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dob"
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-[#e4e4e4] focus:border-[#0089ff]"
                  >
                    {date ? format(date, "PPP") : <span>Select date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name="dateOfBirth"
                value={date ? format(date, "yyyy-MM-dd") : ""}
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="classId" className="text-[#000000] font-medium">
                Class
              </Label>
              <Select name="classId" required>
                <SelectTrigger className="border-[#e4e4e4] focus:border-[#0089ff] w-full">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.length > 0 ? (
                    classes.map((cls: any) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-classes" disabled>
                      No classes available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="parentEmail"
                className="text-[#000000] font-medium"
              >
                Parent Email
              </Label>
              <Input
                id="parentEmail"
                name="parentEmail"
                type="email"
                placeholder="Enter parent's email"
                className={`border-[#e4e4e4] focus:border-[#0089ff] ${
                  emailError ? "border-red-500" : ""
                }`}
                required
                onBlur={handleEmailBlur}
                onChange={() => emailError && setEmailError(null)}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="border-[#e4e4e4] text-[#727272] hover:bg-[#f9f9f9]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#0089ff] text-[#ffffff] hover:bg-[#4976f4]"
              >
                {loading ? "Loading..." : "Add Student"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddStudentModal;
