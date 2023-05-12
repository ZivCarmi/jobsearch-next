import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { useLogOutMutation } from "@/features/auth/authApiSlice";
import { logOut } from "@/features/auth/authSlice";

const useLogout = () => {
  const [logout] = useLogOutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const doLogout = async () => {
    try {
      await logout();
      dispatch(logOut());
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return doLogout;
};

export default useLogout;
