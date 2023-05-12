import Jobs from "@/models/Job";
import { newFilter } from "../search";

const handler = async (req, res) => {
  const { job: jobParam, where: locationParam } = req.query;
  let query = [];

  jobParam && query.push(...newFilter("title", jobParam, true));
  locationParam && query.push(...newFilter("location", locationParam, true));

  query.push({ $limit: 6 });

  try {
    const fetchedJobs = await Jobs.aggregate(query);

    const results = {
      data: fetchedJobs,
    };

    return res.json(results);
  } catch (error) {
    console.log(error);
  }

  return res.json({});
};

export default handler;
