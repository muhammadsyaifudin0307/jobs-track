import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
} from "./ui/card";
import { CalendarDays, MapPin, Briefcase } from "lucide-react";

interface JobListProps {
  companyName: string;
  jobDesk: string;
  status: string;
  applyDate: string;
  location: string;
  jobTypes: string;
  onOpen: () => void;
}

const JobsListCard = (props: JobListProps) => {
  const items = [
    {
      icon: MapPin,
      value: props.location,
    },
    {
      icon: Briefcase,
      value: props.jobTypes,
    },
    {
      icon: CalendarDays,
      value: props.applyDate,
    },
  ];
  return (
    <Card className="w-full flex flex-col">
      {" "}
      {/* ← flex flex-col, hapus h-full */}
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{props.status}</Badge>
        </CardAction>
        <CardTitle className="font-extrabold">{props.companyName}</CardTitle>
        <CardDescription className="text-muted">
          {props.jobDesk}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex-1">
        {" "}
        {/* ← flex-1 agar mengisi ruang */}
        {items.map((data, index) => {
          const Icon = data.icon;
          return (
            <p key={index} className="flex items-center gap-2">
              <Icon size={16} />
              <span>{data.value}</span>
            </p>
          );
        })}
      </CardContent>
      <CardFooter>
        <Button onClick={() => props.onOpen()} className="w-full font-bold">
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobsListCard;
