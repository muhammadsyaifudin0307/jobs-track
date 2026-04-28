import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SearchProps = {
  value: string;
  onChange: (val: string) => void;
  filterValue: string;
  onFilterChange: (val: string) => void;
};

const SearchJob = ({
  value,
  onChange,
  filterValue,
  onFilterChange,
}: SearchProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Input
        placeholder="Search Jobs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Select value={filterValue} onValueChange={onFilterChange}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Job Types</SelectLabel>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Full-time">Full-Time</SelectItem>
            <SelectItem value="Part-time">Part-Time</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchJob;
