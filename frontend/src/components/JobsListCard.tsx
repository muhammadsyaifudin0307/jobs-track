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
    <div className="relative group pt-6">
      <div className="absolute right-4 top-1 z-10 flex gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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

      <Card className="flex h-full w-full flex-col transition-all hover:shadow-md">
        <CardHeader className="gap-1 sm:gap-2">
          <CardAction className="mb-1">
            <Badge variant={STATUS_VARIANTS[props.status] || "default"}>
              {props.status}
            </Badge>
          </CardAction>

          <CardTitle className="line-clamp-2 text-lg font-extrabold sm:text-xl">
            {props.companyName}
          </CardTitle>

          <CardDescription className="line-clamp-1 text-sm text-muted-foreground">
            {props.jobDesk}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 space-y-2.5 text-sm sm:text-base">
          {items.map((data, index) => {
            const Icon = data.icon;
            return (
              <p key={index} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 shrink-0" size={16} />

                <span className="break-words">{data.value}</span>
              </p>
            );
          })}
        </CardContent>

        <CardFooter className="pt-4">
          <Button onClick={() => props.onOpen()} className="w-full">
            Lihat Detail
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobsListCard;
