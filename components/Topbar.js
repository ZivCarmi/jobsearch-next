import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MdOutlineLogout } from "react-icons/md";

import Container from "./Container";
import useLogout from "../hooks/useLogout";

import classes from "./Topbar.module.css";

const Topbar = () => {
  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.user?.type);
  const router = useRouter();
  const logout = useLogout();

  return (
    <div className={classes.topbar}>
      <Container className={classes.container}>
        <div className={classes.logo}>
          <Link href="/">
            <strong>Job</strong>Search
          </Link>
        </div>
        <div className={classes.menu}>
          <nav>
            <ul>
              {token ? (
                <>
                  <li className={classes.bgBtn}>{userType}</li>
                  <li className={classes.bgBtn}>
                    {userType === "employer" && (
                      <Link href="/managepanel">Manage Panel</Link>
                    )}
                    {userType === "seeker" && (
                      <Link href="/myaccount">My Account</Link>
                    )}
                  </li>
                  <li className={classes.borderBtn}>
                    <button onClick={logout}>
                      <MdOutlineLogout />
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className={classes.bgBtn}>
                    <Link
                      href="/register"
                      className={router.pathname == "/" ? "active" : ""}
                    >
                      Register
                    </Link>
                  </li>
                  <li className={classes.borderBtn}>
                    <Link
                      href="/login"
                      className={router.pathname == "/" ? "active" : ""}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Topbar;
