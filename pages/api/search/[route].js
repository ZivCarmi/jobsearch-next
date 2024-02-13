import Jobs from "@/models/Job";
import { getAllJobs, getAllJobsWithApplyCondition } from "../jobs";
import connectDb from "@/server/utils/connectDb";

export const getSearchedJobs = async (headers, query) => {
  const { uid, utype } = headers;
  const { title, location } = query;
  const page = parseInt(query.page) || 1;
  const searchQuery = {};
  let results;

  if (title) {
    searchQuery.title = { $regex: title, $options: "i" };
  }

  if (location) {
    searchQuery.location = { $regex: location, $options: "i" };
  }

  if (utype === "seeker") {
    results = await getAllJobsWithApplyCondition(uid, page, searchQuery);
  } else {
    results = await getAllJobs(page, searchQuery);
  }

  return results;
};

const handler = async (req, res) => {
  const { query } = req;

  console.log("in api/search");

  if (query.route === "jobs-board") {
    const { title, location } = query;
    let aggregation = [];

    console.log("in api/search/jobs-board");
    console.log(query);
    console.log(title, location);

    if (title) {
      aggregation.push(
        { $match: { title: { $regex: title, $options: "i" } } },
        { $group: { _id: `$title` } }
      );
    }

    if (location) {
      aggregation.push(
        { $match: { location: { $regex: location, $options: "i" } } },
        { $group: { _id: `$location` } }
      );
    }

    console.log(aggregation);

    aggregation.push({ $limit: 6 });

    try {
      await connectDb();

      const fetchedJobs = await Jobs.aggregate(aggregation);

      console.log(fetchedJobs);

      return res.json(fetchedJobs);
    } catch (error) {
      console.log(error);
    }
  }

  if (query.route === "jobs") {
    const response = await getSearchedJobs(req.headers, query);

    return res.json(response);
  }

  return res.status(405).end();
};

export default handler;
