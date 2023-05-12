import { apiSlice } from "@/api/apiSlice";
import { verifyUser } from "../auth/authSlice";

export const seekerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSeeker: builder.mutation({
      query: () => ({
        url: "/seeker",
        method: "GET",
      }),
    }),
    createSeeker: builder.mutation({
      query: (data) => ({
        url: "/seeker",
        method: "POST",
        body: { ...data },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(verifyUser(true));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    updateSeeker: builder.mutation({
      query: (data) => ({
        url: "/seeker",
        method: "PUT",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetSeekerMutation,
  useCreateSeekerMutation,
  useUpdateSeekerMutation,
} = seekerApiSlice;
