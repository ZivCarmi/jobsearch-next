import JobApplications from "@/models/JobApplication";
import { getSeeker } from "@/pages/api/seeker";
import { getJob } from "..";

const handler = async (req, res) => {
  const { uid: seekerId } = req.headers;
  const { jobId } = req.query;

  const seeker = await getSeeker(seekerId);
  const job = await getJob(jobId, "-_id employer");

  if (!seeker) {
    return res.status(401).end();
  }

  if (!seeker?.resume) {
    return res.status(401).end();
  }

  if (!job) {
    return res.status(401).end();
  }

  try {
    let jobApplication = new JobApplications({
      employer: job.employer._id,
      seeker: seekerId,
      job: jobId,
    });

    jobApplication = await jobApplication.save();

    res.json(jobApplication);
  } catch (error) {
    console.log(error);
    return res.json(500).json({ error });
  }
};

export default handler;
