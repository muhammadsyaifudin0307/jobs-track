import { Toaster } from "@/components/ui/sonner";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster richColors position="top-right" /> {/* ← wajib ada */}
    </div>
  );
};

export default MainLayout;
