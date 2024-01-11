import Jobs from "@/models/Job";
import connectDb from "@/server/utils/connectDb";
import { isValidJob } from "@/server/utils/validation";
import Employer from "@/models/Employer";

export const getJob = async (jobId, fields = "") => {
  try {
    console.log("before connect");
    await connectDb();

    const fetchedJob = await Jobs.findById(jobId, fields)
      // .populate("employer", "company")
      .populate({ path: "employer", select: "company", model: Employer })
      .lean({ getters: true });

    return fetchedJob;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const handler = async (req, res) => {
  const { id } = req.query;
  const { uid } = req.headers;

  console.log("in handler");

  if (!id) {
    return res.status(400).end();
  }

  if (req.method === "GET") {
    console.log("in GET");

    const result = await getJob(id);

    return res.json(result);
  }

  if (req.method === "PUT") {
    const enteredData = JSON.parse(req.body);

    try {
      await connectDb();

      const existingJob = await Jobs.findById(id);

      if (!existingJob) {
        return res.status(404).end();
      } else if (existingJob.employer.toString() !== uid) {
        return res.status(401).end();
      }

      const validateJob = isValidJob(enteredData);

      if (!validateJob.isValid) {
        return res.status(422).json({ errors: validateJob.errors });
      }

      await Jobs.findByIdAndUpdate(id, validateJob.data);

      return res.status(204).end();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }

  return res.status(405).end();
};

export default handler;