export type JobStatusType =
  | "Saved"
  | "Applied"
  | "Screening"
  | "Assessment"
  | "Interview"
  | "Offered"
  | "Hired"
  | "Rejected"
  | "Withdrawn"
  | "Ghosted";
export type BadgeVariantType =
  | "secondary"
  | "info"
  | "default"
  | "warning"
  | "success"
  | "destructive"
  | "outline"
  | "link"
  | "ghost"
  | "purple";

export interface JobListProps {
  companyName: string;
  jobDesk: string;
  status: JobStatusType;
  applyDate: string;
  location: string;
  jobTypes: string;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
