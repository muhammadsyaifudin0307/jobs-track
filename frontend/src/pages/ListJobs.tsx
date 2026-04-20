import JobsListCard from "@/components/JobsListCard";
import { v7 } from "uuid";
import SearchJob from "@/components/SearchJob";
import type { JobData } from "@/types/JobDataType";

import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";

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

const ListJobs = () => {
  // const [data, setData] = useState<JobData>([]);
  const handleOpened = () => {
    alert(v7());
  };
  const handleEdit = () => {
    alert(v7());
  };
  const handleDelete = () => {
    alert(v7());
  };
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className=" flex items-center justify-between w-full gap-3">
        <div className="flex-1">
          <SearchJob />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Task</span>
        </Button>
      </div>
      <p className="text-gray-400">Data yang ditemukan 4</p>
      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="rounded-full bg-muted p-6">
            <Briefcase className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Belum ada lowongan</h3>
            <p className="text-sm text-muted-foreground">
              Tambahkan lowongan pekerjaan pertama kamu.
            </p>
            <Button onClick={() => console.log("tes")}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Lowongan
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 pt-6">
          {data.map((p) => (
            <JobsListCard
              key={p._id}
              {...p}
              onOpen={handleOpened}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListJobs;
