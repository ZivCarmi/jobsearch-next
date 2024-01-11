const isDevelopment = process.env.NODE_ENV !== "production";

export const BASE_URL = isDevelopment
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_SITE_URL;
