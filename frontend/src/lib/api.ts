// src/lib/api.ts
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type Job = {
  _id: string;
  companyName: string;
  jobDesk: string;
  status: string;
  location: string;
  salary: string;
};

export type JobPayload = Omit<Job, "_id">;

const getHeaders = (): Record<string, string> => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("google_access_token")}`,
  "X-Spreadsheet-Id": localStorage.getItem("spreadsheet_id") ?? "",
});

export const initSpreadsheet = async (accessToken: string): Promise<void> => {
  const existing = localStorage.getItem("spreadsheet_id");
  if (existing) return;

  const res = await fetch(`${BASE_URL}/api/spreadsheet/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Gagal membuat spreadsheet");

  const data = (await res.json()) as { spreadsheetId: string };
  localStorage.setItem("spreadsheet_id", data.spreadsheetId);
};

export const getJobs = async (): Promise<Job[]> => {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Gagal mengambil data");
  return res.json() as Promise<Job[]>;
};

export const createJob = async (body: JobPayload): Promise<Job> => {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Gagal menambah data");
  return res.json() as Promise<Job>;
};

export const updateJob = async (id: string, body: JobPayload): Promise<Job> => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Gagal mengupdate data");
  return res.json() as Promise<Job>;
};

export const deleteJob = async (id: string): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Gagal menghapus data");
  return res.json() as Promise<{ success: boolean }>;
};
