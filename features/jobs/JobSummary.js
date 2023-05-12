import classes from "./JobDetails.module.css";

const JobSummary = ({ job }) => {
  const rangedSalary = job?.salaryFrom && job?.salaryTo;

  return (
    <div className={classes.cardData}>
      <div className={classes.listItem}>
        <div className={classes.title}>Salary</div>
        <div>
          {rangedSalary &&
            `$${job?.salaryFrom.toLocaleString()} — $${job?.salaryTo.toLocaleString()}`}{" "}
          {job?.salaryType?.label}
        </div>
      </div>
      {job?.jobType && (
        <div className={`${classes.listItem} ${classes.jobType}`}>
          <div className={classes.title}>Job Type</div>
          <ul>
            {job?.jobType.map((type) => (
              <li key={type?.value}>{type?.label}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={classes.description}>
        <div className={classes.section}>
          <div className={classes.title}>Description</div>
          <p className={classes.rawData}>{job?.description}</p>
        </div>
        {job?.requirements && (
          <div className={classes.section}>
            <div className={classes.subtitle}>Requirements</div>
            <p className={classes.rawData}>{job?.requirements}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSummary;
