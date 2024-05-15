import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "~/components/Auth";
import useAppStore from "~/store/useAppStore";
import useAuthStore from "~/store/useAuthStore";

const PrivateRoute = ({ redirectPath = "", roles = [] }) => {
  const { profile } = useAuthStore();
  const { handleShowModal } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      handleShowModal?.(<Auth />);
      // navigate(-1);
    }
  }, [profile]);

  if (!profile) {
    redirectPath ? <Navigate to={redirectPath} /> : navigate(-1);
  }

  // Check role
  if (
    !roles.length ||
    profile?.userRoles?.some((userRole) => roles.includes(userRole?.roleCode))
  ) {
    return <Outlet />;
  } else {
    toast.warning(`You don't have access to this resouce`);
    return redirectPath && <Navigate to={redirectPath} />;
  }
};

export default PrivateRoute;
