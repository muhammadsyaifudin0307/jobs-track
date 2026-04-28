import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";

import { lazyWithDelay } from "@/lib/lazyWithDelay";
import { AuthProvider } from "./contexts/AuthProvider";
import Login from "@/pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const ListJobs = lazyWithDelay(() => import("@/pages/ListJobs"));
const DetailListJobs = lazyWithDelay(() => import("@/pages/Login"));

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ListJobs />} />
          <Route path="/:id" element={<DetailListJobs />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
