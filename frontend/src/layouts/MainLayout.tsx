// MainLayout.tsx
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { GlobalSkeleton } from "@/components/GlobalSkeleton";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen p-4 md:p-8">
        <Suspense fallback={<GlobalSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
};
export default MainLayout;
