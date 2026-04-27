// src/components/GlobalSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

function JobCardSkeleton() {
  return (
    <div className="relative pt-6">
      <Card className="flex h-full w-full flex-col">
        <CardHeader className="gap-1 sm:gap-2">
          <Skeleton className="h-5 w-16 rounded-full mb-1" />

          <Skeleton className="h-6 w-3/4" />

          <Skeleton className="h-4 w-1/2" />
        </CardHeader>

        <CardContent className="flex-1 space-y-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <Skeleton className="h-4 w-4 shrink-0 mt-0.5 rounded-sm" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </CardContent>

        <CardFooter className="pt-4">
          <Skeleton className="h-9 w-full rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
}
export function GlobalSkeleton() {
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-48 shrink-0 hidden sm:block" />
        </div>
        <Skeleton className="h-9 w-9 sm:w-24 shrink-0" />
      </div>

      <Skeleton className="h-4 w-40" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
