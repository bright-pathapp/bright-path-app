"use client";
import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useGenericSubmitHandler } from "@/hooks/useGenericSubmitHandler";
import toast from "react-hot-toast";
import { createClass } from "@/lib/actions/classes";
const AddClassModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const res = await createClass(data.className, data.description);

    if (res?.status === false) {
      return toast.error(res?.message);
    }

    if (res?.status === true) {
      setIsModalOpen(false);
      toast.success("class created successfully");
    }
  });
  return (
    <div className="mt-6">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#0089ff] text-[#ffffff] hover:bg-[#4976f4] px-6">
            Add Class
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-[#000000]">Add New Class</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="className" className="text-[#000000] font-medium">
                Class Name
              </Label>
              <Input
                id="className"
                name="className"
                // value={formData.className}
                // onChange={(e) => handleInputChange("className", e.target.value)}
                placeholder="Enter class name"
                className="border-[#e4e4e4] focus:border-[#0089ff]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-[#000000] font-medium"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                // value={formData.description}
                // onChange={(e) =>
                //   handleInputChange("description", e.target.value)
                // }
                placeholder="Enter description"
                className="border-[#e4e4e4] focus:border-[#0089ff] min-h-[100px]"
                required
              />
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
                {loading ? "Loading..." : "Add Class"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddClassModal;
