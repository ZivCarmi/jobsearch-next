import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Grid from "@/components/Grid";
import TabCard from "../account/TabCard";
import JobDate from "../jobs/JobDate";
import Pagination from "@/components/Pagination";
import SingleJobModal from "./SingleJobModal";

import classes from "./AccountJobs.module.css";

const AccountJobs = ({ route, data: { jobs, pagination, totalCount } }) => {
  const router = useRouter();
  const id = router.query.id;
  const page = parseInt(router.query.page);
  const [postedJobs, setPostedJobs] = useState(jobs);
  const haveJobs = totalCount > 0;
  const returnUrl = `${route.url}${page ? "?page=" + page : ""}`;

  useEffect(() => {
    setPostedJobs(jobs);
  }, [jobs]);

  return (
    <TabCard title="My Jobs">
      {!haveJobs && <p>Seems like you didn't post any jobs yet...</p>}
      {haveJobs && (
        <>
          <p className={classes.description}>
            You posted <strong>{totalCount}</strong> jobs
          </p>
          <div className={classes.list}>
            <Grid tag="ul" className={classes.grid}>
              {postedJobs.map((job) => (
                <li key={job._id}>
                  <Link
                    href={`/managepanel/[route]/?route=jobs&id=${job._id}&redirect=${returnUrl}&page=${page}`}
                    as={`/managepanel/jobs/${job._id}`}
                    shallow
                    className={classes.link}
                  >
                    <div className={classes.head}>
                      <div>{job.title}</div>
                      <JobDate date={job.createdAt} />
                    </div>
                    <div className={classes.body}>
                      <div>{job.location}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </Grid>
          </div>
        </>
      )}
      <Pagination pagesCount={pagination.pagesCount} />
      {id && <SingleJobModal id={id} />}
    </TabCard>
  );
};

export default AccountJobs;
