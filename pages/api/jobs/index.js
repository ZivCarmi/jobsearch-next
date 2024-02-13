import { Types } from "mongoose";
import connectDb from "@/server/utils/connectDb";
import Jobs from "@/models/Job";
import Employers from "@/models/Employer";

export const getAllJobs = async (page, query = {}) => {
  try {
    await connectDb();

    page = parseInt(page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const docsLength = await Jobs.countDocuments(query);
    const hasMoreDocs = skip + limit < docsLength;

    const fetchedJobs = await Jobs.find(query)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .populate({ path: "employer", select: "company", model: Employers })
      .lean({ getters: true });

    const results = {
      data: fetchedJobs,
      hasNextPage: hasMoreDocs,
    };

    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllJobsWithApplyCondition = async (
  seekerId,
  page,
  query = {}
) => {
  page = parseInt(page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    await connectDb();

    const fetchedJobs = await Jobs.aggregate([
      { $match: query },
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "jobapplications",
          localField: "_id",
          foreignField: "job",
          as: "applications",
        },
      },
      {
        $addFields: {
          applied: {
            $in: [new Types.ObjectId(seekerId), "$applications.seeker"],
          },
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          metadata: [{ $count: "total" }],
        },
      },
    ]).then((res) => {
      const { data, metadata } = res[0];

      const output = {
        data: data.map((job) => Jobs.hydrate(job)),
        hasNextPage: skip + limit < metadata[0].total,
      };

      return output;
    });

    return fetchedJobs;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getJobsByQuery = async (title, location) => {
  let aggregation = [];

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

  aggregation.push({ $limit: 6 });

  try {
    await connectDb();

    const fetchedJobs = await Jobs.aggregate(aggregation);

    return fetchedJobs;
  } catch (error) {
    console.log(error);
    return error;
  }
};

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
  const { uid, utype } = req.headers;
  const { page, ids, title, location } = req.query;
  const requestedQuery = {};
  let results;

  if (req.method !== "GET") return res.status(405).end();

  if (title || location) {
    results = await getJobsByQuery(title, location);

    return res.json(results);
  }

  if (ids) {
    const idsArray = ids.split(",");

    requestedQuery._id = {
      $in: idsArray.map((id) => new Types.ObjectId(id)),
    };
  }

  if (utype === "seeker") {
    results = await getAllJobsWithApplyCondition(uid, page);
  } else {
    results = await getAllJobs(page, requestedQuery);
  }

  return res.json(results);
};

export default handler;
