import { Route, Routes } from "react-router";
import { Auth } from "../layouts/auth";
import { MainLayout } from "../layouts/mainLayout";

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/profile" element={<div>Profile page</div>} />
      <Route path="*" element={<Auth />} />
    </Routes>
  );
};
