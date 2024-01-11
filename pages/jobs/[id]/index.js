import Section from "@/components/Section";
import JobDetails from "@/features/jobs/JobDetails";
import { getJob } from "@/pages/api/jobs/[id]";

const SingleJob = (props) => {
  return (
    <Section>
      <JobDetails job={props.job} />
    </Section>
  );
};

export default SingleJob;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  const result = await getJob(id);

  return {
    props: {
      job: JSON.parse(JSON.stringify(result)),
    },
  };
};
