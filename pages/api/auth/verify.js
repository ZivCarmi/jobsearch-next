import jwt from "jsonwebtoken";
import { deleteCookie } from "cookies-next";

import connectDb from "@/server/utils/connectDb";
import Users from "@/models/User";
import { getUserMeta } from "./login";

const handler = (req, res) => {
  const cookies = req?.cookies;

  if (!cookies?.token) {
    return res.status(401).end();
  }

  const accessToken = cookies.token;

  return jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).end();
      }

      try {
        await connectDb();

        const fetchedUser = await Users.findOne(
          {
            email: decoded.userInfo.email,
          },
          "-password -updatedAt -__v"
        ).lean();

        if (!fetchedUser) {
          deleteCookie("token", { req, res });
          return res.status(401).end();
        }

        const userMeta = await getUserMeta(fetchedUser._id, fetchedUser.type);

        const user = {
          ...fetchedUser,
          metaData: {
            ...userMeta,
          },
        };

        return res.json({ accessToken, user });
      } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
      }
    }
  );
};

export default handler;
