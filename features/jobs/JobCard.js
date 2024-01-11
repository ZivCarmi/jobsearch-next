import { useRouter } from "next/router";
import { forwardRef } from "react";
import Link from "next/link";

import CompanyIcon from "../company/CompanyIcon";
import JobDate from "./JobDate";
import ApplyButton from "./ApplyButton";

import classes from "./JobCard.module.css";

const JobCard = forwardRef(({ job }, ref) => {
  const router = useRouter();

  console.log(router.pathname, router.asPath);

  return (
    <li className={classes.card} ref={ref}>
      <div className={classes.wrapper}>
        <Link
          // href={`${router.pathname}/${job._id}`}
          href={`${router.pathname}/?jobId=${job._id}&redirect=${router.asPath}`}
          // as={`${router.pathname}/${job._id}`}
          // shallow={true}
          className={classes.viewLink}
        />
        <div className={classes.heading}>
          {job.createdAt && (
            <JobDate date={job.createdAt} className={classes.date} />
          )}
          <h2>{job.title}</h2>
          <div className={classes.location}>{job.location}</div>
        </div>
        <p className={classes.description}>
          {job.description.length > 150
            ? `${job.description.substring(0, 150)}...`
            : job.description}
        </p>
        <div className={classes.footer}>
          <div className={classes.image}>
            <CompanyIcon company={job.employer.company} />
            <span>{job.employer.company?.name}</span>
          </div>
          <div className={classes.apply}>
            <ApplyButton job={job} />
          </div>
        </div>
      </div>
    </li>
  );
});

export default JobCard;
