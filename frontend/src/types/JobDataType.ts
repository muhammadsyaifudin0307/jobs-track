import type { JobStatusType } from "./JobCardType";

export interface JobData {
  _id: string;
  companyName: string;
  jobDesk: string;
  status: JobStatusType;
  applyDate: string;
  location: string;
  jobTypes: string;
}
