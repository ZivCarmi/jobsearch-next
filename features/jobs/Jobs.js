import { useRouter } from "next/router";

import Container from "@/components/Container";
import AvailableJobs from "./AvailableJobs";
import Section from "@/components/Section";
import JobModal from "./JobModal";
import ApplyModal from "./ApplyModal";

const Jobs = ({ jobs, canApply }) => {
  const router = useRouter();
  const { jobId, apply } = router.query;

  return (
    <Section>
      <Container>
        {jobs.data?.length ? (
          <AvailableJobs results={jobs} />
        ) : (
          <p>No jobs found :(</p>
        )}
        {jobId && !apply && <JobModal />}
        {jobId && apply && <ApplyModal canApply={canApply} />}
      </Container>
    </Section>
  );
};

export default Jobs;
