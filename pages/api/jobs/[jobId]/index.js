import Jobs from "@/models/Job";
import connectDb from "@/server/utils/connectDb";
import { isValidJob } from "@/server/utils/validation";

export const getJob = async (jobId, fields = "") => {
  try {
    console.log("attempting connection");

    await connectDb();

    const fetchedJob = await Jobs.findById(jobId, fields)
      .populate("employer", "company")
      // .populate({ path: "employer", select: "company", model: Employers })
      .lean({ getters: true });

    console.log("line 14", fetchedJob);

    return fetchedJob;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const handler = async (req, res) => {
  const { jobId } = req.query;
  const { uid } = req.headers;

  console.log("in handler");

  if (!jobId) {
    return res.status(400).end();
  }

  if (req.method === "GET") {
    console.log("getting job...");

    const result = await getJob(jobId);

    return res.json(result);
  }

  if (req.method === "PUT") {
    const enteredData = JSON.parse(req.body);

    try {
      await connectDb();

      const existingJob = await Jobs.findById(jobId);

      if (!existingJob) {
        return res.status(404).end();
      } else if (existingJob.employer.toString() !== uid) {
        return res.status(401).end();
      }

      const validateJob = isValidJob(enteredData);

      if (!validateJob.isValid) {
        return res.status(422).json({ errors: validateJob.errors });
      }

      await Jobs.findByIdAndUpdate(jobId, validateJob.data);

      return res.status(204).end();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }

  return res.status(405).end();
};

export default handler;
