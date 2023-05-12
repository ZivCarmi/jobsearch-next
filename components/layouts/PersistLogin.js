import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useVerifyAuthMutation } from "@/features/auth/authApiSlice";
import Spinner from "../Spinner";
import useLogout from "@/hooks/useLogout";

const PersistLogin = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const [verifyAuth, { isLoading }] = useVerifyAuthMutation();
  const logout = useLogout();

  useEffect(() => {
    const isPersist = JSON.parse(localStorage.getItem("persist")) || false;

    const verifyToken = async () => {
      try {
        await verifyAuth();
      } catch (error) {
        console.error(error);
      }
    };

    if (!token) {
      isPersist ? verifyToken() : logout();
    }
  }, []);

  return isLoading ? <Spinner withOverlay /> : children;
};

export default PersistLogin;
