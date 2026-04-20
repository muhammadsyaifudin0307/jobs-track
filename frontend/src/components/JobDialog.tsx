import type { JobData } from "@/types/JobDataType";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

type DialogType = "create" | "edit" | "delete" | "view";

interface JobDialogProps {
  open: boolean;
  onChange: (open: boolean) => void;
  selected: JobData | null;
  type: DialogType;
  jobId: number | string;
  onSubmit?: (data: any) => void;
  onDelete?: (id: number | string) => void;
}
function JobDialog({
  open,
  onChange,
  selected,
  type,
  jobId,
  onDelete,
  onSubmit,
}: JobDialogProps) {
  const isReadOnly = type === "view";
  const isDelete = type === "delete";

  const DIALOG_CONTENT = {
    create: {
      title: "Create New Job",
      description: "Fill in the details below to create new job",
    },
    edit: {
      title: "Edit Job Details",
      description: "Upadate the job information and save changes",
    },
    view: {
      title: "Job Details",
      description: "Review the job information below",
    },
    delete: {
      title: "Delete Job",
      description:
        "Are you sure want to delete this job? This action cannot be undone",
    },
  };

  const formFields = [
    {
      name: "companyName",
      label: "Company",
      type: "text",
      placeholder: "Nama Perusahaan",
    },
    {
      name: "jobDesk",
      label: "Job Desk",
      type: "text",
      placeholder: "Posisi Pekerjaan",
    },
    {
      name: "jobTypes",
      label: "Job Types",
      type: "select",
      options: [
        "Full-time",
        "Part-time",
        "Contract",
        "Freelance",
        "Internship",
      ],
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "Lokasi",
    },
    {
      name: "applyDate",
      label: "Apply Date",
      type: "date",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      option: [
        "Saved",
        "Applied",
        "Screening",
        "Assessment",
        "Interview",
        "Offered",
        "Hired",
        "Rejected",
        "Ghosted",
      ],
    },
  ];

  const { title, description } = type
    ? DIALOG_CONTENT[type]
    : { title: "", description: "" };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 py-4 text-sm ">
          {formFields.map((field, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="font-medium text-muted-foreground">
                {field.label}
              </span>
              <span className="font-semibold">
                {(selected?.[field.name] as string) || "-"}
              </span>
            </div>
          ))}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant="default">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default JobDialog;
