import connectDb from "@/server/utils/connectDb";
import JobApplications from "@/models/JobApplication";

export const getSeekerJobApp = async (id) => {
  try {
    await connectDb();

    const jobApp = await JobApplications.findById(id, "-seeker")
      .populate("employer", "company")
      .populate("job")
      .lean({ getters: true });

    return jobApp;
  } catch (error) {
    return false;
  }
};

const handler = async (req, res) => {
  const { route, id } = req.query;

  if (route === "job-applications") {
    if (req.method === "GET") {
      const response = await getSeekerJobApp(id);

      if (!response) {
        return res.status(400).json("Something went wrong");
      }

      return res.json(response);
    }
  }

  return res.status(405).end();
};

export default handler;
