import connectDb from "@/server/utils/connectDb";
import Seekers from "@/models/Seeker";
import Users from "@/models/User";
import { isValidSeeker } from "@/server/utils/validation";

export const getSeeker = async (seekerId, fields = "") => {
  try {
    await connectDb();

    const fetchedSeeker = await Seekers.findById(seekerId, fields).lean();

    return fetchedSeeker;
  } catch (error) {
    console.log(error);
  }
};

const handler = async (req, res) => {
  const { uid } = req.headers;

  if (req.method === "GET") {
    const seeker = await getSeeker(uid);

    return res.json(seeker);
  }

  if (req.method === "POST") {
    const enteredData = req.body;

    const { isValid, data, errors } = isValidSeeker(enteredData);

    if (!isValid) {
      return res.status(422).json({ errors });
    }

    try {
      await connectDb();

      const newSeeker = new Seekers({
        _id: uid,
        data,
      });

      await newSeeker.save();

      await Users.findByIdAndUpdate(uid, { verified: true }, { new: true });

      return res.status(201).json({});
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  if (req.method === "PUT") {
    const enteredData = req.body;

    const { isValid, data, errors } = isValidSeeker(enteredData);

    if (!isValid) {
      return res.status(422).json({ errors });
    }

    try {
      await connectDb();

      const updatedSeeker = await Seekers.findByIdAndUpdate(uid, data, {
        new: true,
      });

      return res.status(201).json(updatedSeeker);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};

export default handler;
