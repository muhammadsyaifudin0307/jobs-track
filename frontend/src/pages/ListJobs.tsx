import JobsListCard from "@/components/JobsListCard";

import SearchJob from "@/components/SearchJob";
import type { JobData } from "@/types/JobDataType";

import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";
import { PaginationListJobs } from "@/components/PaginationListJobs";
import { useState } from "react";

import JobDialog from "@/components/JobDialog";

const data: JobData[] = [
  {
    _id: "job-001",
    companyName: "PT Teknologi Nusantara",
    jobDesk: "Junior Fullstack Developer",
    status: "Applied",
    applyDate: "2026-04-18",
    location: "Jakarta Selatan",
    jobTypes: "Full-time",
  },
  {
    _id: "job-002",
    companyName: "Dicoding Indonesia",
    jobDesk: "Backend Engineer (Node.js)",
    status: "Interview",
    applyDate: "2026-04-10",
    location: "Bandung (Hybrid)",
    jobTypes: "Full-time",
  },
  {
    _id: "job-003",
    companyName: "Startup Kreatif Digital",
    jobDesk: "Frontend Developer (React)",
    status: "Screening",
    applyDate: "2026-04-19",
    location: "Remote",
    jobTypes: "Contract",
  },
  {
    _id: "job-004",
    companyName: "Global Tech Solutions",
    jobDesk: "Web Developer",
    status: "Rejected",
    applyDate: "2026-03-25",
    location: "Jakarta Pusat",
    jobTypes: "Full-time",
  },
];
interface DialogConfig {
  isOpen: boolean;
  type: "view" | "create" | "edit" | "delete" | null;
  data: JobData | null;
}

const ListJobs = () => {
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    type: null,
    data: null,
  });

  const handleDetail = (job: JobData) => {
    setDialogConfig({ isOpen: true, type: "view", data: job });
  };
  const handleCreate = () => {
    setDialogConfig({ isOpen: true, type: "create", data: null });
  };

  const handleEdit = (job: JobData) => {
    setDialogConfig({ isOpen: true, type: "edit", data: job });
  };
  const handleDelete = (job: JobData) => {
    setDialogConfig({ isOpen: true, type: "delete", data: job });
  };
  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <SearchJob />
        </div>
        <Button className="gap-2" onClick={handleCreate}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Tambah</span>
        </Button>
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {data.length} lowongan ditemukan
      </p>

      {/* Empty State */}
      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="rounded-full bg-muted p-5">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold">Belum ada lowongan</h3>
            <p className="text-sm text-muted-foreground">
              Tambahkan lowongan pekerjaan pertama kamu.
            </p>
          </div>
          <Button size="sm" onClick={() => console.log("tes")}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Lowongan
          </Button>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((p) => (
              <JobsListCard
                key={p._id}
                {...p}
                onOpen={() => handleDetail(p)}
                onEdit={() => handleEdit(p)}
                onDelete={() => handleDelete(p)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end border-t pt-4">
            <PaginationListJobs />
          </div>
        </>
      )}

      {dialogConfig.type && (
        <JobDialog
          isOpen={dialogConfig.isOpen}
          type={dialogConfig.type}
          selected={dialogConfig.data}
          onClose={() =>
            setDialogConfig({ isOpen: false, type: null, data: null })
          }
          onSubmit={(formData) => {
            console.log("Submit Action:", dialogConfig.type);
            console.log("Data dari Form:", formData);

            // Logika simpel untuk membedakan POST (Create) dan PUT (Edit)
            if (dialogConfig.type === "create") {
              // Fetch POST
            } else if (dialogConfig.type === "edit") {
              // Fetch PUT menggunakan dialogConfig.data._id
            }

            // Tutup dialog setelah berhasil
            setDialogConfig({ isOpen: false, type: null, data: null });
          }}
          onDelete={(id) => {
            console.log("Menghapus ID:", id);
            // Jalankan fetch DELETE ke backend

            // Tutup dialog setelah berhasil
            setDialogConfig({ isOpen: false, type: null, data: null });
          }}
        />
      )}
    </div>
  );
};

export default ListJobs;
