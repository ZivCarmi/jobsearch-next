import Favorite from "@/components/Favorite";
import ApplyButton from "@/components/ApplyButton";
import CompanyIcon from "../company/CompanyIcon";
import JobSummary from "./JobSummary";
import JobDate from "./JobDate";

import classes from "./JobDetails.module.css";

const JobDetails = ({ job }) => {
  const company = job?.employer?.company;

  return (
    <div className={classes.card}>
      <div className={classes.heading}>
        <div className={classes.left}>
          <CompanyIcon className={classes.icon} company={company} />
          <div className={classes.info}>
            <h2>{job?.title}</h2>
            <div className={classes.companyName}>{company?.name}</div>
            <div className={classes.companyLocation}>{job?.location}</div>
          </div>
        </div>
        <div className={classes.right}>
          <JobDate date={job?.createdAt} />
          <div className={classes.actions}>
            <Favorite />
            {/* <ApplyButton withIcon /> */}
          </div>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.bodySection}>
          <h2>About the Job</h2>
          <JobSummary job={job} />
        </div>
        <div className={classes.bodySection}>
          <h2>About the Company</h2>
          <div className={classes.cardData}>
            <div className={classes.listItem}>
              <div className={classes.title}>Country</div>
              <div>{company?.country?.label}</div>
            </div>
            <div className={classes.listItem}>
              <div className={classes.title}>Company Size</div>
              <div>{company?.size?.label} employees</div>
            </div>
            <div className={`${classes.listItem} ${classes.website}`}>
              <div className={classes.title}>Website</div>
              <a href={company?.websiteUrl} target="_blank">
                {company?.websiteUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
