import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ListJobs from "./pages/ListJobs";
import DetailListJobs from "./pages/DetailListJobs";

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
