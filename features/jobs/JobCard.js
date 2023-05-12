import { forwardRef } from "react";
import Link from "next/link";

import ApplyButton from "@/components/ApplyButton";
import CompanyIcon from "../company/CompanyIcon";
import JobDate from "./JobDate";

import classes from "./JobCard.module.css";
import { useSelector } from "react-redux";

const JobCard = forwardRef(({ job }, ref) => {
  const userType = useSelector((state) => state.auth.user?.type);

  return (
    <li className={classes.card} ref={ref}>
      <div className={classes.wrapper}>
        <Link
          href={`/jobs/?jobId=${job._id}`}
          as={`/jobs/${job._id}`}
          shallow={true}
          className={classes.viewLink}
        />
        <div className={classes.heading}>
          {job.createdAt && <JobDate date={job.createdAt} />}
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
          {userType !== "employer" && (
            <div className={classes.link}>
              <ApplyButton
                link={{
                  href: `/jobs/?jobId=${job._id}&apply=true`,
                  as: `/jobs/${job._id}/apply`,
                  shallow: true,
                }}
                className={classes.apply}
                text="Apply Now"
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
});

export default JobCard;
