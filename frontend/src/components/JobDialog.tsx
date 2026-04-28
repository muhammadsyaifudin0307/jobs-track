import type { JobData } from "@/types/JobDataType";
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
import type React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import type { JobDialogProps } from "@/types/DialogType";
import { useToast } from "@/hooks/useToast";

function JobDialog({
  isOpen,
  selected,
  type,
  onDelete,
  onClose,
  onSubmit,
}: JobDialogProps) {
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

  const formFields: Array<{
    name: keyof JobData;
    label: string;
    type: "text" | "date" | "select";
    placeholder?: string;
    options?: string[];
  }> = [
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
      options: [
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

  const isFormMode = type === "create" || type === "edit";
  const toast = useToast();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Omit<JobData, "_id">;

    if (!onSubmit) return;

    toast.promise(Promise.resolve(onSubmit(data)), {
      success:
        type === "create"
          ? "Lowongan berhasil ditambahkan"
          : "Lowongan berhasil diupdate",
      error: "Terjadi kesalahan, coba lagi",
    });
  };

  if (!type) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* ─── DELETE ─── */}
        {type === "delete" && (
          <p className="py-2 text-sm text-muted-foreground">
            Tindakan ini tidak dapat dibatalkan.
          </p>
        )}

        {/* ─── FORM (create / edit) ─── */}
        {isFormMode && (
          <form
            id="job-form"
            onSubmit={handleSubmitForm}
            className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 md:gap-6"
          >
            {formFields.map((field) => (
              <div key={field.name} className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-muted-foreground"
                >
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <Select
                    name={field.name}
                    defaultValue={selected?.[field.name] as string}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder={`Choose ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    defaultValue={selected?.[field.name] as string}
                    required
                  />
                )}
              </div>
            ))}
          </form>
        )}

        {/* ─── VIEW ─── */}
        {type === "view" && (
          <div className="grid grid-cols-1 gap-4 py-4 text-sm md:grid-cols-2 md:gap-6">
            {formFields.map((field) => (
              <div
                key={field.name}
                className="flex flex-col gap-1 border-b pb-2 md:border-none md:pb-0"
              >
                <span className="font-medium text-muted-foreground">
                  {field.label}
                </span>
                <span className="font-semibold text-foreground">
                  {(selected?.[field.name] as string) || "-"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ─── FOOTER (konsisten di semua mode) ─── */}
        <DialogFooter className="mt-4 sm:justify-end">
          {type === "delete" ? (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => selected?._id && onDelete?.(selected._id)}
              >
                Delete
              </Button>
            </>
          ) : type === "view" ? (
            <Button onClick={onClose}>Close</Button>
          ) : (
            <>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" form="job-form">
                {type === "create" ? "Save Data" : "Save Changes"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default JobDialog;
