import { Navigate, Route, Routes } from "react-router";
import { Modal } from "../components/ui/modal";
import { useAuthContext } from "../context/auth-context";
import { SignIn } from "../layouts/auth/signIn";
import { SignUp } from "../layouts/auth/signUp";
import { MainLayout } from "../layouts/mainLayout";

export const RootRoutes = () => {
  const { userToken } = useAuthContext();
  return (
    <>
      <Modal />
      <Routes>
        {userToken ? (
          <>
            <Route path="/" element={<MainLayout />} />
            <Route path="/profile" element={<div>Profile page</div>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};
