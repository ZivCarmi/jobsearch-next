import connectDb from "@/server/utils/connectDb";
import Jobs from "@/models/Job";
import Employers from "@/models/Employer";
import { isValidJob } from "@/server/utils/validation";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { uid } = req.headers;

  const enteredData = JSON.parse(req.body);

  enteredData.employer = uid;

  const validateJob = isValidJob(enteredData);

  if (!validateJob.isValid) {
    return res.status(422).json(validateJob.errors);
  }

  console.log(validateJob);

  try {
    await connectDb();

    const newJob = new Jobs(validateJob.data);

    await newJob.save();

    await Employers.findOneAndUpdate(
      { _id: uid },
      { $push: { jobs: newJob._id } }
    );

    return res.status(201).json(newJob.toObject());
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
