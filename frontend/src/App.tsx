import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";

// App.tsx
import { lazyWithDelay } from "@/lib/lazyWithDelay";

// Ganti lazy biasa dengan lazyWithDelay
const ListJobs = lazyWithDelay(() => import("@/pages/ListJobs"));
const DetailListJobs = lazyWithDelay(() => import("@/pages/DetailListJobs"));

export const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<ListJobs />} />
        <Route path="/:id" element={<DetailListJobs />} />
      </Route>
    </Routes>
  );
};
