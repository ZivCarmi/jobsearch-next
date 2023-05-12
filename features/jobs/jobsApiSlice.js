import { apiSlice } from "@/api/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJob: builder.mutation({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetJobMutation } = jobsApiSlice;
