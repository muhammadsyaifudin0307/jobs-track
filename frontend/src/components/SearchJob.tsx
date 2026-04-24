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
};

const SearchJob = ({ value, onChange }: SearchProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Input
        placeholder="Search Jobs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Select>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Jobs</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchJob;
