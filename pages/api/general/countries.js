import { availableCountries } from "@/server/utils/services";

const handler = async (req, res) => res.json(availableCountries);

export default handler;
