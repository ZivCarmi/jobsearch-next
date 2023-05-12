import Jobs from "@/models/Job";

export const newFilter = (field, value, asGroup = false) => {
  const query = [];

  query.push({
    $match: {
      [field]: { $regex: value, $options: "i" },
    },
  });

  if (asGroup) {
    query.push({
      $group: {
        _id: `$${field}`,
      },
    });
  }

  return query;
};

const handler = async (req, res) => {
  const { job: jobParam, where: locationParam } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  let query = [];
  const skip = (page - 1) * limit;

  jobParam && query.push(...newFilter("title", jobParam));
  locationParam && query.push(...newFilter("location", locationParam));

  query.push(
    {
      $sort: { _id: -1 },
    },
    {
      $lookup: {
        from: "employers",
        localField: "employer",
        foreignField: "_id",
        as: "employer",
      },
    },
    { $unwind: "$employer" },
    {
      $project: {
        title: 1,
        location: 1,
        description: 1,
        createdAt: 1,
        "employer.company": 1,
      },
    },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    },
    { $unwind: "$totalCount" }
  );

  try {
    const fetchedJobs = await Jobs.aggregate(query);

    const resultsCount = fetchedJobs[0]?.totalCount.count;
    const hasNextPage = skip + limit < resultsCount;

    const results = {
      data: fetchedJobs[0]?.data || [],
      totalCount: resultsCount,
      hasNextPage: hasNextPage,
    };

    return res.json(results);
  } catch (error) {
    console.log(error);
  }

  return res.json({});
};

export default handler;
