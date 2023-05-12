import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

import Container from "./Container";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const userType = useSelector((state) => state.auth.user?.type);
  const router = useRouter();

  return (
    <div className={classes.navigation}>
      <Container className={classes.container}>
        <nav>
          <ul>
            <li>
              <Link href="/" className={router.pathname == "/" ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/jobs"
                className={router.pathname == "/" ? "active" : ""}
              >
                Jobs
              </Link>
            </li>
          </ul>
        </nav>
        {userType === "employer" && (
          <div className={classes.hiring}>
            <Link href="/hire">
              Hiring? Post job
              <BiRightArrowAlt color="var(--purple)" size="22px" />
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MainNavigation;
