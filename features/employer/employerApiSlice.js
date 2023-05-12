import { apiSlice } from "@/api/apiSlice";

export const employerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateEmployer: builder.mutation({
      query: (data) => ({
        url: "/employer",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useUpdateEmployerMutation } = employerApiSlice;
