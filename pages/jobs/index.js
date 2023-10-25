import Jobs from "@/features/jobs/Jobs";
import { getAllJobs, getAllJobsWithApplyCondition } from "@/pages/api/jobs";
import { getSeeker } from "../api/seeker";

const JobsPage = (props) => {
  return <Jobs {...props} />;
};

export const getServerSideProps = async ({ req, query }) => {
  const { uid, utype } = req.headers;
  const { page } = query;
  const props = {};

  if (utype === "seeker") {
    props.jobs = await getAllJobsWithApplyCondition(uid, page).then((res) =>
      JSON.parse(JSON.stringify(res))
    );

    props.canApply = await getSeeker(uid, "-_id resume").then((res) =>
      res?.resume ? true : false
    );
  } else {
    props.jobs = await getAllJobs(page).then((res) =>
      JSON.parse(JSON.stringify(res))
    );
  }

  return {
    props,
  };
};

export default JobsPage;
