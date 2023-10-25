import { useEffect, useState } from "react";
import { MdPendingActions } from "react-icons/md";

import JobDate from "../jobs/JobDate";
import JobSummary from "../jobs/JobSummary";
import TextWithIcon from "@/components/TextWithIcon";
import CompanyIcon from "../company/CompanyIcon";

import classes from "./SingleJobApp.module.css";

const SingleJobApp = ({ data }) => {
  const [jobApp, setJobApp] = useState(null);

  useEffect(() => setJobApp(data), []);

  return (
    <>
      <div className={classes.head}>
        <div className={classes.heading}>
          <TextWithIcon
            icon={<MdPendingActions size="1.5rem" />}
            text={<span className={classes.status}>{jobApp?.status}</span>}
          />
          <JobDate
            icon={null}
            text={<span className={classes.updatedAt}>Last update: </span>}
            date={jobApp?.updatedAt}
          />
        </div>
        <div className={classes.applied}>
          You applied to that job in{" "}
          {new Date(jobApp?.createdAt).toLocaleString().split(",")[0]}
        </div>
        <div className={classes.position}>
          <CompanyIcon company={jobApp?.employer.company} withName />
          <h2>{jobApp?.job.title}</h2>
        </div>
      </div>
      <JobSummary job={jobApp?.job} />
    </>
  );
};

export default SingleJobApp;
