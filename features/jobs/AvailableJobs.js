import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

import JobCard from "./JobCard";

import classes from "./AvailableJobs.module.css";

const AvailableJobs = ({ results }) => {
  const [loadedJobs, setLoadedJobs] = useState(results.data);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(results.hasNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const intObserver = useRef();
  const router = useRouter();

  const lastJobRef = useCallback(
    (job) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((jobs) => {
        if (jobs[0].isIntersecting && hasNextPage) {
          console.log("We are near the last job!");
          setPageNum((prev) => prev + 1);
        }
      });

      if (job) intObserver.current.observe(job);
    },
    [hasNextPage]
  );

  const content = loadedJobs.map((job, i) => {
    if (loadedJobs.length === i + 1) {
      return <JobCard ref={lastJobRef} key={job._id} job={job} />;
    }

    return <JobCard key={job._id} job={job} />;
  });

  useEffect(() => {
    if (pageNum === 1) return;

    if (!isLoading && hasNextPage) {
      let url = `/api${router.asPath}?page=${pageNum}`;

      // if on search page
      if (router.asPath.includes("?")) {
        url = `/api${router.asPath}&page=${pageNum}`;
      }

      const fetchMoreJobs = async () => {
        try {
          setIsLoading(true);

          const response = await fetch(url);

          const results = await response.json();

          setLoadedJobs((prevJobs) => [...prevJobs, ...results.data]);
          setHasNextPage(results.hasNextPage);
        } catch (error) {
          console.error(error);
        }

        setIsLoading(false);
      };

      fetchMoreJobs();
    }
  }, [pageNum, hasNextPage]);

  return (
    <>
      {results?.totalCount && (
        <p className={classes.resultsCount}>{totalCount} jobs found</p>
      )}
      <ul className={classes.jobsList}>{loadedJobs && content}</ul>
      {isLoading && <p>Loading more jobs...</p>}
    </>
  );
};

export default AvailableJobs;
