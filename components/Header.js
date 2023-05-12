import Link from "next/link";
import { useSelector } from "react-redux";

import MainNavigation from "./MainNavigation";
import Topbar from "./Topbar";

import classes from "./Header.module.css";

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const verified = useSelector((state) => state.auth.user?.verified);
  const isVerified = token && !verified;

  const headerClasses = `${classes.header} ${
    isVerified ? classes.unverified : ""
  }`;

  return (
    <>
      {isVerified && (
        <div className={classes.unverifiedStrip}>
          In order to get fully access to your account functions, please&nbsp;
          <Link href="/complete-registration">complete registration</Link>
        </div>
      )}
      <header className={headerClasses}>
        <Topbar />
        <MainNavigation />
      </header>
    </>
  );
};

export default Header;
