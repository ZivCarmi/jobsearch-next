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

const handler = async (req, res) => {
  const { uid, utype } = req.headers;

  console.log("heree");

  if (req.method === "GET") {
    const { page, ids } = req.query;
    const requestedQuery = {};
    let results;

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
  }
};

export default handler;
