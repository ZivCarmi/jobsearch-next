import { useEffect } from "react";

import Button from "@/components/Button";
import JobSummary from "../jobs/JobSummary";
import ErrorMessage from "@/components/ErrorMessage";
import JobDate from "../jobs/JobDate";

import classes from "./SingleJobApp.module.css";

const statusMessage = {
  Pending: {
    message: "Awaiting for an action",
    color: "var(--secondary-main)",
  },
  Active: {
    message: "Job application marked as approved",
    color: "var(--success-main)",
  },
  Inactive: {
    message: "Job application marked as rejected",
    color: "var(--danger-main)",
  },
};

const SingleJobApp = ({ jobApp, setJobApps }) => {
  useEffect(() => {
    const updateJobAppToWatched = async () => {
      try {
        const response = await fetch(
          `/api/employer/job-applications/${jobApp._id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ watched: true }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) return;

        // CURRENTLY NOT WORK BECAUSE IT REDIRECT TO SINGLE PAGE
        // router.replace(router.asPath);

        if (typeof setJobApps === "function") {
          // Update Job apps table UI
          setJobApps((previousJobApps) => {
            const jobAppIndex = previousJobApps.findIndex(
              (_jobApp) => _jobApp._id === jobApp._id
            );
            previousJobApps[jobAppIndex].isWatched = true;
            return previousJobApps;
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobApp && !jobApp.isWatched) {
      updateJobAppToWatched();
    }
  }, [jobApp]);

  return (
    <>
      <div className={classes.section}>
        <p className="status-message">
          {statusMessage[jobApp.status].message}
          <style jsx>{`
            .status-message {
              margin-bottom: 0.3rem;
              color: ${statusMessage[jobApp.status].color};
            }
          `}</style>
        </p>
        <div className={classes.details}>
          <JobDate text="Created: " date={jobApp.createdAt} icon />
          <JobDate text="Last update: " date={jobApp.updatedAt} icon />
        </div>
      </div>
      <div className={classes.section}>
        <h2 className={classes.title}>Candidate Details</h2>
        <div className={classes.details}>
          <ul>
            <li>
              <span className={classes.label}>Full name:</span>{" "}
              {jobApp.seeker.fullName}
            </li>
            {jobApp.seeker.about && (
              <li>
                <span className={classes.label}>About:</span>{" "}
                {jobApp.seeker.about}
              </li>
            )}
          </ul>
          <a href={jobApp.seeker.resume}>View Resume</a>
        </div>
      </div>
      <div className={classes.section}>
        <h2 className={classes.title}>Job Details</h2>
        <div className={classes.details}>
          <ul>
            <li>
              <span className={classes.label}>Title:</span> {jobApp.job.title}
            </li>
          </ul>
        </div>
        <details>
          <JobSummary job={jobApp.job} />
        </details>
      </div>
    </>
  );
};

export default SingleJobApp;
