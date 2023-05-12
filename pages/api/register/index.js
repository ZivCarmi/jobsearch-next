import bcrypt from "bcrypt";
import { setCookie } from "cookies-next";

import User from "@/models/User";
import { sign } from "@/server/utils/jwt";
import connectDb from "@/server/utils/connectDb";

const handler = async (req, res) => {
  const { type, email, password } = req.body;

  const errors = {};

  if (password.length < 6) {
    errors.password = "Password must be at least 6 digits long";

    return res.status(422).json({ errors });
  }

  try {
    await connectDb();

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new User({
      type,
      email,
      password: hashedPwd,
      verified: false,
    });

    await newUser.save();

    const user = {
      id: newUser._id,
      email: newUser.email,
      type: newUser.type,
      verified: newUser.verified,
      createdAt: newUser.createdAt,
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

    user.metaData = {};

    return res.status(201).json({ accessToken, user });
  } catch (error) {
    console.log(error);

    // Validation Errors
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(422).json({ errors });
    }

    // Duplication Error
    if (error.code === 11000) {
      errors.email = "Email is already taken.";

      return res.status(409).json({ errors });
    }
  }
};

export default handler;
