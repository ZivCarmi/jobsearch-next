import Container from "@/components/Container";
import Section from "@/components/Section";
import ApplyCard from "@/features/jobs/ApplyCard";
import { getJob } from "@/pages/api/jobs/[jobId]";
import { getSeeker } from "@/pages/api/seeker";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

const ApplyPage = ({ job, canApply }) => {
  return (
    <Section className="flex items-center justify-center h-svh">
      <Container width="1200px">
        <h1>
          {job?.title} - {job?.employer.company.name}
          <Link href="/jobs">
            <IoIosClose size={45} color="white" />
          </Link>
        </h1>
        <ApplyCard canApply={canApply} />
      </Container>
    </Section>
  );
};

ApplyPage.getLayout = (page) => page;

export default ApplyPage;

export const getServerSideProps = async ({ req, params }) => {
  const { jobId } = params;
  const { uid, utype } = req.headers;

  if (utype !== "seeker") {
    return {
      redirect: {
        permanent: false,
        destination: `/jobs/${jobId}`,
      },
    };
  }

  const jobResult = await getJob(jobId, "title employer");
  const seekerResult = await getSeeker(uid, "-_id resume");

  return {
    props: {
      job: JSON.parse(JSON.stringify(jobResult)),
      canApply: seekerResult?.resume ? true : false,
    },
  };
};
