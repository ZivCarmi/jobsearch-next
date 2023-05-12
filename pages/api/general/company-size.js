import { availableCompanySize } from "@/server/utils/services";

const handler = async (req, res) => res.json(availableCompanySize);

export default handler;
