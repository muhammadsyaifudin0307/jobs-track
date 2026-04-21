import type { JobData } from "./JobDataType";

export type DialogType = "create" | "edit" | "delete" | "view";

export interface JobDialogProps {
  isOpen: boolean;
  selected: JobData | null;
  type: DialogType;
  onClose: () => void;
  onSubmit?: (data: Omit<JobData, "_id">) => void;
  onDelete?: (id: number | string) => void;
}
