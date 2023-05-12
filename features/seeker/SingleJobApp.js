import { MdPendingActions } from "react-icons/md";

import JobDate from "../jobs/JobDate";
import JobSummary from "../jobs/JobSummary";
import Card from "@/components/Card";
import TextWithIcon from "@/components/TextWithIcon";
import CompanyIcon from "../company/CompanyIcon";

import classes from "./SingleJobApp.module.css";

const SingleJobApp = ({ data }) => {
  return (
    <Card>
      <div className={classes.head}>
        <div className={classes.heading}>
          <TextWithIcon
            icon={<MdPendingActions size="1.5rem" />}
            text={<span className={classes.status}>{data?.status}</span>}
          />
          <JobDate
            icon={null}
            text={<span className={classes.updatedAt}>Last update: </span>}
            date={data.updatedAt}
          />
        </div>
        <div className={classes.applied}>
          You applied to that job in{" "}
          {new Date(data.createdAt).toLocaleString().split(",")[0]}
        </div>
        <div className={classes.position}>
          <CompanyIcon company={data.employer.company} withName />
          <h2>{data.job.title}</h2>
        </div>
      </div>
      <JobSummary job={data.job} />
    </Card>
  );
};

export default SingleJobApp;
