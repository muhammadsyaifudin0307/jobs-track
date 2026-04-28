import JobsListCard from "@/components/JobsListCard";
import SearchJob from "@/components/SearchJob";
import type { JobData } from "@/types/JobDataType";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";
import { PaginationListJobs } from "@/components/PaginationListJobs";
import { useState } from "react";
import JobDialog from "@/components/JobDialog";
import { useDebounce } from "use-debounce";

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
  const [search, setSearch] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [debouncedSearch] = useDebounce(search, 400);
  const [page, setPage] = useState(1);
  const limit = 20;

  const filteredData = data.filter((job) => {
    const matchSearch =
      job.companyName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      job.jobDesk.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchFilter =
      jobTypeFilter === "All" || job.jobTypes === jobTypeFilter;

    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filteredData.length / limit);
  const currentData = filteredData.slice((page - 1) * limit, page * limit);

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

  const closeDialog = () => {
    setDialogConfig({ isOpen: false, type: null, data: null });
  };

  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <SearchJob
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            filterValue={jobTypeFilter}
            onFilterChange={setJobTypeFilter}
          />
        </div>
        <Button className="gap-2" onClick={handleCreate}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Tambah</span>
        </Button>
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {debouncedSearch
          ? `${filteredData.length} hasil untuk "${debouncedSearch}"`
          : `${data.length} lowongan ditemukan`}
      </p>

      {/* Empty State - data kosong */}
      {data.length === 0 ? (
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
          <Button size="sm" onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Lowongan
          </Button>
        </div>
      ) : (
        <>
          {/* Empty State - hasil search kosong */}
          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="rounded-full bg-muted p-5">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold">
                  Tidak ditemukan hasil
                </h3>
                <p className="text-sm text-muted-foreground">
                  Coba kata kunci lain untuk "{debouncedSearch}"
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentData.map((p) => (
                <JobsListCard
                  key={p._id}
                  {...p}
                  onOpen={() => handleDetail(p)}
                  onEdit={() => handleEdit(p)}
                  onDelete={() => handleDelete(p)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end border-t pt-4">
              <PaginationListJobs
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}

      {/* Dialog */}
      {dialogConfig.type && (
        <JobDialog
          isOpen={dialogConfig.isOpen}
          type={dialogConfig.type}
          selected={dialogConfig.data}
          onClose={closeDialog}
          onSubmit={(formData) => {
            if (dialogConfig.type === "create") {
              // TODO: Fetch POST
              console.log("Create:", formData);
            } else if (dialogConfig.type === "edit") {
              // TODO: Fetch PUT dengan id: dialogConfig.data?._id
              console.log("Edit:", dialogConfig.data?._id, formData);
            }
            closeDialog();
          }}
          onDelete={(id) => {
            // TODO: Fetch DELETE
            console.log("Delete:", id);
            closeDialog();
          }}
        />
      )}
    </div>
  );
};

export default ListJobs;
