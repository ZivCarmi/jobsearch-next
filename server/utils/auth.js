import { sign } from "jsonwebtoken";
import { setCookie } from "cookies-next";

const createAccessToken = (userData, req, res) => {
  const accessToken = sign(
    {
      userInfo: userData,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  setCookie("token", accessToken, {
    req,
    res,
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60,
  });

  return accessToken;
};

export default createAccessToken;
