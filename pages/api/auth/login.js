import { setCookie } from "cookies-next";
import bcrypt from "bcrypt";

import connectDb from "@/server/utils/connectDb";
import Users from "@/models/User";
import { sign } from "@/server/utils/jwt";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    await connectDb();

    const fetchedUser = await Users.findOne(
      { email },
      "-updatedAt -__v"
    ).lean();

    if (!fetchedUser) {
      return res
        .status(401)
        .json({ error: "Email and/or password does not match" });
    }

    const matchPwds = await bcrypt.compare(password, fetchedUser.password);

    if (!matchPwds) {
      return res
        .status(401)
        .json({ error: "Email and/or password does not match" });
    }

    const user = {
      _id: fetchedUser._id,
      email: fetchedUser.email,
      type: fetchedUser.type,
      verified: fetchedUser.verified,
      createdAt: fetchedUser.createdAt,
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

    res.json({ accessToken, user });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
