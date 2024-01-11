import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useVerifyAuthMutation } from "@/features/auth/authApiSlice";
import Spinner from "../Spinner";

const PersistLogin = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const [verifyAuth, { isLoading }] = useVerifyAuthMutation();

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
      isPersist && verifyToken();
    }
  }, []);

  return isLoading ? <Spinner withOverlay /> : children;
};

export default PersistLogin;
