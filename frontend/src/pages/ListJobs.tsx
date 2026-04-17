import JobsListCard from "@/components/JobsListCard";
import { v7 } from "uuid";
import SearchJob from "@/components/SearchJob";

const data = [
  {
    _id: v7(),
    companyName: "PT Delta ",
    jobDesk: "IT Progammer",
    status: "Apply",
    applyDate: "21 November 2026",
    location: "Jakarta",
    jobTypes: "WFH",
  },
  {
    _id: v7(),
    companyName: "PT Delta ",
    jobDesk: "IT Progammer",
    status: "Apply",
    applyDate: "21 November 2026",
    location: "Jakarta",
    jobTypes: "WFH",
  },
  {
    _id: v7(),
    companyName: "PT Delta LOREM Kocak",
    jobDesk: "IT Progammer",
    status: "Apply",
    applyDate: "21 November 2026",
    location: "Jakarta",
    jobTypes: "WFH",
  },
  {
    _id: v7(),
    companyName: "PT Delta ",
    jobDesk: "IT Progammer",
    status: "Apply",
    applyDate: "21 November 2026",
    location: "Jakarta",
    jobTypes: "WFH",
  },
  {
    _id: v7(),
    companyName: "PT Delta ",
    jobDesk: "IT Progammer",
    status: "Apply",
    applyDate: "21 November 2026",
    location: "Jakarta",
    jobTypes: "WFH",
  },
  {
    _id: v7(),
    companyName: "PT Delta ",
    jobDesk: "IT Progammer",
    status: "Apply",
    applyDate: "21 November 2026",
    location: "Jakarta",
    jobTypes: "WFH",
  },
];

const ListJobs = () => {
  const handleOpened = () => {
    alert(v7());
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <SearchJob />
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {data.map((p) => (
          <JobsListCard key={p._id} {...p} onOpen={handleOpened} />
        ))}
      </div>
    </div>
  );
};

export default ListJobs;
