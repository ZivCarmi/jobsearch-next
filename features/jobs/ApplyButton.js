import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import AppLink from "@/components/AppLink";

import classes from "./ApplyButton.module.css";

const ApplyButton = ({ job }) => {
  const router = useRouter();
  const userType = useSelector((state) => state.auth.user?.type);
  const { company } = job?.employer;

  if (userType === "employer") {
    return null;
  }

  if (job.applied) {
    return <p>You applied to that job</p>;
  }

  let component = (
    <AppLink
      href={`${router.pathname}/?jobId=${job._id}&apply=true&redirect=${router.asPath}`}
      as={`${router.pathname}/${job._id}/apply`}
      shallow={true}
      className={classes.button}
    >
      Quick Apply
    </AppLink>
  );

  if (company?.customApply && company.applicationUrl) {
    component = (
      <AppLink
        href={`${router.pathname}/?jobId=${job._id}&apply=true&redirect=${router.asPath}`}
        as={`${router.pathname}/${job._id}/apply`}
        shallow={true}
        className={classes.button}
      >
        Apply
      </AppLink>
    );
  }

  return component;
};
export default ApplyButton;
