import connectDb from "@/server/utils/connectDb";
import Jobs from "@/models/Job";
import Employers from "@/models/Employer";

export const getAllJobs = async (req) => {
  await connectDb();

  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const docsLength = await Jobs.countDocuments();
  const hasMoreDocs = skip + limit < docsLength;

  const fetchedJobs = await Jobs.find()
    .sort({ _id: -1 })
    .populate({ path: "employer", select: "company", model: Employers })
    .limit(limit)
    .skip(skip)
    .lean();

  const jobs = fetchedJobs.map((job) => ({
    ...job,
    _id: job._id.toString(),
  }));

  const results = {
    data: jobs,
    hasNextPage: hasMoreDocs,
  };

  return results;
};

const handler = async (req, res) => {
  if (req.method === "GET") {
    const results = await getAllJobs(req);

    return res.json(results);
  }
};

export default handler;
