import connectDb from "@/server/utils/connectDb";
import Employers from "@/models/Employer";
import JobApplications from "@/models/JobApplication";
import Jobs from "@/models/Job";

export const getEmployerJobs = async (employerId, page = 1) => {
  try {
    await connectDb();

    page = parseInt(page);
    const limit = 5;
    const skip = (page - 1) * limit;

    const { jobsCount } = await Employers.findById(
      employerId,
      "jobs jobsCount"
    ).lean({
      virtuals: true,
    });
    const postedJobs = await Employers.findById(employerId)
      .populate({
        path: "jobs",
        model: Jobs,
        // perDocumentLimit: 5,
        options: {
          sort: [{ _id: -1 }],
          limit,
          skip,
        },
      })
      .lean({ getters: true });

    const hasMore = skip + limit < jobsCount;

    // const postedJobs = await Employers.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(employerId),
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       jobs: 1,
    //     },
    //   },
    //   { $unwind: "$jobs" },
    //   {
    //     $sort: {
    //       jobs: -1,
    //     },
    //   },
    //   {
    //     $facet: {
    //       data: [{ $skip: skip }, { $limit: limit }],
    //       metadata: [
    //         {
    //           $count: "total",
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "jobs",
    //       localField: "data.jobs",
    //       foreignField: "_id",
    //       pipeline: [
    //         {
    //           $sort: { _id: -1 },
    //         },
    //       ],
    //       as: "data",
    //     },
    //   },
    // ]);

    // const totalCount = postedJobs[0]?.metadata[0]?.total;
    // const hasMore = skip + limit < totalCount;

    const results = {
      // jobs: postedJobs[0]?.data || [],
      jobs: postedJobs.jobs,
      totalCount: jobsCount,
      pagination: {
        hasNextPage: hasMore,
        pagesCount: Math.ceil(jobsCount / limit),
      },
    };

    return results;
  } catch (error) {
    return error;
  }
};

export const getEmployerJobApps = async (employerId, page = 1) => {
  try {
    await connectDb();

    page = parseInt(page);
    const limit = 5;
    const skip = (page - 1) * limit;
    const docsLength = await JobApplications.countDocuments();
    const hasMore = skip + limit < docsLength;

    const jobApps = await JobApplications.find({ employer: employerId })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .populate("seeker", "firstName lastName")
      .lean({ getters: true, virtuals: true });

    const results = {
      data: jobApps,
      totalCount: docsLength,
      pagination: {
        hasNextPage: hasMore,
        pagesCount: Math.ceil(docsLength / limit),
      },
    };

    return results;
  } catch (error) {
    return error;
  }
};

const handler = async (req, res) => {
  const { route } = req.query;
  const { uid } = req.headers;

  if (route === "jobs") {
    const page = parseInt(req.query.page) || 1;

    if (req.method === "GET") {
      const response = await getEmployerJobs(uid, page);

      return res.json(response);
    }
  } else if (route === "job-applications") {
    const page = parseInt(req.query.page) || 1;

    if (req.method === "GET") {
      const response = await getEmployerJobApps(uid, page);

      return res.json(response);
    }
  }

  return res.status(405).end();
};

export default handler;
