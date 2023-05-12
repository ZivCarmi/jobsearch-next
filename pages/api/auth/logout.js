import { deleteCookie } from "cookies-next";

const handler = (req, res) => {
  const cookies = req?.cookies;

  if (!cookies?.token) {
    return res.status(204).end();
  }

  deleteCookie("token", { req, res });

  return res.status(204).end();
};

export default handler;
