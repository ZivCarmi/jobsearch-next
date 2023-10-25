import connectDb from "@/server/utils/connectDb";
import JobApplications from "@/models/JobApplication";
import Employers from "@/models/Employer";

export const getSeekerJobApps = async (seekerId, page = 1) => {
  try {
    await connectDb();

    page = parseInt(page);
    const limit = 5;
    const skip = (page - 1) * limit;
    const docsLength = await JobApplications.countDocuments({
      seeker: seekerId,
    });
    const hasMore = skip + limit < docsLength;

    const jobApps = await JobApplications.find({ seeker: seekerId })
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .populate("job")
      .populate({ path: "employer", select: "company", model: Employers })
      .lean({ getters: true });

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

  if (route === "job-applications") {
    const page = parseInt(req.query.page) || 1;

    if (req.method === "GET") {
      const response = await getSeekerJobApps(uid, page);

      return res.json(response);
    }
  }

  return res.status(405).end();
};

export default handler;
