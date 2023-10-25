import { setCookie } from "cookies-next";

import connectDb from "@/server/utils/connectDb";
import { isValidSeeker } from "@/server/utils/validation";
import Seekers from "@/models/Seeker";
import Users from "@/models/User";
import { sign } from "@/server/utils/jwt";

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
        ...data,
      });

      await newSeeker.save();

      const updatedUser = await Users.findOneAndUpdate(
        { _id: uid },
        { verified: true },
        { new: true }
      );

      const user = {
        ...updatedUser.toObject(),
        _id: updatedUser._id.toString(),
      };

      const accessToken = await sign(
        { userInfo: user },
        process.env.ACCESS_TOKEN_SECRET
      );

      setCookie("token", accessToken, {
        req,
        res,
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60,
      });

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

  if (req.method === "PATCH") {
    let enteredData = req.body;

    if (enteredData.firstName || enteredData.lastName) {
      const { isValid, data, errors } = isValidSeeker(enteredData);

      if (!isValid) {
        return res.status(422).json({ errors });
      }

      enteredData = data;
    }

    try {
      await connectDb();

      await Seekers.findByIdAndUpdate(uid, enteredData);

      return res.status(201).end();
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};

export default handler;
