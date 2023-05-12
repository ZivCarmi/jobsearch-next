import { useSelector } from "react-redux";

import Header from "../Header";

import classes from "./RootLayout.module.css";

export const RootWrapper = (page) => <RootLayout>{page}</RootLayout>;

const RootLayout = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const verified = useSelector((state) => state.auth.user?.verified);
  const isVerified = token && !verified;

  const mainClasses = `${classes.main} ${isVerified ? classes.unverified : ""}`;

  return (
    <>
      <Header />
      <main className={mainClasses}>{children}</main>
    </>
  );
};

export default RootLayout;
