import type {
  JobStatusType,
  BadgeVariantType,
  JobListProps,
} from "@/types/JobCardType";
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
import { Pencil, Trash2 } from "lucide-react"; // Asumsi menggunakan icon

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

  const STATUS_VARIANTS: Record<JobStatusType, BadgeVariantType> = {
    Saved: "secondary",
    Applied: "info",
    Screening: "default",
    Assessment: "warning",
    Interview: "warning",
    Offered: "success",
    Hired: "success",
    Rejected: "destructive",
    Withdrawn: "secondary",
    Ghosted: "outline",
  };
  return (
    <div className="relative group" style={{ paddingTop: "22px" }}>
      <div className="absolute right-2 -top-0 z-10 flex gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Button size="icon" variant="secondary" onClick={() => props.onEdit()}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => props.onDelete()}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardAction>
            <Badge variant={STATUS_VARIANTS[props.status] || "default"}>
              {props.status}
            </Badge>
          </CardAction>
          <CardTitle className="font-extrabold">{props.companyName}</CardTitle>
          <CardDescription className="text-muted">
            {props.jobDesk}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 flex-1">
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
        <CardFooter className="flex items-center justify-around gap-2">
          <Button onClick={() => props.onOpen()} className="w-full">
            Lihat Detail
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobsListCard;
