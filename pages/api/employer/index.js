import { setCookie } from "cookies-next";

import Employers from "@/models/Employer";
import Users from "@/models/User";
import { isValidEmployer } from "@/server/utils/validation";
import connectDb from "@/server/utils/connectDb";
import { sign } from "@/server/utils/jwt";

const handler = async (req, res) => {
  const { uid } = req.headers;

  if (req.method === "POST") {
    const enteredData = req.body;

    const { isValid, data, errors } = isValidEmployer(enteredData);

    if (!isValid) {
      return res.status(422).json({ errors });
    }

    try {
      await connectDb();

      const newEmployer = new Employers({
        _id: uid,
        ...data,
      });

      await newEmployer.save();

      const updatedUser = await Users.findOneAndUpdate(
        { _id: uid },
        { verified: true },
        { new: true, fields: "-password -__v" }
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

      return res.status(201).end();
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  if (req.method === "PUT") {
    const enteredData = req.body;

    const { isValid, data, errors } = isValidEmployer(enteredData);

    if (!isValid) {
      return res.status(422).json({ errors });
    }

    try {
      await connectDb();

      const updatedEmployer = await Employers.findByIdAndUpdate(uid, data, {
        new: true,
      });

      return res.status(201).json(updatedEmployer);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  res.status(405).end();
};

export default handler;
