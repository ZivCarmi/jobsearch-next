import Container from "@/components/Container";
import Section from "@/components/Section";
import JobDetails from "@/features/jobs/JobDetails";
import { getJob } from "@/pages/api/jobs/[jobId]";

const SingleJob = (props) => {
  return (
    <Section>
      <Container width="800px">
        <JobDetails job={props.job} className="shadow-2xl" />
      </Container>
    </Section>
  );
};

export default SingleJob;

export const getServerSideProps = async ({ params }) => {
  const { jobId } = params;

  const result = await getJob(jobId);

  return {
    props: {
      job: JSON.parse(JSON.stringify(result)),
    },
  };
};
