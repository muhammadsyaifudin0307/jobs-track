import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { GlobalSkeleton } from "./GlobalSkeleton";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <GlobalSkeleton />;

  if (!user) return <Navigate to={"/login"} replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
