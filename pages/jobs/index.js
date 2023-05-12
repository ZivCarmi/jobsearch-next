import Jobs from "@/features/jobs/Jobs";
import { getAllJobs } from "@/pages/api/jobs";
import { getSeeker } from "../api/seeker";

const JobsPage = ({ jobs, canApply }) => {
  return <Jobs results={jobs} canApply={canApply} />;
};

export const getServerSideProps = async (context) => {
  const { uid, utype } = context.req.headers;
  const props = {};

  props.jobs = await getAllJobs(context).then((res) =>
    JSON.parse(JSON.stringify(res))
  );

  if (utype === "seeker") {
    props.canApply = await getSeeker(uid, "-_id resume").then((res) =>
      res?.resume ? true : false
    );
  }

  return {
    props,
  };
};

export default JobsPage;
