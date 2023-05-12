import connectDb from "@/server/utils/connectDb";
import Jobs from "@/models/Job";
import JobApplications from "@/models/JobApplication";

export const getEmployerJob = async (id) => {
  try {
    await connectDb();

    const job = await Jobs.findById(id, "-employer").lean({ getters: true });

    return job;
  } catch (error) {
    return false;
  }
};

export const getEmployerJobApp = async (id) => {
  try {
    await connectDb();

    const jobApp = await JobApplications.findById(id, "-employer")
      .populate("seeker")
      .populate("job", "-employer")
      .lean({ getters: true, virtuals: true });

    return jobApp;
  } catch (error) {
    return false;
  }
};

const patchEmployerJobApp = async (id, data) => {
  const { status, watched } = data;

  try {
    await connectDb();

    if (watched) {
      await JobApplications.findByIdAndUpdate(id, { isWatched: true });
    }

    if (status) {
      await JobApplications.findOneAndUpdate(
        { _id: id },
        { status },
        { runValidators: true }
      );
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const handler = async (req, res) => {
  const { route, id } = req.query;

  if (route === "jobs") {
    if (req.method === "GET") {
      const response = await getEmployerJob(id);

      if (!response) {
        return res.status(400).json({ errors: "Something went wrong" });
      }

      return res.json(response);
    }
  }

  if (route === "job-applications") {
    if (req.method === "GET") {
      const response = await getEmployerJobApp(id);

      if (!response) {
        return res.status(400).json("Something went wrong");
      }

      return res.json(response);
    }

    if (req.method === "PATCH") {
      const data = req.body;

      const response = await patchEmployerJobApp(id, data);

      if (!response) {
        return res.status(400).json("Something went wrong");
      }

      return res.status(204).end();
    }
  }

  return res.status(405).end();
};

export default handler;
